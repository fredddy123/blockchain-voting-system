const fs = require('fs');
const crypto = require("crypto");
const eccrypto = require("eccrypto");

const privateKey = crypto.randomBytes(32);
const publicKey = eccrypto.getPublic(privateKey);

fs.writeFileSync('./creds.json', JSON.stringify({
    privateKey: privateKey.toString('hex'),
    publicKey: publicKey.toString('hex')
}, 0, 4));
