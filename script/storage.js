function judgeAndInit(table) {
    var content = $api.getStorage(table);
    if (content == undefined) {
        var init_table = {
            count: 0,
            maxid: 0,
            data: []
        };
        $api.setStorage(table, init_table);
    }
}

function isExistTag_code(tag_code) {
    judgeAndInit("tag");
    var data = $api.getStorage("tag").data;
    var length = data.length;
    if (length == 0) {
        return -1;
    }
    else {
        for (var i = 0; i < length; i++) {
            if (data[i].tag_code == tag_code) {
                return i;
            }
        }
        return -1;
    }
}

function isExistRoom_code(room_code) {
    judgeAndInit("tag");
    var data = $api.getStorage("room").data;
    var length = data.length;
    if (length == 0) {
        return -1;
    }
    else {
        for (var i = 0; i < length; i++) {
            if (data[i].room_code == room_code) {
                return i;
            }
        }
        return -1;
    }
}

function isExistCate_name(cate_name) {
    judgeAndInit("category");
    var data = $api.getStorage("category").data;
    var length = data.length;
    if (length == 0) {
        return -1;
    }
    else {
        for (var i = 0; i < length; i++) {
            if (data[i].cate_name == cate_name) {
                return i;
            }
        }
        return -1;
    }

}

function addCate_name(cate_name) {
    judgeAndInit("category");
    var content = $api.getStorage("category");
    var dataItem = {
        cate_id: content.maxid+1,
        cate_name: cate_name
    };
    content.count += 1;
    content.maxid += 1;
    content.data.push(dataItem);
    $api.setStorage("category", content);
    return dataItem.cate_id;
}

function addTag_code_name_pic(room_id, tag_code, tag_name, tag_pic) {
    judgeAndInit("tag");
    var content = $api.getStorage("tag");
    var dataItem = {
        room_id: room_id, // 初始化为-1
        tag_id: content.maxid+1,
        tag_code: tag_code,
        tag_name: tag_name,
        tag_pic: tag_pic || ""
    };
    content.count += 1;
    content.maxid += 1;
    content.data.push(dataItem);
    $api.setStorage("tag", content);
    return dataItem.tag_id;
}


function getCate_id(cate_name) {
    judgeAndInit("category");
    var data = $api.getStorage("category").data;
    var length = data.length;
    for (var i = 0; i < length; i++) {
        if (data[i].cate_name == cate_name) {
            return data[i].cate_id;
        }
    }
    return -1;
}

function addRoom_code_name(room_code, room_name) {
    judgeAndInit("room");
    var content = $api.getStorage("room");
    var dataItem = {
        room_id: content.maxid+1,
        room_code: room_code,
        room_name: room_name || ""
    };
    content.count += 1;
    content.maxid += 1;
    content.data.push(dataItem);
    $api.setStorage("room", content);
    return dataItem.room_id;
}

function updateTag_room_idBytag_id(tag_id, room_id) {
    judgeAndInit("tag");
    var content = $api.getStorage("tag");
    var data = content.data;
    var length = data.length;
    for (var i = 0; i < length; i++) {
        if (data[i].tag_id == tag_id) {
            data[i].room_id = room_id;
            break;
        }
    }
    content.data = data;
    $api.setStorage("tag", content);
}

function isRoomnameDuplicateWithOthername(room_name) {
    judgeAndInit("room");
    var count = 0;
    var data = $api.getStorage("room").data;
    var length = data.length;
    if (length == 0) {
        return 0;
    }
    else {
        for (var i = 0; i < length; i++) {
            if (data[i].room_name == room_name) {
                count++;
                if (count >= 1) {
                    return 1;
                }
            }
        }
        return 0;
    }
}

function isTagnameDuplicateWithOthername(tag_name) {
    judgeAndInit("tag");
    var data = $api.getStorage("tag").data;
    var length = data.length;
    if (length == 0) {
        return 0;
    }
    else {
        for (var i = 0; i < length; i++) {
            if (data[i].tag_name == tag_name) {
                return 1;
            }
        }
        return 0;
    }
}

function updateTag_name_pic(room_id, tag_code, tag_name, tag_pic) {
    judgeAndInit("tag");
    var content = $api.getStorage("tag");
    var data = content.data;
    var length = data.length;
    for (var i = 0; i < length; i++) {
        if (data[i].tag_code == tag_code) {
            data[i].room_id = room_id;
            data[i].tag_name = tag_name;
            data[i].tag_pic = tag_pic;
            content.data = data;
            $api.setStorage("tag", content);
            break;
        }
    }
}

