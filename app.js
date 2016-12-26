import express from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from'cookie-parser';
import bodyParser from 'body-parser';
import React    from 'react';
import ReactDom from 'react-dom/server';
import { Provider } from 'react-redux';
import configureStore from './resources/redux/store.prod';
import { match, RouterContext } from 'react-router';
import routes from './routes/web';
import { loadENV, renderHTML } from './app/helpers';
import api from './routes/api';

//Загружаем .env файл в качестве настроек
loadENV();

let app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Server side rendering React
app.use((req, res) => {
    const store = configureStore();

    match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {

        // Если необходимо сделать redirect
        if (redirectLocation) {
            return res.redirect(301, redirectLocation.pathname + redirectLocation.search);
        }

        // Произошла ошибка любого рода
        if (error) {
            return res.status(500).send(error.message);
        }

        // Мы не определили путь, который бы подошел для URL
        if (!renderProps) {
            return res.status(404).send('Not found');
        }

        const componentHTML = ReactDom.renderToString(
            <Provider store={store}>
                <RouterContext {...renderProps} />
            </Provider>
        );

        return res.end(renderHTML(componentHTML));
    });
});

app.use('/api/', api);

module.exports = app;

