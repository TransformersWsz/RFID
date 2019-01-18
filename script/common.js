function getIntOfHex(c) {
    if (c == "0") {
        return 0;
    }
    if (c == "1") {
        return 1;
    }
    if (c == "2") {
        return 2;
    }
    if (c == "3") {
        return 3;
    }
    if (c == "4") {
        return 4;
    }
    if (c == "5") {
        return 5;
    }
    if (c == "6") {
        return 6;
    }
    if (c == "7") {
        return 7;
    }
    if (c == "8") {
        return 8;
    }
    if (c == "9") {
        return 9;
    }
    if (c == "a" || c == "A") {
        return 10;
    }
    if (c == "b" || c == "B") {
        return 11;
    }
    if (c == "c" || c == "C") {
        return 12;
    }
    if (c == "d" || c == "D") {
        return 13;
    }
    if (c == "e" || c == "E") {
        return 14;
    }
    if (c == "f" || c == "F") {
        return 15;
    }
}

function strHexToInt(rssi) {
    var res = getIntOfHex(rssi[0]) * 16 + getIntOfHex(rssi[1]);
    return res;
}

function avgOfArr(arr) {
    var length = arr.length;
    var sum = 0.0;
    for (var i = 0; i < length; i++) {
        sum += arr[i];
    }
    return sum / length;
}

// 添加自定义类别
function addCustomCategory() {

    dialog.prompt({
        title: "category",
        text: "please input category",
        buttons: ["cancel", "ok"]
    }, function(ret) {
        if (ret.buttonIndex == 2) {
            var inputValue = ret.text;

            if (inputValue == "") {
                dialog.alert({
                    title: "warning",
                    msg: "Category cannot be empty",
                    buttons:['OK']
                },function(ret){

                });
            }
            else {
                var res = isExistCate_name(inputValue);


                if (res >= 1) {
                    dialog.alert({
                        title: "error",
                        msg: "Duplicate category name",
                        buttons:['OK']
                    },function(ret){

                    });
                } else {
                    addCate_name(inputValue);
                    api.execScript({
                        name: 'lists',
                        frameName: 'list_category',
                        script: 'execRefresh();'
                    });

                    var tempHtml = "<li class='aui-list-item'><div class='aui-list-item-inner'>" + inputValue + "</div></li>";
                    cate_names = [];
                    cate_names.push(inputValue);
                    $api.byId('categoryname').innerHTML = "";
                    $api.byId('categoryname').innerHTML += tempHtml;
                    $api.byId('categoryname').innerHTML += "<li class='aui-list-item' tapmode='item-hov' onclick='addTagToCategories()'><div class='aui-list-item-inner'>Add new category</div></li>";
                }
            }
        }
    });



    // var dialogBox = api.require('dialogBox');
    // dialogBox.input({
    //     keyboardType: 'default',
    //     texts: {
    //         title: 'category',
    //         placeholder: 'please input category',
    //         leftBtnTitle: 'cancel',
    //         rightBtnTitle: 'ok'
    //     },
    //     styles: {
    //         bg: '#fff',
    //         corner: 2,
    //         w: 300,
    //         h: 170,
    //         title: {
    //             h: 20,
    //             alignment: 'center',
    //             size: 15,
    //             color: '#000',
    //             marginT: 18,
    //         },
    //         input: {
    //             h: 40,
    //             marginT: 30,
    //             marginLeft: 10,
    //             marginRight: 10,
    //             textSize: 15,
    //             textColor: '#000',
    //             borderColor: "orange",
    //             borderWidth: 2
    //         },
    //         dividingLine: {
    //             width: 1,
    //             color: '#696969'
    //         },
    //         left: {
    //             bg: 'rgba(0,0,0,0)',
    //             color: '#007FFF',
    //             size: 18
    //         },
    //         right: {
    //             bg: 'rgba(0,0,0,0)',
    //             color: '#007FFF',
    //             size: 18
    //         },
    //         horizontalLine: {
    //             color: 'rgba(245,245,245,0)',
    //             height: 5
    //         },
    //         verticalLine: {
    //             color: 'rgba(245,245,245,0)',
    //             width: 10
    //         },
    //     }
    // }, function(ret) {
    //     if (ret.eventType == 'right') {
    //         var inputValue = ret.text;
    //
    //         var res = isExistCate_name(inputValue);
    //
    //         if (res >= 1) {
    //             alert("Duplicate category name");
    //         } else {
    //             addCate_name(inputValue);
    //             var tempHtml = "<li class='aui-list-item'><div class='aui-list-item-inner'>" + inputValue + "</div></li>";
    //             cate_names = [];
    //             cate_names.push(inputValue);
    //             $api.byId('categoryname').innerHTML = "";
    //             $api.byId('categoryname').innerHTML += tempHtml;
    //             $api.byId('categoryname').innerHTML += "<li class='aui-list-item' tapmode='item-hov' onclick='addTagToCategories()'><div class='aui-list-item-inner'>Add new category</div></li>";
    //         }
    //     }
    //     dialogBox.close({
    //         dialogName: 'input'
    //     });
    // });
}

