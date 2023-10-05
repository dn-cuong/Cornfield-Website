const { Ed25519KeyIdentity } = require('@dfinity/identity');
const pemfile = require('pem-file');
const fs = require('fs');
const path = require('path');

function decode(rawKey) {
    let buf = pemfile.decode(rawKey);
    if (buf.length !== 85) {
        throw 'expecting byte length 85 but got ' + buf.length;
    }
    let secretKey = Buffer.concat([buf.subarray(16, 48), buf.subarray(53, 85)]);
    return Ed25519KeyIdentity.fromSecretKey(secretKey);
}

function decodefile (file) {
    const rawKey = fs.readFileSync(file).toString();
    return decode(rawKey);
}

function initIdentity() {
    return decodefile(path.join(__dirname, 'PandaKewt.pem'))
}
module.exports = initIdentity;
