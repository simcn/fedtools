import Dexie from 'dexie';

var db = new Dexie("mycolors");

// 定义数据结构
db.version(1).stores({
    colors: "++id, color",
});





// Interact With Database
// 使用事务处理数据(ACID)
// db.transaction('rw', db.colors, async function () {

//     // Let's add some data to db:
//     await db.colors
//       .add({name: 'Camilla' + new Date(), url: 25, username: 1, password: +new Date()});



//     // Let's query the db
//     var closeFriends = await db.colors
//         .where('username').equals(1)
//         .toArray();


//         closeFriends.map(f => {
//             console.log(f)
//         })



// }).catch(function(err) {

//     // Catch any error event or exception and log it:
//     console.error(err.stack || err);
// });


class MpDb {

    constructor() {
        this.db = db
    }

    add(item) {
        console.log('add', item);
        return this.db.colors.add(item)
    }

    async all() {
        // reverse 倒序
        return await db.colors.orderBy('id').reverse().toArray();
    }

    // 删除
    async del(id){
        return await db.colors.where('id').anyOf(id).delete();
    }


}



export default MpDb;