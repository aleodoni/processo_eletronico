import express from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import bodyParser from 'body-parser';
import winston from './config/log';
import routes from './routes';
import './database';
import AppError from './app/error/AppError';
import rateLimiter from './app/middlewares/rateLimiter';

class App {
    constructor() {
    // carrega o express
        this.server = express();
        // carrega os middlewares
        this.middlewares();
        // carrega as rotas
        this.routes();
        // carrega o handler de exception
        this.exceptionHandler();
    }

    middlewares() {
        if (process.env.NODE_ENV !== 'development') {
            this.server.use(rateLimiter);
        }
        // configura o express
        this.server.use(express.json());
        // formata o JSON retornado
        this.server.set('json spaces', 4);
        // configura o log da aplicação
        if (process.env.NODE_ENV !== 'test') {
            this.server.use(morgan(':method | :url | :status | :response-time ms', { stream: winston.stream }));
        }
        // configura o helmet
        this.server.use(helmet());
        // configura o CORS
        this.server.use(cors());
        // configura a compressão nas requisições
        this.server.use(compression());
        // configura o parser do JSON
        this.server.use(
            bodyParser.urlencoded({
                extended: true
            })
        );
        this.server.use(bodyParser.json());
        this.server.use(express.static('public'));
    }

    routes() {
        this.server.use(routes);
    }

    exceptionHandler() {
        this.server.use(async(err, req, res, next) => {
            if (process.env.NODE_ENV === 'development') {
                if (err instanceof AppError) {
                    return res.status(err.statusCode).json({
                        status: 'error',
                        message: err.message
                    });
                }
            }

            if (err instanceof AppError) {
                return res.status(err.statusCode).json({
                    status: 'error',
                    message: err.message
                });
            }
            return res.status(500).json({ error: 'Erro interno no servidor.' });
        });
    }
}
export default new App().server;
