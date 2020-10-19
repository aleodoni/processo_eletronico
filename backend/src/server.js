import app from './app';

const https = require('https');
const fs = require('fs');
const chavePrivada = fs.readFileSync(process.env.CHAVE_PRIVADA, 'utf8');
const certificado = fs.readFileSync(process.env.CERTIFICADO_PRIVADO, 'utf8');
const credenciais = { key: chavePrivada, cert: certificado };

app.listen(process.env.APP_PORT);
const httpsServer = https.createServer(credenciais, app);
httpsServer.listen(process.env.APP_HTTPS_PORT);
// eslint-disable-next-line no-console
console.log(
    `\n* Backend HTTP do processo eletrônico em: http://${process.env.APP_URL}:${process.env.APP_PORT}${process.env.API_URL}`
);

console.log(
    `* Backend HTTPS do processo eletrônico em: https://${process.env.APP_URL}:${process.env.APP_HTTPS_PORT}${process.env.API_URL}\n`
);
