import { DbDebugger } from './DbDebugger';

export class Table {
  constructor(name, schema, database, cache, _hasMany, _hasOne) {
    this.name = name;
    this.schema = schema;
    this.database = database;
    this.cache = cache;
    this._hasMany = _hasMany ? _hasMany : [];
    this._hasOne = _hasOne ? _hasOne : [];
    this.debugger = new DbDebugger('Table', name);
  }

  _tableExists(tableName) {
    return tableName instanceof Table || this.database.hasTable(tableName);
  }
  _keyExists(key) {
    return this.schema.indexOf(key) != -1;
  }
  //Table Access methods
  add(obj, entryPoint) {
    var entry = {};
    entry.id = this.cache.meta.currId;
    entry['created_on'] = new Date().getTime();
    entry['last_updated_on'] = new Date().getTime();
    for (let i = 0; i < this.schema.length; i++) {
      entry[this.schema[i]] = obj.hasOwnProperty(this.schema[i]) ? obj[this.schema[i]] : null;
    }
    this.cache.id[this.cache.meta.currId] = entry;
    this.cache.meta.currId++;
    this.database.persistDb();
    if (this._isDebugMode()) {
      this.debugger.log('post', entryPoint ? entryPoint : 'add', entry, 'success', null);
    }
  }
  seed(arr) {
    arr.forEach(el => this.add(el, 'seed'));
  }
  update(id, entry, entryPoint) {
    var obj = this.cache.id[id]
    for (var key in entry) {

      if (obj.hasOwnProperty(key)) {
        obj[key] = entry[key];
       obj['last_updated_on'] = new Date().getTime();
      }
    }
    this.database.persistDb();
    if (this._isDebugMode()) {
      this.debugger.log('put', entryPoint ? entryPoint : 'update', obj, 'success', null);
    }
  }
  updateByKey(key, value, entry) {
    //think about if key is "id" or if key doesn't exists
    if (key.toLowerCase() == 'id') {
      return this.update(value, entry, 'updateByKey');
    }
    var obj = this.cache.id;
    for (var x in obj) {
      if (obj[x][key] == value) {
        this.update(x, entry, 'updateByKey');
      }
    }
    this.database.persistDb();
  }
  remove(id) {
    delete this.cache.id[id];
    this.database.persistDb();
    if (this._isDebugMode()) {
      this.debugger.log('delete', 'remove', 'ENTRY: ' + id, 'success', null);
    }
  }
  removeByKey(key, value) {
    var obj = this.cache.id;
    for (var x in obj) {
      if (obj[x][key] == value) {
        delete obj[x];
        if (this._isDebugMode()) {
          this.debugger.log('delete', 'removeByKey', 'ENTRY: ' + x, 'success', null);
        }
      }
    }
    this.database.persistDb();
  }
  removeAll() {
    this.cache.id = {};
    this.database.persistDb();
    if (this._isDebugMode()) {
      this.debugger.log('delete', 'removeAll', 'ALL ENTRIES', 'success', null);
    }
  }
  fetch(id, entryPoint) {
    var obj = this.cache.id[id];
    this._hasMany.forEach(el => {
      obj[el + 's'] = this.database.fetchTable(el).fetchByKey(this.name + 'Id', obj[x].id);
    })
    if (this._isDebugMode()) {
      this.debugger.log('get', entryPoint ? entryPoint : 'fetch', obj, 'success', null);
    }
    return obj;
  }
  fetchByKey(key, value) {
    if (key.toLowerCase() == 'id') {
      return this.fetch(value, 'fetchByKey');
    }
    var obj = this.cache.id;
    var found = [];
    for (var x in obj) {
      if (obj[x][key] == value) {
        this._hasMany.forEach(el => {
          obj[x][el + 's'] = this.database.fetchTable(el).fetchByKey(this.name + 'Id', id);
        })
        found.push(obj[x]);
      }
    }
    return found;
  }
  fetchAll() {
    var obj = this.cache.id
    var arr = [];
    for (var key in obj) {
      arr.push(obj[key]);
    }
    if (this._isDebugMode()) {
      this.debugger.log('get', 'fetchAll', arr, 'success', null);
    }
    return arr;
  }
  updateDbCache() {
    this.database.cache[this.name] = this.cache;
    this.database.persistDb();
  }

  //Initializing commands connecting tables
  hasMany(tableName) {
    if (!this._tableExists(tableName)) {
      throw new Error('Table ' + tableName + ' does not exist in Database ' + this.database.name);
    }
    var table = tableName instanceof Table ? tableName : this.database.fetchTable(tableName);
    table.schema.push(this.name + 'Id');
    this._hasMany.push(table.name);
    this.cache.meta.hasMany.push(table.name);
    this.database.persistDb();
  }

  _isDebugMode() {
    return this.database._isDebugMode();
  }

}
