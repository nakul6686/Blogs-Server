const mongoose = require('mongoose');


const CommentsSchema = new mongoose.Schema({
    text:{
        type: String,
        required: true,

    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true

    },
    blog:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Blog"
    }
}, {timestamps: true});

const Comments =  mongoose.model('Comments', CommentsSchema);

module.exports = Comments;