function getTag_id(tag_code) {
    judgeAndInit("tag");
    var data = $api.getStorage("tag").data;
    var length = data.length;
    for (var i = 0; i < length; i++) {
        if (data[i].tag_code == tag_code) {
            return data[i].tag_id;
        }
    }
}

function getTag_idBytag_name(tag_name) {
    judgeAndInit("tag");
    var data = $api.getStorage("tag").data;
    var length = data.length;
    for (var i = 0; i < length; i++) {
        if (data[i].tag_name == tag_name) {
            return data[i].tag_id;
        }
    }
}

function updateTagsCategoriesByTag_code(tag_code, cate_name) {
    var tag_id = getTag_id(tag_code);
    var cate_name_length = cate_name.length;
    var cate_id = [];
    for (var i = 0; i < cate_name_length; i++) {
        cate_id.push(getCate_id(cate_name[i]));
    }
    judgeAndInit("tags_categories");
    var content = $api.getStorage("tags_categories");
    var count = content.count;
    var maxid = content.maxid;
    var data = content.data;
    var length = data.length;
    var tempData = [];
    var num = 0;
    for (var i = 0; i < length; i++) {
        if (data[i].tag_id != tag_id) {
            tempData.push(data[i]);
            num++;
        }
    }

    for (var i = 0; i < cate_name_length; i++) {
        var item = {
            tag_id: tag_id,
            cate_id: cate_id[i]
        };
        num++;
        tempData.push(item);
    }
    content.count = num;
    content.maxid = maxid;
    content.data = tempData;
    $api.setStorage("tags_categories", content);
}

function addTagsCategories_tagid_cateid(tag_id, cate_id) {
    judgeAndInit("tags_categories");
    var content = $api.getStorage("tags_categories");
    var dataItem = {
        tag_id: tag_id,
        cate_id: cate_id
    };
    content.count += 1;
    content.maxid += 1;
    content.data.push(dataItem);
    $api.setStorage("tags_categories", content);
}

function updateRoom_name(room_code, room_name) {
    judgeAndInit("room");
    var content = $api.getStorage("room");
    var data = content.data;
    var length = data.length;
    for (var i = 0; i < length; i++) {
        if (data[i].room_code == room_code) {
            data[i].room_name = room_name;
            content.data = data;
            $api.setStorage("room", content);
            return data[i].room_id;
        }
    }
}

function getTag_name(tag_code) {
    judgeAndInit("tag");
    var data = $api.getStorage("tag").data;
    var length = data.length;
    for (var i = 0; i < length; i++) {
        if (data[i].tag_code == tag_code) {
            return data[i].tag_name;
        }
    }
    return "";
}

function getTag_code(tag_name) {
    judgeAndInit("tag");
    var data = $api.getStorage("tag").data;
    var length = data.length;
    for (var i = 0; i < length; i++) {
        if (data[i].tag_name == tag_name) {
            return data[i].tag_code;
        }
    }
    return "";
}

function getTag_nameByTag_id(tag_id) {
    judgeAndInit("tag");
    var data = $api.getStorage("tag").data;
    var length = data.length;
    for (var i = 0; i < length; i++) {
        if (data[i].tag_id == tag_id) {
            return data[i].tag_name;
        }
    }
    return "";
}

function getRoom_name(room_code) {
    judgeAndInit("room");
    var data = $api.getStorage("room").data;
    var length = data.length;
    for (var i = 0; i < length; i++) {
        if (data[i].room_code == room_code) {
            return data[i].room_name;
        }
    }
    return "";
}

function getRoom_nameByRoom_id(room_id) {
    judgeAndInit("room");
    var data = $api.getStorage("room").data;
    var length = data.length;
    for (var i = 0; i < length; i++) {
        if (data[i].room_id == room_id) {
            return data[i].room_name;
        }
    }
    return "no room";
}

function getRoom_id(room_code) {
    judgeAndInit("room");
    var data = $api.getStorage("room").data;
    var length = data.length;
    for (var i = 0; i < length; i++) {
        if (data[i].room_code == room_code) {
            return data[i].room_id;
        }
    }
    return -1;
}

function getCate_idsFromTagsCategories(tag_code) {
    judgeAndInit("tags_categories");
    var tag_id = getTag_id(tag_code);
    var cate_id = [];
    var data = $api.getStorage("tags_categories").data;
    var length = data.length;
    for (var i = 0; i < length; i++) {
        if (data[i].tag_id == tag_id) {
            cate_id.push(data[i].cate_id);
        }
    }
    return cate_id;
}

