const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    grade: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    date: {
      type: Date,
      required: true,  
    },
    classid: {
        type:String,
        required: true,
        unique:true,
    },
    description: {
        type: String,
        required: true,
    },
    privacy: {
        type: String,
        enum: ['Public', 'Private'],
        required: true,
    },
    teacher: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'User',
        type :String,
        required:true,
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    }]
},{
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Class', classSchema);