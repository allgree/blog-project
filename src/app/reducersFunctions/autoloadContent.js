export function autoloadContent(items, empty, payload) {
    let offset = +payload.config.url.split('=').pop();
    if (payload.data.length === 0 && offset === 0) {
        items = [];
        empty = true;
    } else if (payload.data.length === 0) {
        empty = true;
    } else if(offset === 0) {
        items = payload.data;
        empty = false;
    } else {
        items = items.concat(payload.data);
        empty = false;
    }
    return [items, empty];
}