function getCate_name(cate_id) {
    judgeAndInit("category");
    var data = $api.getStorage("category").data;
    var length = data.length;
    for (var i = 0; i < length; i++) {
        if (data[i].cate_id == cate_id) {
            return data[i].cate_name;
        }
    }
}

function getCatenames(cate_ids) {
    var cate_names = [];
    var length = cate_ids.length;
    for (var i = 0; i < length; i++) {
        cate_names.push(getCate_name(cate_ids[i]));
    }
    return cate_names;
}

function getTag_pic(tag_code) {
    judgeAndInit("tag");
    var data = $api.getStorage("tag").data;
    var length = data.length;
    for (var i = 0; i < length; i++) {
        if (data[i].tag_code == tag_code) {
            return data[i].tag_pic;
        }
    }
    return "";
}

function getTagidsFromTagsCategories(cate_id) {
    var tagids = [];
    judgeAndInit("tags_categories");
    var data = $api.getStorage("tags_categories").data;
    var length = data.length;
    for (var i = 0; i < length; i++) {
        if (data[i].cate_id == cate_id) {
            tagids.push(data[i].tag_id);
        }
    }
    return tagids;
}

function getPic_name(tag_id) {
    judgeAndInit("tag");
    var data = $api.getStorage("tag").data;
    var length = data.length;
    for (var i = 0; i < length; i++) {
        if (data[i].tag_id == tag_id) {
            var item = data[i];
            return item;
        }
    }
}

function getPic_nameBytag_name(tag_name) {
    judgeAndInit("tag");
    var data = $api.getStorage("tag").data;
    var length = data.length;
    for (var i = 0; i < length; i++) {
        if (data[i].tag_name == tag_name) {
            return data[i].tag_pic;
        }
    }
}


function getTag_name_pics(tagids) {
    var names_pics = [];
    var length = tagids.length;
    for (var i = 0; i < length; i++) {
        var item = getPic_name(tagids[i]);
        names_pics.push(item);
    }
    return names_pics;
}

function getRoom_idForTagByTag_code(tag_code) {
    judgeAndInit("tag");
    var data = $api.getStorage("tag").data;
    var length = data.length;
    for (var i = 0; i < length; i++) {
        if (data[i].tag_code == tag_code) {
            return data[i].tag_id;
        }
    }
}

function getRoom_idByroom_name(room_name) {
    judgeAndInit("room");
    var data = $api.getStorage("room").data;
    var length = data.length;
    for (var i = 0; i < length; i++) {
        if (data[i].room_name == room_name) {
            return data[i].room_id;
        }
    }
    return -1;
}

function getTag_name_picsByroom_id(room_id) {
    judgeAndInit("tag");
    var names_pics = [];
    var data = $api.getStorage("tag").data;
    var length = data.length;
    for (var i = 0; i < length; i++) {
        if (data[i].room_id == room_id) {
            var item = {
                tag_pic: data[i].tag_pic,
                tag_name: data[i].tag_name
            };
            names_pics.push(item);
        }
    }
    return names_pics;
}

function updateTempchecklist(table, item) {
    var content = $api.getStorage(table);
    var data = content.data;
    var length = data.length;
    var isFind = 0;
    for (var i = 0; i < length; i++) {
        if (data[i].selectedcategory == item.selectedcategory) {
            isFind = 1;
            data[i] = item;
            content.data = data;
            $api.setStorage(table, content);
            return;
        }
    }
    if (isFind == 0) {
        data.push(item);
        content.count += 1;
        content.maxid += 1;
        content.data = data;
        $api.setStorage(table, content);
    }
}

function clear(table) {
    var content = $api.getStorage(table);
    content.count = 0;
    content.maxid = 0;
    content.data = [];
    $api.setStorage(table, content);
}

function getNumsOfSelectedTagsByCategoryFromTempchecklist(table, cate_name) {
    var content = $api.getStorage(table);
    if (content == undefined) {
        var init_table = {
            count: 0,
            maxid: 0,
            data: []
        };
        $api.setStorage(table, init_table);
        return 0;
    }
    else {
        var content = $api.getStorage(table);
        var data = content.data;
        var length = data.length;
        for (var i = 0; i < length; i++) {
            if (data[i].selectedcategory == cate_name) {
                return data[i].selectedtags.length;
            }
        }
        return 0;
    }
}

