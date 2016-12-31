import users from '../app/controllers/api/users';

import express from 'express';
const router = express.Router();

/* GET home page. */
router.use('/users', users);

module.exports = router;