// add tag to some categories
function addTagToCategories() {
    var UIMultiSelector = api.require('UIMultiSelector');
    judgeAndInit("category");
    var content = $api.getStorage("category");
    var data = content.data;
    var length = data.length;
    var items = [];
    for (var i = 0; i < length; i++) {
        items.push({
            status: "normal",
            text: data[i].cate_name
        });
    }
    items.push({
        status: "normal",
        text: "custom category"
    });

    UIMultiSelector.open({
        rect: {
            h: 244
        },
        text: {
            title: 'select category',
            leftBtn: 'cancel',
            rightBtn: 'ok',
            selectAll: ''
        },
        max: 10,
        singleSelection: false,
        maskClose: true,
        styles: {
            //mask: 'rgba(100,100,100,0.4)',
            title: {
                bg: '#f5f5f5',
                color: 'rgb(0,0,0)',
                size: 16,
                h: 44
            },
            leftButton: {
                w: 80,
                h: 35,
                marginT: 5,
                marginL: 8,
                color: 'rgb(0,0,0)',
                bg: 'rgb(200,200,200)',
                size: 14,
            },
            rightButton: {
                w: 80,
                h: 35,
                marginT: 5,
                marginR: 8,
                color: 'rgb(0,0,0)',
                bg: '#ffd40d',
                size: 14,
            },
            item: {
                h: 35,
                bg: '#fff',
                bgActive: '#ffd40d',
                bgHighlight: '#ffd40d',
                color: 'rgb(0,0,0)',
                active: 'rgb(255,255,255)',
                highlight: 'rgb(255,255,255)',
                size: 14,
                lineColor: 'rgb(200,200,200)',
                textAlign: 'center',
            }
        },
        animation: true,
        items: items
    }, function(ret, err) {
        if (ret.eventType == 'clickLeft') {
            UIMultiSelector.close();
        }
        if (ret.eventType == 'clickRight') {
            var selectedCategories = ret.items;
            var isCustom = 0;
            var length = selectedCategories.length;
            if (length >= 1) {
                for (var i = 0; i < length; i++) {
                    if (selectedCategories[i].text == "custom category") {
                        isCustom = 1;
                        break;
                    }
                }
                //选择了自定义类别
                if (isCustom == 1) {
                    addCustomCategory();
                } else {
                    $api.byId('categoryname').innerHTML = '';
                    cate_names = [];
                    for (var i = 0; i < length; i++) {
                        var tempHtml = "<li class='aui-list-item'><div class='aui-list-item-inner'>" + selectedCategories[i].text + "</div></li>";
                        cate_names.push(selectedCategories[i].text);
                        $api.byId('categoryname').innerHTML += tempHtml;
                    }
                    $api.byId('categoryname').innerHTML += "<li class='aui-list-item' tapmode='item-hov' onclick='addTagToCategories()'><div class='aui-list-item-inner'>Add new category</div></li>";
                    isUpdated = 1;
                }
            }
            UIMultiSelector.close();
        }
    });
}