function judgeTagisSelectedFromTempCheckList(cate_name, tag_name) {
    var content = $api.getStorage("tempchecklist");
    if (content == undefined) {
        var init_table = {
            count: 0,
            maxid: 0,
            data: []
        };
        $api.setStorage("tempchecklist", init_table);
        return 0;
    }
    else {
        var content = $api.getStorage("tempchecklist");
        var data = content.data;
        var length = data.length;
        for (var i = 0; i < length; i++) {
            if (data[i].selectedcategory == cate_name) {
                var tags = data[i].selectedtags;
                var tagsnumber = tags.length;
                for (var j = 0; j < tagsnumber; j++) {
                    if (tags[j] == tag_name) {
                        return 1;
                    }
                }
            }
        }
        return 0;
    }
}

function isExistChecklistname(inputValue) {
    judgeAndInit("checklist");
    var content = $api.getStorage("checklist");
    if (content.count == 0) {
        return -1;
    }
    else {
        var data = content.data;
        var length = data.length;
        for (var i = 0; i < length; i++) {
            if (data[i].listname == inputValue) {
                return 1;
            }
        }
        return -1;
    }
}

function addChecklist(item) {
    judgeAndInit("checklist");
    var content = $api.getStorage("checklist");
    content.count += 1;
    content.maxid += 1;
    item.listid = content.maxid;
    content.data.push(item);
    $api.setStorage("checklist", content);
}

function deleteChecklistByListid(listid) {
    var content = $api.getStorage("checklist");
    var data = content.data;
    var length = data.length;
    var tempData = [];
    var tempCount = 0;
    for (var i = 0; i < length; i++) {
        if (data[i].listid != listid) {
            tempData.push(data[i]);
            tempCount++;
        }
    }

    content.data = tempData;
    content.count = tempCount;
    $api.setStorage("checklist", content);
}

function getNumsOfSelectedTagsByCategoryFromChecklist(listid, cate_name) {
    var content = $api.getStorage("checklist");
    var data = content.data;
    var length = data.length;
    for (var i = 0; i < length; i++) {
        if (data[i].listid == listid) {
            var categoriesandtagsData = data[i].categoriesandtags;
            var categoriesandtagslength = categoriesandtagsData.length;
            for (var j = 0; j < categoriesandtagslength; j++) {
                if (categoriesandtagsData[j].selectedcategory == cate_name) {
                    return categoriesandtagsData[j].selectedtags.length;
                }
            }
        }
    }
    return 0;
}

function judgeTagisSelectedFromCheckList(listid, cate_name, tag_name) {
    var content = $api.getStorage("checklist");
    var data = content.data;
    var length = data.length;
    for (var i = 0; i < length; i++) {
        if (data[i].listid == listid) {
            var categoriesandtagsData = data[i].categoriesandtags;
            var categoriesandtagslength = categoriesandtagsData.length;
            for (var j = 0; j < categoriesandtagslength; j++) {
                if (categoriesandtagsData[j].selectedcategory == cate_name) {
                    var selectedtagsData = categoriesandtagsData[j].selectedtags;
                    var selectedtagslength = selectedtagsData.length;
                    for (var k = 0; k < selectedtagslength; k++) {
                        if (selectedtagsData[k] == tag_name) {
                            return 1;
                        }
                    }
                }
            }
        }
    }
    return 0;
}

function updateChecklist(listid, cate_name, selectedtags) {
    var content = $api.getStorage("checklist");
    var data = content.data;
    var length = data.length;
    for (var i = 0; i < length; i++) {
        if (data[i].listid == listid) {
            var categoriesandtagsData = data[i].categoriesandtags;
            var categoriesandtagslength = categoriesandtagsData.length;
            if (categoriesandtagslength == 0) {
                data[i].categoriesandtags.push(
                    {
                        selectedcategory: cate_name,
                        selectedtags: selectedtags
                    }
                );
                content.data = data;
                $api.setStorage("checklist", content);
                return;
            }
            else {
                var isDifferentCategory = 1;
                for (var j = 0; j < categoriesandtagslength; j++) {
                    if (categoriesandtagsData[j].selectedcategory == cate_name) {

                        data[i].categoriesandtags[j].selectedtags = selectedtags;
                        content.data = data;
                        $api.setStorage("checklist", content);
                        isDifferentCategory = 0;
                        break;
                    }
                }
                if (isDifferentCategory == 1) {
                    data[i].categoriesandtags.push(
                        {
                            selectedcategory: cate_name,
                            selectedtags: selectedtags
                        }
                    );
                    content.data = data;
                    $api.setStorage("checklist", content);
                }
            }

        }
    }
}

