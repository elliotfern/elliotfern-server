const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
    userCreatorId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },

    articleId: {
        type: String,
        required: true
    },

    comment: {
        type: String,
        required: true
    },

},

    {
        timestamps: true
    },
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;