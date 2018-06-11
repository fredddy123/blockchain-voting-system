const net = require('net');

const SERVER_HOST = '127.0.0.1';
const SERVER_PORT = 1111;

class Peer {
    constructor() {
        this.socket = null;
    }

    initConnection() {
        return new Promise((resolve, reject) => {
            const socket = net.connect(SERVER_PORT, SERVER_HOST, resolve);

            socket.on('data', data => this.onMessage(data.toString()));

            this.socket = socket;
        });
    }

    onMessage(msg) {
        console.log('msg', msg);
    }

    getPeers() {
        this.socket.send()
    }
}

module.exports = Peer;