function isDuplicateCate_nameWithOtherCategoty(cate_name) {
    judgeAndInit("category");
    var content = $api.getStorage("category");
    var data = content.data;
    var length = data.length;
    if (length == 0) {
        return 0;
    }
    var nums = 0;
    for (var i = 0; i < length; i++) {
        if (data[i].cate_name == cate_name) {
            nums++;
            if (nums >= 1) {
                return 1;
            }
        }
    }
    return 0;
}

function updateCate_name(oldCate_name, newCate_name) {
    judgeAndInit("category");
    var content = $api.getStorage("category");
    var data = content.data;
    var length = data.length;
    for (var i = 0; i < length; i++) {
        if (data[i].cate_name == oldCate_name) {
            data[i].cate_name = newCate_name;
            content.data = data;
            $api.setStorage("category", content);
            return 1;
        }
    }
    return 0;
}

function updateRoom_nameWithNewNameByOldName(oldRoom_name, newRoom_name) {
    judgeAndInit("room");
    var content = $api.getStorage("room");
    var data = content.data;
    var length = data.length;
    for (var i = 0; i < length; i++) {
        if (data[i].room_name == oldRoom_name) {
            data[i].room_name = newRoom_name;
            content.data = data;
            $api.setStorage("room", content);
            return 1;
        }
    }
    return 0;
}


function getAllTag_ids() {
    judgeAndInit("tag");
    var content = $api.getStorage("tag");
    var data = content.data;
    var length = data.length;
    var tagids = [];
    for (var i = 0; i < length; i++) {
        tagids.push(data[i].tag_id);
    }
    return tagids;
}



function addTagsToTagsCategories(tag_names, cate_name) {
    var cate_id = getCate_id(cate_name);
    judgeAndInit("tags_categories");
    var content = $api.getStorage("tags_categories");
    var data = content.data;
    var count = content.count;
    var maxid = content.maxid;
    var tag_nameslength = tag_names.length;
    for (var i = 0; i < tag_nameslength; i++) {
        var tag_id = getTag_idBytag_name(tag_names[i]);
        var item = {
            tag_id: tag_id,
            cate_id: cate_id
        };
        count++;
        maxid++;
        data.push(item);
    }
    content.count = count;
    content.maxid = maxid;
    content.data = data;
    $api.setStorage("tags_categories", content);
}

function deleteTagByTag_name(tag_name) {
    var content = $api.getStorage("tag");
    var data = content.data;
    var length = data.length;
    var tempData = [];
    var tempCount = 0;
    for (var i = 0; i < length; i++) {
        if (data[i].tag_name == tag_name) {
            continue;
        }
        else {

            tempCount++;
            tempData.push(data[i]);
        }
    }
    content.count = tempCount;
    content.data = tempData;
    $api.setStorage("tag", content);

    deleteTag_idBytag_nameFromTags_categoriesBy(tag_name);
}

function deleteTag_idBytag_nameFromTags_categoriesBy(tag_name) {
    var tag_id = getTag_idBytag_name(tag_name);
    judgeAndInit("tags_categories");
    var content = $api.getStorage("tags_categories");
    var data = content.data;
    var length = data.length;
    var tempData = [];
    var tempCount = 0;
    for (var i = 0; i < length; i++) {
        if (data[i].tag_id == tag_id) {
            continue;
        }
        else {
            tempCount++;
            tempData.push(data[i]);
        }
    }
    content.count = tempCount;
    content.data = tempData;
    $api.setStorage("tags_categories", content);
}

function deleteTag_idBycatge_nameFromTags_categories(tag_id, cate_name) {
    var cate_id = getCate_id(cate_name);
    var content = $api.getStorage("tags_categories");
    var data = content.data;
    var length = data.length;
    var tempData = [];
    var tempCount = 0;
    for (var i = 0; i < length; i++) {
        if (data[i].cate_id == cate_id && data[i].tag_id == tag_id) {
            continue;
        }
        else {
            var item = {
                tag_id: data[i].tag_id,
                cate_id: data[i].cate_id
            };
            tempCount++;
            tempData.push(item);
        }
    }
    content.count = tempCount;
    content.data = tempData;
    $api.setStorage("tags_categories", content);
}

function deleteTag_idByCourse_idFromCourses_tags(tag_id, course_id) {
    var content = $api.getStorage("courses_tags");
    var data = content.data;
    var length = data.length;
    var tempData = [];
    var tempCount = 0;
    for (var i = 0; i < length; i++) {
        if (data[i].course_id == course_id && data[i].tag_id == tag_id) {
            continue;
        }
        else {
            var item = {
                tag_id: data[i].tag_id,
                course_id: data[i].course_id
            };
            tempCount++;
            tempData.push(item);
        }
    }
    content.count = tempCount;
    content.data = tempData;
    $api.setStorage("courses_tags", content);
}

