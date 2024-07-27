const express = require("express");
const authRouter = require('./routes/auth');
const adminRouter = require('./routes/admin');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

mongoose.connect("mongodb://localhost:27017/studentDB")
.then(() => console.log("MongoDB connected succefully :)"))
.catch(er => console.error("Connection Error", er));

app.use(express.json());
app.use('/auth', authRouter);
app.use('/auth', adminRouter);

app.listen(PORT, console.log(`App is listening to port: ${PORT}`));