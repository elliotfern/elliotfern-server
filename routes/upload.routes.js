const router = require("express").Router();
const Book = require("../models/Book.model")
const User = require("../models/User.model")

const uploader = require("../middlewares/cloudinary.config.js");

// PATCH "/api/:idBook/upload" => esta ruta sirve para subir a cloudinary una imagen y guardar la URL en la base de datos
router.patch("/:idBook/upload", uploader.single("image"), async (req, res, next) => {

    const { idBook } = req.params;

    // console.log("file is: ", req.file);

    if (!req.file) {
        next("No file uploaded!");
        return;
    }

    // get the URL of the uploaded file and send it as a response.
    // 'imageUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend

    try {
        // actualizar el campo profileImage
        await Book.findByIdAndUpdate(idBook, { imageBook: req.file.path })
        res.json("User image profile updated")

    } catch (error) {
        next(error)
    }

    res.json({ imageUrl: req.file.path });
});

module.exports = router;