function deleteCategory(cate_name) {
    judgeAndInit("category");
    var content = $api.getStorage("category");
    var data = content.data;
    var length = data.length;
    var cate_id = getCate_id(cate_name);

    var tempData = [];
    var tempCount = 0;

    for (var i = 0; i < length; i++) {
        if (data[i].cate_name != cate_name) {
            tempData.push(data[i]);
            tempCount++;
        }
    }
    content.data = tempData;
    content.count = tempCount;
    $api.setStorage("category", content);
    deleteTags_Categories(cate_id);
}

function deleteRoom(room_name) {
    judgeAndInit("room");
    var content = $api.getStorage("room");
    var data = content.data;
    var length = data.length;

    var tempData = [];
    var tempCount = 0;

    for (var i = 0; i < length; i++) {
        if (data[i].room_name != room_name) {
            tempData.push(data[i]);
            tempCount++;
        }
    }
    content.data = tempData;
    content.count = tempCount;
    $api.setStorage("room", content);

    var room_id = getRoom_idByroom_name(room_name);
    deleteTagByRoom_id(room_id);
}

function deleteTagByRoom_id(room_id) {
    judgeAndInit("tag");
    var content = $api.getStorage("tag");
    var data = content.data;
    var length = data.length;
    for (var i = 0; i < length; i++) {
        if (data[i].room_id == room_id) {
            data[i].room_id = -1;
        }
    }
    content.data = data;
    $api.setStorage("tag", content);
}

function deleteTags_Categories(cate_id) {
    judgeAndInit("tags_categories");
    var content = $api.getStorage("tags_categories");
    var data = content.data;
    var length = data.length;

    var tempData = [];
    var tempCount = 0;

    for (var i = 0; i < length; i++) {
        if (data[i].cate_id != cate_id) {
            tempData.push(data[i]);
            tempCount++;
        }
    }
    content.data = tempData;
    content.count = tempCount;
    $api.setStorage("tags_categories", content);
}

function deleteTagByRoom_name(tag_id, room_name) {
    judgeAndInit("tag");
    var content = $api.getStorage("tag");
    var data = content.data;
    var length = data.length;
    var room_id = getRoom_idByroom_name(room_name);
    for (var i = 0; i < length; i++) {
        if (data[i].tag_id == tag_id) {
            data[i].room_id = -1;
            content.data = data;
            $api.setStorage("tag", content);
            return;
        }
    }
}

function getTagnamesNotBelongtoSomeRoom(room_name) {
    var tag_names = [];
    var room_id = getRoom_idByroom_name(room_name);
    judgeAndInit("tag");
    var data = $api.getStorage("tag").data;
    var length = data.length;
    for (var i = 0; i < length; i++) {
        if (data[i].room_id != room_id) {
            tag_names.push(data[i].tag_name);
        }
    }
    return tag_names;
}

function updateTagsToTagsSomeRoom(tag_names, room_name) {
    var room_id = getRoom_idByroom_name(room_name);

    judgeAndInit("tag");
    var content = $api.getStorage("tag");
    var data = content.data;
    var length = data.length;

    var numoftag_names = tag_names.length;
    for (var i = 0; i < numoftag_names; i++) {
        for (var j = 0; j < length; j++) {
            if (tag_names[i] == data[j].tag_name) {
                data[j].room_id = room_id;
            }
        }
    }
    content.data = data;
    $api.setStorage("tag", content);
}

function isDuplicateRoom_nameWithOtherRoom(room_name) {
    judgeAndInit("room");
    var content = $api.getStorage("room");
    var data = content.data;
    var length = data.length;
    for (var i = 0; i < length; i++) {
        if (data[i].room_name == room_name) {
            return 1;
        }
    }
    return 0;
}

function judgeIsExist(array, item) {
    var length = array.length;
    for (var i = 0; i < length; i++) {
        if (array[i] == item) {
            return 1;
        }
    }
    return 0;
}

