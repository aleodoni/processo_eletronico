import app from './app';

require('dotenv/config');

app.listen(process.env.APP_PORT);
// eslint-disable-next-line no-console
console.log(
    `* Backend do processo eletrônico em: ${process.env.APP_URL}${process.env.API_URL}`
);
