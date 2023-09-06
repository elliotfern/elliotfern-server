const router = require("express").Router();
const bcrypt = require("bcryptjs")
const Book = require("../models/Book.model")
const User = require("../models/User.model")

const jwt = require("jsonwebtoken")
//const isAuthenticated = require("../middlewares/isAuthenticated")

// GET "/api/book/" => envia todos los libros de la bd
router.get("/", async (req, res, next) => {

    try {
        const response = await Book.find()
            .populate("userCreatorId")
        console.log(response)
        res.json(response)
    } catch (error) {
        next(error)
    }
})

/*bookTitle
bookAuthor
topic
userCreatorId */

// POST "/api/book/" => envia el formulario de creación de un libro a la base de datos
router.post("/", async (req, res, next) => {
    const { bookTitle, bookAuthor, topic } = req.body;

    // Dividir la cadena para obtener el token (como se hizo en el ejemplo anterior)
    const tokenString = req.headers.authorization
    const tokenArray = tokenString.split(' ');
    const token = tokenArray[1];

    // Decodificar el token
    const decodedToken = jwt.decode(token);
    const userCreatorId = decodedToken._id

    try {
        const response = await Book.create({ bookTitle, bookAuthor, topic, userCreatorId })
        res.json(response)
    } catch (error) {
        next(error)
    }
})

// GET "/api/book/:idBook" => renderiza los detalles de un libro
router.get("/:idBook", async (req, res, next) => {
    const { idBook } = req.params;
    try {
        const response = await Book.findById(idBook)
            .populate({ path: 'userCreatorId', select: 'fullName' })
        res.json(response)
    } catch (error) {
        next(error)
    }
})


// PUT "/api/book/:idBook" => edita un libro en concreto por su ID
router.put("/:idBook", async (req, res, next) => {
    const { bookTitle, bookAuthor, topic } = req.body;
    const { idBook } = req.params;

    try {
        const response = await Book.findByIdAndUpdate(idBook, { bookTitle, bookAuthor, topic })
        res.json(response)
    } catch (error) {
        next(error)
    }
})

// DELETE "/api/:idBook" => borra un libro en concreto por su ID
router.delete("/:idBook", async (req, res, next) => {
    const { idBook } = req.params;

    try {
        const response = await Book.findByIdAndDelete(idBook)
        res.json(response)
    } catch (error) {
        next(error)
    }
})

module.exports = router;