function getSelectedTagsFromChecklistBylistid(listid) {
    judgeAndInit("checklist");
    var content = $api.getStorage("checklist");
    var data = content.data;
    var length = data.length;
    var res = [];
    for (var i = 0; i < length; i++) {
        if (data[i].listid == listid) {
            var categoriesandtags = data[i].categoriesandtags;
            var categoriesandtagsLength = categoriesandtags.length;
            for (var j = 0; j < categoriesandtagsLength; j++) {
                var selectedtags = categoriesandtags[j].selectedtags;
                var selectedtagsLength = selectedtags.length;
                for (var k = 0; k < selectedtagsLength; k++) {
                    if (judgeIsExist(res, selectedtags[k]) == 0) {
                        res.push(selectedtags[k]);
                    }
                }
            }
        }
    }
    return res;
}

function getTag_Pics_idsBynames(tag_names) {
    judgeAndInit("tag");
    var tag_namesLength = tag_names.length;
    var data = $api.getStorage("tag").data;
    var length = data.length;
    var res = []
    for (var i = 0; i < tag_namesLength; i++) {
        for (var j = 0; j < length; j++) {
            if (tag_names[i] == data[j].tag_name) {
                res.push(data[j]);
            }
        }
    }
    return res;
}

function getUniqueTagidsFromTagsCategories() {
    judgeAndInit("tags_categories");
    var tag_ids = [];
    var data = $api.getStorage("tags_categories").data;
    var length = data.length;
    for (var i = 0; i < length; i++) {
        var res = judgeIsExist(tag_ids, data[i].tag_id);
        if (res == 0) {
            tag_ids.push(data[i].tag_id);
        }
    }
    return tag_ids;
}

function getTag_Pics_namesWithoutCategory() {
    judgeAndInit("tag");
    var names_pics = [];
    var data = $api.getStorage("tag").data;
    var length = data.length;

    var uniqueTagidsFromTags_categories = getUniqueTagidsFromTagsCategories();
    for (var i = 0; i < length; i++) {
        var res = judgeIsExist(uniqueTagidsFromTags_categories, data[i].tag_id);
        if (res == 0) {
            names_pics.push(data[i]);
        }
    }
    return names_pics;

}

function getTag_Pics_namesWithoutRoom() {
    judgeAndInit("tag");
    var names_pics = [];
    var data = $api.getStorage("tag").data;
    var length = data.length;

    for (var i = 0; i < length; i++) {
        if (data[i].room_id < 0) {
            names_pics.push(data[i]);
        }
    }
    return names_pics;
}

function addWeek(name) {
    judgeAndInit("week");
    var content = $api.getStorage("week");
    var maxid = content.maxid;
    var data = content.data;
    var item = {
        id: maxid+1,
        week_name: name
    };
    data.push(item);
    content.data = data;
    content.maxid += 1;
    content.count += 1;
    $api.setStorage("week", content);
}

function addCourse(name) {
    judgeAndInit("course");
    var content = $api.getStorage("course");
    var maxid = content.maxid;
    var data = content.data;
    var item = {
        id: maxid+1,
        course_name: name
    };
    data.push(item);
    content.data = data;
    content.maxid += 1;
    content.count += 1;
    $api.setStorage("course", content);
}

function getWeek_id(week_name) {
    var data = $api.getStorage("week").data;
    var length = data.length;
    for (var i = 0; i < length; i++) {
        if (data[i].week_name == week_name) {
            return data[i].id;
        }
    }
    return -1;
}

function getCourse_id(course_name) {
    var data = $api.getStorage("course").data;
    var length = data.length;
    for (var i = 0; i < length; i++) {
        if (data[i].course_name == course_name) {
            return data[i].id;
        }
    }
    return -1;
}

function addWeeks_Courses(week_name, course_name) {
    judgeAndInit("weeks_courses");
    var week_id = getWeek_id(week_name);
    var course_id = getCourse_id(course_name);
    var content = $api.getStorage("weeks_courses");
    var data = content.data;
    var item = {
        week_id: week_id,
        course_id: course_id
    };
    data.push(item);
    content.maxid += 1;
    content.count += 1;
    content.data = data;
    $api.setStorage("weeks_courses", content);
}

function getCourse_name(course_id) {
    judgeAndInit("course");
    var data = $api.getStorage("course").data;
    var length = data.length;
    for (var i = 0; i < length; i++) {
        if (data[i].id == course_id) {
            return data[i].course_name;
        }
    }
}

function getCoursesByWeek_id(week_id) {
    judgeAndInit("weeks_courses");
    var data = $api.getStorage("weeks_courses").data;
    var length = data.length;
    var course_ids = [];
    for (var i = 0; i < length; i++) {
        if (data[i].week_id == week_id) {
            course_ids.push(data[i].course_id);
        }
    }

    judgeAndInit("course");
    var course_idsLength = course_ids.length;
    var courses = [];
    for (var i = 0; i < course_idsLength; i++) {
        var course_name = getCourse_name(course_ids[i]);
        var item = {
            id: course_ids[i],
            course_name: course_name
        };
        courses.push(item);
    }
    return courses;
}

