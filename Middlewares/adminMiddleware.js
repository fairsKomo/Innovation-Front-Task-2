const jwt = require('jsonwebtoken');
const Student = require('../models/model');

const adminMiddleware = async (req, res, next) => {
    const authHeader = req.header('Authorization');
    if(!authHeader) return res.status(404).json({message: 'No token provided!'});

    const token = authHeader.split(' ')[1];
    if(!token) return res.status(404).json({message: 'No token provided!'});

    try{
        const decoded = jwt.verify(token, 'secret');

        const student = await Student.findById(decoded.id);
        
        if(!student) return res.status(404).json({message: 'No token provided!'});
        if(student.role !== 'admin') return res.status(403).json({message: 'Access denied!'});
        req.user = decoded;
        next();
    } catch(e){
        return res.status(400).json({message: 'Token invalid!'});
    }

}

module.exports = adminMiddleware;