const { Schema, model } = require("mongoose");

const bookSchema = new Schema({
    bookTitle: {
        type: String,
        required: true,
    },

    bookAuthor: {
        type: String,
        required: true,
    },

    topic: {
        type: String,
        enum: ["history", "geography", "biography", "fiction"],
        default: "history",
        required: true,
    },

    userCreatorId: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],

    imageBook: {
        type: String,
        default: "https://media.elliotfern.com/img/book_default.png"
    },

},

    {
        timestamps: true
    },
);

const Book = model("Book", bookSchema);

module.exports = Book;