// add tag to one room
function addTagToRoom() {
    var UIMultiSelector = api.require('UIMultiSelector');
    judgeAndInit("room");
    var content = $api.getStorage("room");
    var data = content.data;
    var length = data.length;
    var items = [];
    for (var i = 0; i < length; i++) {
        items.push({
            status: "normal",
            text: data[i].room_name
        });
    }
    items.push({
        status: "normal",
        text: ""
    });

    UIMultiSelector.open({
        rect: {
            h: 244
        },
        text: {
            title: 'select room',
            leftBtn: 'cancel',
            rightBtn: 'ok'
        },
        max: 1,
        singleSelection: true,
        maskClose: true,
        styles: {
            //mask: 'rgba(100,100,100,0.4)',
            title: {
                bg: '#f5f5f5',
                color: 'rgb(0,0,0)',
                size: 16,
                h: 44
            },
            leftButton: {
                w: 80,
                h: 35,
                marginT: 5,
                marginL: 8,
                color: 'rgb(0,0,0)',
                bg: 'rgb(200,200,200)',
                size: 14,
            },
            rightButton: {
                w: 80,
                h: 35,
                marginT: 5,
                marginR: 8,
                color: 'rgb(0,0,0)',
                bg: '#ffd40d',
                size: 14,
            },
            item: {
                h: 35,
                bg: '#fff',
                bgActive: '#ffd40d',
                bgHighlight: '#ffd40d',
                color: 'rgb(0,0,0)',
                active: 'rgb(255,255,255)',
                highlight: 'rgb(255,255,255)',
                size: 14,
                lineColor: 'rgb(200,200,200)',
                textAlign: 'center',
            }
        },
        animation: true,
        items: items
    }, function(ret, err) {
        if (ret.eventType == "clickLeft") {
            UIMultiSelector.close();
        }
        if (ret.eventType == "clickRight") {
            if (ret.items.length == 0) {
                UIMultiSelector.close();
            } else {
                var selectedRoom_name = ret.items[0].text;
                if (selectedRoom_name == undefined) {
                    UIMultiSelector.close();
                }
                if (selectedRoom_name != "") {
                    room_name = selectedRoom_name;
                    $api.byId("roomname").innerHTML = room_name;
                    isUpdated = 1;
                }
                UIMultiSelector.close();
            }

        }
    });
}

function changeAvatar() {
    api.getPicture({
        sourceType: 'camera',
        encodingType: 'png',
        mediaValue: 'pic',
        allowEdit: true,
        quality: 60,
        saveToPhotoAlbum: true
    }, function(ret, err) {
        // 获取拍照数据并处理
        if (ret) {
            tag_pic = ret.data;
            if (tag_pic != "") {
                var ele = $api.dom('.qwe');
                $api.css(ele, "background-image: url(" + tag_pic + ")");
                isUpdated = 1;
                var cache = $api.getStorage("cache");
                if (cache == undefined) {
                    $api.setStorage("cache", 1);
                } else {
                    cache++;
                    $api.setStorage("cache", cache);
                }
            }
        }
    });
}

function addTagname() {

    dialog.prompt({
        title: "item name",
        text: "please input item name",
        buttons: ["cancel", "ok"]
    }, function(ret) {
        if (ret.buttonIndex == 2) {
            if (ret.text == "") {
                dialog.alert({
                    title: "warning",
                    msg: "Item name cannot be empty",
                    buttons:['ok']
                },function(ret){

                });
            }
            else {
                var res = isTagnameDuplicateWithOthername(ret.text);
                if (res == 1) {
                    dialog.alert({
                        title: "error",
                        msg: 'Duplicate item name.',
                        buttons: ["ok"]
                    },function(ret){
                    });
                }
                else {
                    $api.byId("tagname").innerHTML = ret.text;
                    isUpdated = 1;
                    tag_name = ret.text;
                }
            }
        }
    });
}

function getTag_codeAndRssi(value) {
    var x = value.substr(0, value.length-2);
    var y = value.substr(value.length-2, 2);
    y = strHexToInt(y);
    return [x, y];
}
