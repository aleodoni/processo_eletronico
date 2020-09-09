const crypto = require('crypto');
const fs = require('fs');

function hash(caminhoArquivo) {
    const file_buffer = fs.readFileSync(caminhoArquivo);
    const sum = crypto.createHash('sha256');
    sum.update(file_buffer);
    const hex = sum.digest('hex');
    return hex;
}

module.exports = { hash };
