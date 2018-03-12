let express = require('express');
let bodyParser = require('body-parser');

const PORT = 8090;

//Модели


//Подключение маршрутов


let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.use(express.static(__dirname + '/public'));

//Маршруты



app.use((req, res) => {
    return res.sendFile('/public/index.html', {root: __dirname})
});

app.use(function (req, res, next) {
    let err = new Error('Page Not Found!');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
});

app.listen(PORT, function () {
    console.log(`Сервер успешно запущен на порту ${PORT}!`);
});