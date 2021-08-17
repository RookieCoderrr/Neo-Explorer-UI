 var WebSocket = require('ws')

const ws = new WebSocket('ws://192.168.1.46:2026/home');

ws.on('open', function open() {
    ws.send('something');
});

ws.on('message', function incoming(message) {
    console.log('received: %s', message);
});
