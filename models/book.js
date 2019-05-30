const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const BookSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    authorId:{
        type: Schema.Types.ObjectId,
        ref:'Author'
    }
}, {timestamps:true})

module.exports = mongoose.model('Book', BookSchema);