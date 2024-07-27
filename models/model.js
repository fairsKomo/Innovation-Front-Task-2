const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const studentSchema = new mongoose.Schema({
    
    // Only english letters
    firstName: {
        type: String,
        required: true,
    },

    // Only english letters
    lastName: {
        type: String,
        required: true,
    },
    
    // unique and valid
    email: {
        type: String,
        required: true,
        unique: true
    },

    // unique, english Letters, Numbers
    username: {
        type: String,
        required: true,
        unique: true
    },

    // 8 Chars minimum, uppercase & lowercase & nums & specialchars
    password: {
        type: String,
        required: true,
    },

    // enum[Student, admin] default student
    role: {
        type: String,
        required: true,
        enum: ['student', 'admin'],
        default: 'student'
    },

    // 0-100
    grade: {
        type: Number,
        required: true,
    },

    courses: {
        type: [String],
        required: true,
    },

    resetPasswordToken: String,
    resetPasswordExpires: Date
});

studentSchema.pre('save', async function(next) {
    if(this.isModified('password') || this.isNew){
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
})

module.exports = mongoose.model('Student', studentSchema);