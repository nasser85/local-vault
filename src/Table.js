export class Table {
  constructor(name, schema, database, cache, hasMany, hasOne) {
    this.name = name;
    this.schema = schema;
    this.database = database;
    this.cache = cache;
    this.hasMany = hasMany;
    this.hasOne = hasOne;
  }
  //Table Access methods
  add(obj) {
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
    // DEBUG
    console.log(this.cache);
    console.log('Table.add() => ', entry);
  }
  seed(arr) {
    arr.forEach(el => {
      return this.add(el);
    })
  }
  update(id, entry) {
    var obj = this.cache.id[id]
    for (var key in entry) {

      if (obj.hasOwnProperty(key)) {
        obj[key] = entry[key];
       obj['last_updated_on'] = new Date().getTime();
      }
    }
    this.database.persistDb();
    console.log(this.cache);
  }
  updateByKey(key, value, entry) {
    //think about if key is "id" or if key doesn't exists
    var obj = this.cache.id;
    for (var x in obj) {
      if (obj[x][key] == value) {
        this.update(x, entry);
      }
    }
    this.database.persistDb();
    console.log(this.cache);
  }
  remove(id) {
    delete this.cache.id[id];
    this.database.persistDb();
    console.log(this.cache);
  }
  removeByKey(key, value) {
    var obj = this.cache.id;
    for (var x in obj) {
      if (obj[x][key] == value) {
        delete obj[x];
      }
    }
    this.database.persistDb();
    console.log(this.cache);
  }
  removeAll() {
    this.cache.id = {};
    this.database.persistDb();
    console.log(this.cache);
  }
  fetch(id) {
    return this.cache.id[id];
  }
  fetchByKey(key, value) {
    //think about if key is "id" or if key doesn't exists
    var obj = this.cache.id;
    var found = [];
    for (var x in obj) {
      if (obj[x][key] == value) {
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
    console.log(arr);
    return arr;
  }
  updateDbCache() {
    this.database.cache[this.name] = this.cache;
    this.database.persistDb();
  }

  //Initializing commands connecting tables
  hasMany(tableName) {
    var table = this.database.fetchTable(tableName);
    table.schema.push(this.name + 'ID');
    this.hasMany.push(table.name);
    this.cache.meta.hasMany.push(table.name);
    this.database.persistDb();
  }

  hasOne(table, at) {

  }


}
