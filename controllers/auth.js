const Student = require('../models/model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validation = require('../utils/validation');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: 'farisbusiness5@gmail.com',
        pass: 'dwjd tdhy eomh btra'
    }
});

const register = async (req, res) => {
    try{

        const {error, value} = validation.validateReg(req.body);

        if(error) return res.status(400).json({error: error.details[0].message});

        const student = new Student(value);
        await student.save();
        res.status(200).json({student});

    } catch(err){
        res.status(500).json({error: err.message});
    }
};


const login = async (req, res) => {
    try{
        const {username, password} = req.body;
        const student = await Student.findOne({username});
        
        if(!student) return res.status(400).json({message : 'Invalid Username or Password'});

        const isMatch = await bcrypt.compare(password, student.password);

        if(!isMatch) return res.status(400).json({message : 'Invalid Usernamre or Password'});

        const token = jwt.sign({id: student._id}, 'secret', {expiresIn: '1h'});
        res.status(200).json({token});
    } catch (err) {
        res.status(500).json({error: err.message})
    }
};

const forgetPassword = async (req, res) => {
    try{
        const {email} = req.body;
        const student = await Student.findOne({email});
        if(!student) return res.status(404).json({message : 'No One with This E-mail'});

        const resetToken = crypto.randomBytes(32).toString('hex');
        student.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        student.resetPasswordExpires = Date.now() + 360000;
        await student.save();

        const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

        const mailOptions = {
            to: student.email,
            from: 'farisbusiness5@gmail.com', // Use a professional email address
            subject: 'Password Reset Request',
            text: `Hello ${student.firstName},
        
        You are receiving this email because we received a request to reset the password for your account. To reset your password, please click the following link:
        
        ${resetUrl}
        
        If you did not request a password reset, please disregard this email. No changes will be made to your account.
        
        Best regards,
        Your Company Name`
        };

        transporter.sendMail(mailOptions, (error) => {
            if(error) return res.status(500).json({error});

            return res.status(200).json({message: 'Email Sent'});
        })

    } catch(err){
        res.status(500).json({error: err.message})
    }
};

const resetPassword = async (req, res) => {
    try {
        const { resetToken } = req.params;
        const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

        const student = await Student.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() }
        });
        console.log(student);

        if (!student) {
            return res.status(400).json({ message: "Token is invalid or it has expired" });
        }

        // Hash the new password
        student.password = req.body.password;
        student.resetPasswordExpires = undefined;
        student.resetPasswordToken = undefined;

        await student.save();

        res.status(200).json({ message: "Your password has been reset successfully :)" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    register,
    login,
    forgetPassword,
    resetPassword
}