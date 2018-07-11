export function autoloadContent(items, empty, payload) {
    let url_arr = payload.config.url.split('=');
    let offset = +url_arr[url_arr.length - 1];
    if (payload.data.length === 0 && offset === 0) {
        items = [];
        empty = true;
    } else if (payload.data.length === 0) {
        empty = true;
    } else if(offset === 0) {         //
        items = payload.data;  //
        empty = false;                //
    } else {
        items = items.concat(payload.data);
        empty = false;
    }
    return [items, empty];
}



//export function autoloadContent(items, empty, payload) {
//    let url_arr = payload.config.url.split('=');
//    let offset = +url_arr[1];
//    if (payload.data.length === 0) {
//        empty = true;
//    } else if (offset === 0){
//        items = payload.data;
//    } else {
//        items = items.concat(payload.data);
//    }
//    return [items, empty];
//}