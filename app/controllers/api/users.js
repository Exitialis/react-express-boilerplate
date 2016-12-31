import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.json({user: 'Exitialis'});
});

router.post('/', (req, res) => {
   res.json(req.body);
});

export default router;