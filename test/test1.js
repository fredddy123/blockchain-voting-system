const net = require('net');

const PORT = 1111;
const GET_PEERS_REQUEST = 'GET_PEERS';

function main() {
    const peers = [];

    const server = net.createServer(socket => {
        console.log('Socket connected', socket.remoteAddress.replace(/::ffff:/, '') + ":" + socket.remotePort);
        peers.push(socket);

        socket.on('data', data => {
            console.log('data', data);
            console.log('data.toString()', data.toString());
        });
    });

    server.listen(PORT, () => console.log(`Server listening on ${PORT}`));
}

main();
