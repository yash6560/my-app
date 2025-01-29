const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true,
    },
    desc:{
        type:String,
        required: true,
    },
    userId : {
        type: mongoose.Schema.Types.ObjectId, ref:'User', 
        required: true, 
    }
},
{
    timestamps:true,
})

const Notes = mongoose.model('Notes',NoteSchema);

module.exports = Notes;