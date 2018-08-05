// форматирование даты добавления контента
export function formatTimestamp(created) {
    let timestamp = Date.parse(created);
    let date = new Date();
    date.setTime(timestamp);
    let day = ('0' + date.getDate()).slice(-2);
    let month = ('0' + (date.getMonth() + 1)).slice(-2);
    return {
        created_date: `${day}.${month}.${date.getFullYear()}`,
        created_time: `${date.getHours()}:${date.getMinutes()}`
    }
}