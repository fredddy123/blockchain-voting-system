const Peer = require('../Peer.js');

async function main() {
    const myPeer = new Peer();

    console.log('Connecting to peers...');
    await myPeer.initConnection();
    console.log('Connection to peers succed');

    myPeer.getPeers();
}

main().then(() => console.log('Client initialized')).catch(console.error);
