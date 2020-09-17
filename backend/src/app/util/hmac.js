import crypto from 'crypto';

// function hmac(texto) {
//     return crypto.createHmac('sha256', process.env.CHAVE).update(texto).digest('hex');
// }

function hmac(texto) {
    const hmac = crypto.createHmac('sha256', process.env.CHAVE);
    const signed = hmac.update(Buffer.from(texto, 'utf-8')).digest('hex');
    return signed;
}

module.exports = { hmac };
