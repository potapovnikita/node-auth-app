import express from 'express';
import bodyParser from'body-parser';
import logger from 'morgan';
import cors from 'cors';
import { routes } from './app/routes';

const app = express();

const port = process.env.PORT || 8000;

app.use(cors({
    allowedHeaders: ['authorization', 'Content-Type'],
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
}));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

app.listen(port, (err: any) => {
    if (err) return console.log(err);
    return console.log(`Server listening ${port}`);
});
