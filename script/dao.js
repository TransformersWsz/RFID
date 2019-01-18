function getRoom_id(room_code) {
    var room_id = -1;
    var db = api.require("db");
    var sql = "select room_id from room where room_code = '" + room_code + "'";
    var ret = db.selectSqlSync({
        name: 'nfc',
        sql: sql
    });
    return ret.data[0].room_id;
}

// 检查与其他房间名是否重复
function isRoomnameDuplicate(room_name) {
    var res = 0;
    var db = api.require("db");
    var sql = "select * from room where room_name = '" + room_name + "'";
    var ret = db.selectSqlSync({
        name: 'nfc',
        sql: sql
    });

    if (ret.data.length >= 1) {
        res = 1;
    }
    return res;
}

function isExistTag(tag_code) {
    var res = 0;
    var db = api.require("db");
    var sql = "select * from tag where tag_code = '" + tag_code + "'";
    var ret = db.selectSqlSync({
        name: 'nfc',
        sql: sql
    });

    if (ret.data.length >= 1) {
        res = 1;
    }
    return res;
}

function insertTag(tag_code, tag_name, tag_pic) {
    var sql = "insert into tag(tag_code, tag_name, tag_pic) values('" + tag_code + "', '" + tag_name + "', '" + tag_pic + "')";
    var ret = db.executeSqlSync({
        name: 'nfc',
        sql: sql
    });
    return ret;
}

function insertTags_Categories(tag_id, cate_id) {
    var sql = "insert into tags_categories(tag_id, cate_id) values(" + cate_id + ", " + tag_id + ")";
    var ret = db.executeSqlSync({
        name: 'nfc',
        sql: sql
    });
    return ret;
}

function turnCate_nameToCate_id(cate_name) {
    var length = cate_name.length;
    var cate_id = [];
    var db = api.require("db");
    for (var i = 0; i < length; i++) {
        var sql = "select cate_id from category where cate_name = '" + cate_name[i] + "'";
        var ret = db.selectSqlSync({
            name: 'nfc',
            sql: sql
        });
        cate_id.push(ret.data[0].cate_id);
    }
    return cate_id;
}

function getTag_id(tag_code) {
    var sql = "select * from tag where tag_code = '" + tag_code + "'";
    var ret = db.selectSqlSync({
        name: 'nfc',
        sql: sql
    });
    return ret.data[0].tag_id;
}

function isExistRoom(room_code) {
    var res = 0;
    var db = api.require("db");
    var sql = "select * from room where room_code = '" + room_code + "'";
    var ret = db.selectSqlSync({
        name: 'nfc',
        sql: sql
    });

    if (ret.data.length >= 1) {
        res = 1;
    }
    return res;
}

function insertRoom(room_code, room_name) {
    var sql = "insert into room(room_code, room_name) values(" + "'" + room_code + "', '" + room_name + "')";
    var ret = db.executeSqlSync({
        name: 'nfc',
        sql: sql
    });
    return ret;
}

function updateTagRoom_id(tag_code, room_id) {
    var sql = "update tag set room_id = " + room_id + " where tag_code = '" + tag_code + "'";
    var ret = db.executeSqlSync({
        name: 'nfc',
        sql: sql
    });
    return ret;
}

function updateRoomRoom_name(room_code, room_name) {
    var sql = "update room set room_name = '" + room_name + "' where room_code = '" + room_code + "'";
    var ret = db.executeSqlSync({
        name: 'nfc',
        sql: sql
    });
    return ret;
}

function updateTagTag_nameTag_pic(tag_code, tag_name, tag_pic) {
    var sql = '';
    if (tag_pic == "no") {
        sql = "update tag set tag_name = '" + tag_name + "' where tag_code = '" + tag_code + "'";
    }
    else {
        sql = "update tag set tag_name = '" + tag_name + "', tag_pic = '" + tag_pic + "' where tag_code = '" + tag_code + "'";
    }
    var ret = db.executeSqlSync({
        name: 'nfc',
        sql: sql
    });
    return ret;
}

function deleteTags_CategoriesByTag_id(tag_id) {
    var sql = "delete from tags_categories where tag_id = " + tag_id;
    var ret = db.executeSqlSync({
        name: 'nfc',
        sql: sql
    });
    return ret;
}
