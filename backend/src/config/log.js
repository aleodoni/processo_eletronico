const winston = require('winston');
require('winston-daily-rotate-file');
require('dotenv/config');
const moment = require('moment');

const timestamp = () => moment().format('DD/MM/YYYY HH:mm:ss');

const arquivo = new winston.transports.DailyRotateFile({
  filename: '%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '5m',
  maxFiles: '730d',//dois anos
  dirname: process.env.LOG_PATH,
  prepend: true,
  localTime: true,
});

// eslint-disable-next-line new-cap
const logger = new winston.createLogger({
  format: winston.format.combine(
    winston.format.simple(),
    winston.format.printf(i => `${i.level} | ${timestamp()} | ${i.message}`)
  ),
  transports: [
    arquivo,
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(i => `${i.level} | ${timestamp()} | ${i.message}`)
      ),
    }),
  ],
  exitOnError: false,
});

logger.stream = {
  write: mensagem => {
    logger.info(mensagem);
  },
};

module.exports = logger;
