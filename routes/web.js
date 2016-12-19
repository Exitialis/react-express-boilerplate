let express = require('express');
let router = express.Router();
import React    from 'react';
import ReactDom from 'react-dom/server';
import App      from '../resources/views/components/App';


router.get(function(req, res, next) {
    const componentHTML = ReactDom.renderToString(<App />);

    return res.end(renderHTML(componentHTML));
});

module.exports = router;