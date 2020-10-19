const crypto = require('crypto');
const fs = require('fs');

function hash(caminhoArquivo) {
    const file_buffer = fs.readFileSync(caminhoArquivo);
    const sum = crypto.createHash('sha256');
    sum.update(file_buffer);
    const hex = sum.digest('hex');
    return hex;
}

async function fileHash(filename, algorithm = 'sha256') {
    return new Promise((resolve, reject) => {
        // Algorithm depends on availability of OpenSSL on platform
        // Another algorithms: 'sha1', 'md5', 'sha256', 'sha512' ...
        const shasum = crypto.createHash(algorithm);
        try {
            const s = fs.ReadStream(filename);
            s.on('data', function(data) {
                shasum.update(data);
            });
            // making digest
            s.on('end', function() {
                const hash = shasum.digest('hex');
                return resolve(hash);
            });
        } catch (error) {
            return error;
        }
    });
}

module.exports = { hash, fileHash };
