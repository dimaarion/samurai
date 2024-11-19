import Dexie from 'dexie';


const db = new Dexie('myDatabase');

db.version(1).stores({
    friends: '++id, name, x,y,z',
    music:'++id,name,value,active'
});




export {db};
