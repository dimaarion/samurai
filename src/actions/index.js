import Dexie from 'dexie';

export const db = new Dexie('Database');

db.version(1).stores({
    invent: '++id, name, icon' // Primary key and indexed props
});


export function routable(n) {
    return Math.PI / 180 * n;
}

export function createArray(num){
    let a = [];
    for (let i = 0; i < num; i++){
        a[i] = ""
    }
    return a;
}