var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');

var messages = [];

app.use(express.static("."));
app.get("/", function (req, res) {
    res.redirect('index.html');
});

server.listen(3000);

var obj = {
   "messages":[]
   };

var JSO;


io.on('connection', function (socket) {
    var x = socket.id;

    for(var i in messages) {
        io.sockets.emit("display message", messages[i]);
    }

    socket.on("send message", function (data) {
        messages.push(data);
        //obj.messages.push(data);
        var t_o = {};
        t_o[x] = data;
        obj.messages.push(t_o);
        JSO = JSON.stringify(obj);
        fs.writeFileSync("obj.json", JSO);
        io.sockets.emit("display message", data);
    })
 });