const net = require('net');

const client = new net.Socket();
client.connect(1111, '127.0.0.1', () => {
	console.log('Connected');
	client.write('Hello, server! Love, Client.');
});

client.on('data', (data) => {
	console.log('Received: ' + data);
	client.destroy(); // kill client after server's response
});

client.on('close', () => {
	console.log('Connection closed');
});