function getWeek_nameByWeek_id(week_id) {
    judgeAndInit("week");
    var data = $api.getStorage("week").data;
    var length = data.length;
    for (var i = 0; i < length; i++) {
        if (data[i].id == week_id) {
            return data[i].week_name;
        }
    }
}

function getTag_idsFromCourses_tagsByCourse_id(course_id) {
    judgeAndInit("courses_tags");
    var tag_ids = [];
    var data = $api.getStorage("courses_tags").data;
    var length = data.length;
    for (var i = 0; i < length; i++) {
        if (data[i].course_id == course_id) {
            tag_ids.push(data[i].tag_id);
        }
    }
    return tag_ids;
}

function getTagnamesNotBelongtoSomeCategory(cate_name) {
    judgeAndInit("category");
    var cate_id = getCate_id(cate_name);
    var tagidsBelongtoSomeCategory = getTagidsFromTagsCategories(cate_id);
    var belonglength = tagidsBelongtoSomeCategory.length;
    judgeAndInit("tag") ;
    var content = $api.getStorage("tag");
    var data = content.data;
    var length = data.length;
    var tag_names = [];
    for (var i = 0; i < length; i++) {
        var isBelongto = 0;
        for (var j = 0; j < belonglength; j++) {
            if (data[i].tag_id == tagidsBelongtoSomeCategory[j]) {
                isBelongto = 1;
                break;
            }
        }
        if (isBelongto == 0) {
            tag_names.push(getTag_name(data[i].tag_code));
        }
    }
    return tag_names;
}

function getTagidsFromCoursesTags(course_id) {
    var tagids = [];
    judgeAndInit("courses_tags");
    var data = $api.getStorage("courses_tags").data;
    var length = data.length;
    for (var i = 0; i < length; i++) {
        if (data[i].course_id == course_id) {
            tagids.push(data[i].tag_id);
        }
    }
    return tagids;
}

function getTagnamesNotBelongtoSomeCourse(course_id) {
    judgeAndInit("courses_tags");
    var tagidsBelongtoSomeCourse = getTagidsFromCoursesTags(course_id);
    var belonglength = tagidsBelongtoSomeCourse.length;
    judgeAndInit("tag") ;
    var content = $api.getStorage("tag");
    var data = content.data;
    var length = data.length;
    var tag_names = [];
    for (var i = 0; i < length; i++) {
        var isBelongto = 0;
        for (var j = 0; j < belonglength; j++) {
            if (data[i].tag_id == tagidsBelongtoSomeCourse[j]) {
                isBelongto = 1;
                break;
            }
        }
        if (isBelongto == 0) {
            tag_names.push(getTag_name(data[i].tag_code));
        }
    }
    return tag_names;
}

function addTagsToCoursesTags(tag_names, course_id) {
    judgeAndInit("courses_tags");
    var content = $api.getStorage("courses_tags");
    var data = content.data;
    var count = content.count;
    var maxid = content.maxid;
    var tag_nameslength = tag_names.length;
    for (var i = 0; i < tag_nameslength; i++) {
        var tag_id = getTag_idBytag_name(tag_names[i]);
        var item = {
            tag_id: tag_id,
            course_id: course_id
        };
        count++;
        maxid++;
        data.push(item);
    }
    content.count = count;
    content.maxid = maxid;
    content.data = data;
    $api.setStorage("courses_tags", content);
}

function getTag_codeByTag_id(tag_id) {
    judgeAndInit("tag");
    var data = $api.getStorage("tag").data;
    var length = data.length;
    for (var i = 0; i < length; i++) {
        if (data[i].tag_id == tag_id) {
            return data[i].tag_code;
        }
    }
}

function getTagItemByTag_code(tag_code) {
    judgeAndInit("tag");
    var data = $api.getStorage("tag").data;
    var length = data.length;
    for (var i = 0; i < length; i++) {
        if (data[i].tag_code == tag_code) {
            return data[i];
        }
    }
}

function getCheckListName(listid) {
    judgeAndInit("checklist");
    var data = $api.getStorage("checklist").data;
    var length = data.length;
    for (var i = 0; i < length; i++) {
        if (data[i].listid == listid) {
            return data[i].listname;
        }
    }
}
