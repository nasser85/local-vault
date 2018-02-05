import Database from 'Database';

export default class DatabaseApi {
    static init() {
      if (!window.localStorage.hasOwnProperty('localVault')) {
        window.localStorage.localVault = this.encode({});
      }
      console.log(window.localStorage);
    }
    static encode(vault) {
      return btoa(btoa(JSON.stringify(vault)));
    }
    static decode(vault) {
      return JSON.parse(atob(atob(vault)));
    }
    static create(name) {
      if (!this.doesExist(name)) {
        var db = new Database(name);
        db.persistDb();
        return db;
      } else {
        throw Error('Database ' + name + ' already exists!  Try fetch("' + name + '") method instead.');
      }
    }
    static fetch(name) {
      if (!this.doesExist(name)) {
        throw Error('Database ' + name + ' does not exist!  Try create("' + name  + '") method instead');
      } else {
        var db = new Database(name);
        db.refreshCache();
        return db;
      }
    }
    static list() {
      return Object.keys(this.decode(window.localStorage.localVault));
    }
    static destroy(name) {
      if (this.doesExist(name)) {
        var store = this.decode(window.localStorage.localVault);
        delete store[name];
        console.log(store);
        window.localStorage.localVault = this.encode(store);
      } else {
        throw Error('Database ' + name + ' could not be destroyed!  Database ' + name + ' does not exist.')
      }
    }
    static doesExist(name) {
        return this.decode(window.localStorage.localVault).hasOwnProperty(name);
    }
    static destroyAll() {
      delete window.localStorage.localVault;
      console.log(window.localStorage);
    }
}

