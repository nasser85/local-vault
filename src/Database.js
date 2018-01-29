import Table from ('Table');
export class Database {
    //Database General
    constructor(name) {
        this.name = name;
        this.cache = {};
        this.tables = {};
    }
    persistDb() {
      var vault = this.decodeDb(window.localStorage.localVault);
      vault[this.name] = this.encodeDb(this.cache);
      window.localStorage.localVault= this.encodeDb(vault);
    }
    refreshCache() {
      this.cache = this.decodeDb(this.decodeDb(window.localStorage.localVault)[this.name]);
      this.tables = {};
      Object.keys(this.cache).forEach(tableName => {
        this.tables[tableName] = new Table(tableName, this.cache[tableName].meta.schema, this, this.cache[tableName], this.cache[tableName].meta.hasMany, this.cache[tableName].meta.hasOne);
      })
    }
    encodeDb(db) {
      return btoa(btoa(JSON.stringify(db)));
    }
    decodeDb(db) {
      return JSON.parse(atob(atob(db)));
    }

    //Tables
    createTable(name, schema) {
      return this.tables.hasOwnProperty(name) ? new Error("Table " + name + " already exists in Database!  Try fetchTable() instead.") : this.createTableForSure(name, schema);
    }
    createTableForSure(name, schema) {
      var obj = {
        meta: {
          schema: schema.filter(el => el !== 'id' && el !== 'created_on' && el !== 'last_updated_on'),
          currId: 1,
          hasMany: [],
          hasOne: []
        },
        id: {}
      }
      this.tables[name] = new Table(name, schema, this, obj);
      this.cache[name] = obj;
      this.persistDb();
      return this.tables[name];
    }
    dropTable(name) {
      delete this.tables[name];
      delete this.cache[name];
      this.persistDb();
    }
    dropTables() {
      this.tables = {};
      this.cache = {};
      this.persistDb();
    }
    listTables() {
      return Object.keys(this.tables);
    }
    fetchTable(name) {
      return this.tables.hasOwnProperty(name) ? this.tables[name] : new Error("Table " + name + " does not exist in Database!  Try createTable() instead.");
    }

}
