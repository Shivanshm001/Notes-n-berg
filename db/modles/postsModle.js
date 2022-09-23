const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title cannot be blank"]
    },
    des: {
        type: String,
        default: ""
    },
    content: {
        rand_name_key: {
            type: String
        },
        filetype: {
            type: String
        },
        url: {
            type: String
        }
    },
    tags: {
        sem: {
            type: String
        },
        type: {
            type: String
        }
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});
module.exports = mongoose.model("POSTS", postSchema);