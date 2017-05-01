var express = require('express');
var app     = express();
var path = require("path");
var queires=require('./mysqlqueries.js');
queires(app)

app.use(express.static(path.join(__dirname, 'public')));

var port = process.env.PORT || 8000;
app.listen(port);
console.log('Listening on port ',  port);
