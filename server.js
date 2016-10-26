"use strict";

var express = require('express');
var app = express();
var PORT = 3000;

var middleware = {
    requireAuthentication: function (req, res, next) {
        console.log('private route hit!!!');
        next();
    },
    logger: function (req, res, next) {
        console.log('[',new Date().toString(),']',' Request:',req.method, req.originalUrl);
        next();
    }
}

// Middleware aplicable a cualquier ruta
// app.use(middleware.requireAuthentication);

// app.get('/', function (req, res) {
//     res.send('Hello Express!');
// });

app.use(middleware.logger);

app.get('/about', middleware.requireAuthentication, function (req, res) {
    res.send('About us');
});

app.use(express.static(__dirname + '/public'));

app.listen(PORT, function () {
    console.log('Express server started on port ' + PORT);
});

