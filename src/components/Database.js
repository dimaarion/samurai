import Dexie from 'dexie';


const db = new Dexie('myDatabase');

db.version(1).stores({
    friends: '++id, name, x,y,z'
});




export {db};
