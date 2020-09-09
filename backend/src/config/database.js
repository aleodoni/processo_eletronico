require('dotenv/config');

module.exports = {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    define: {
        timestamps: false,
        underscored: true,
        underscoredAll: true
    },
    pool: {
        max: 7,
        min: 0,
        acquire: 90000,
        idle: 1000
    },
    dialectOptions: {
        useUTC: false // for reading from database
    },
    timezone: '-03:00'
};
