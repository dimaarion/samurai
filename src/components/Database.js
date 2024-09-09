import Dexie from 'dexie';





export default class Database{

    db = new Dexie('myDatabase');


    async create() {
        this.db.version(1).stores({
            friends: '++id, name, age' // Primary key and indexed props
        });
    }

    async addCollection() {

    }


}