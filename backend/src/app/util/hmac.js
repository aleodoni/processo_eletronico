import crypto from 'crypto';

function hmac(texto) {
    return crypto.createHmac('sha256', process.env.CHAVE).update(texto).digest('hex');
}

module.exports = { hmac };
