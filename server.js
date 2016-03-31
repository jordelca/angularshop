var express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    path = require('path');


server.listen(process.env.PORT || 8889);

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/index.html');
});

app.use(express.static(path.join(__dirname, '/')));
