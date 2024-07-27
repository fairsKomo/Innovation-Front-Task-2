const express = require('express');
const op = require('../controllers/AdminController');
const adminMiddleware = require('../Middlewares/adminMiddleware');


const router = express.Router();

router.get('/student', adminMiddleware, op.getAll);
router.get('/student/:id', adminMiddleware, op.getbyID);
router.post('/student', adminMiddleware, op.createNew);
router.put('/student', adminMiddleware, op.updateOne);
router.delete('/student', adminMiddleware, op.deleteOne);

module.exports = router;