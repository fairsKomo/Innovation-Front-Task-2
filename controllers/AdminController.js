const Student = require("../models/model");
const adminMiddleware = require('../Middlewares/adminMiddleware');

const getAll = async (req, res) => {
    try{
        const students = await Student.find();
        res.status(200).json({students})
    } catch(e){
        res.status(500).json({error: e.message});
    }
};

const getbyID = async (req, res) => {
    try{
        const id = req.params.id;
        const student = await Student.findById(id);
        if(!student) return res.status(404).json({message : `No Uni with the ID: ${id}`});
        res.status(200).json({student})
    } catch(e){
        res.status(500).json({error: e.message});
    }
};

const createNew = async (req, res) => {
    try{
        const data = req.body;
        const student = new Student(data);
        await Student.create(student);
        res.status(201).json({student});
    } catch(e){
        res.status(500).json({error: e.message});
    }
};

const updateOne = async (req, res) => {
    try{
        const id = req.params.id;
        const data = req.body;
        const student = await Student.findByIdAndUpdate(id, data, {new: true});
        if(!student) return res.status(404).json({messgae: "Student Not Found"});
        res.status(200).json({student});
    } catch(e){
        res.status(500).json({error: e.message});
    }
};

const deleteOne = async (req, res) => {
    try{
        const id = req.params.id;
        const student = await Student.findByIdAndDelete(id);
        if(!student) return res.status(404).json({messgae: "Student Not Found"});
        res.status(204).json({student});
    } catch(e){
        res.status(500).json({error: e.message});
    }
};

module.exports = {
    getAll,
    getbyID,
    createNew,
    updateOne,
    deleteOne
};