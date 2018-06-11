const net = require('net');

const PORT = 1111;

function main() {
    const sockets = [];

    const server = net.createServer(socket => {
        console.log('Socket connected', `${socket.remoteAddress.replace(/::ffff:/, '')}:${socket.remotePort}`);
        sockets.push(socket);
        socket.on('data', dataBuf => {
            sockets
                .filter(sock => sock !== socket)
                .forEach(sock => sock.write(dataBuf));
        });
    });

    server.listen(PORT, () => console.log(`Server listening on ${PORT}`));
}

main();
