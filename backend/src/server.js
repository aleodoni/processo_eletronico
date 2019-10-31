import app from './app';
require('dotenv/config');
app.listen(process.env.APP_PORT);
console.log("* Backend SPA2 na porta: "+process.env.APP_PORT);
