function openApp() {
    var url = "https://wsz.ibilidi.cn/ble";
    $api.get(url, function(ret) {
        console.log(ret);
    }, 'json');
}

function connectTag() {
    var url = "https://wsz.ibilidi.cn/tag";
    $api.get(url, function(ret) {
        console.log(ret);
    }, 'json');
}
