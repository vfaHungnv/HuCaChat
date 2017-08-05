var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// Add middleware to handle post request for express
app.use('/static', express.static('static'));

// Serve index.html for path '/', this is home path
app.get('/', (req, res) => {
	res.sendFile('index.html', { root: __dirname });
});

var trackingState = {}

server.listen(8088, function(){
    console.log('Dang lang nghe tren post 8088');
    io.on('connection', function(socket){
        console.log('Co nguoi ket noi');
        
        socket.on('langnghe', function(data){
            console.log(data);
            socket.emit('data', data);
        })

        socket.on("location", function(data){
	        trackingState = Object.assign(trackingState, { 
    	        [ data[0] ] : { lat: Number(data[1]), lng: Number(data[2])}
            });
            io.sockets.emit('locationUpdated', trackingState);
        })
    })
});