import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from'cookie-parser';
import bodyParser from 'body-parser';
import models from './app/models/';
import React    from 'react';
import ReactDom from 'react-dom/server';
import App      from './resources/components/App/App';

import api from './routes/api';
const assetUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:8050' : '/';

let app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Server side rendering React
app.use((req, res) => {
    const componentHTML = ReactDom.renderToString(<App />);

    return res.end(renderHTML(componentHTML));
});

app.use('/api/', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.end(err.status + ' error \n' + err.toString());
});


function renderHTML(componentHTML) {
    return `
    <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Hello React</title>
          <link rel="stylesheet" href="${assetUrl}/public/assets/styles.css">
      </head>
      <body>
        <div id="react-view">${componentHTML}</div>
        <script type="application/javascript" src="${assetUrl}/public/assets/bundle.js"></script>
      </body>
    </html>
  `;
}


models.sequelize
    .authenticate()
    .then(function () {
        console.log('Connection successful');
    })
    .catch(function(error) {
        console.log("Error creating connection:", error);
    });


module.exports = app;

