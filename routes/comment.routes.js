const router = require("express").Router();
const bcrypt = require("bcryptjs")
const Comment = require("../models/Comment.model")

const jwt = require("jsonwebtoken")
const isAuthenticated = require("../middlewares/isAuthenticated")

// GET "/api/comment/:articleId" => envia todos los comentarios de un articulo determinado
router.get("/:articleId", async (req, res, next) => {
    const { articleId } = req.params;

    try {
        const response = await Comment.find({ articleId: articleId })
        res.json(response)
    } catch (error) {
        next(error)
    }
})

// POST "/api/comment/:articleId" => envia el formulario de creación de un comentario a la base de datos
router.post("/:articleId", async (req, res, next) => {
    const { comment } = req.body;
    const { articleId } = req.params;

    // Dividir la cadena para obtener el token (como se hizo en el ejemplo anterior)
    const tokenString = req.headers.authorization
    const tokenArray = tokenString.split(' ');
    const token = tokenArray[1];

    // Decodificar el token
    const decodedToken = jwt.decode(token);
    const userCreatorId = decodedToken._id

    try {
        const response = await Comment.create({ comment, articleId, userCreatorId })
        res.json(response)
    } catch (error) {
        next(error)
    }
})

// PUT "/api/comment/:commentId" => edita un comentario en concreto por su ID
router.put("/:commentId", async (req, res, next) => {
    const { comment } = req.body;
    const { commentId } = req.params;

    try {
        const response = await Comment.findByIdAndUpdate(commentId, { comment })
        res.json(response)
    } catch (error) {
        next(error)
    }
})

// DELETE "/api/comment/:commentId" => borra un comentario en concreto por su ID
router.delete("/:commentId", async (req, res, next) => {
    const { commentId } = req.params;

    try {
        const response = await Comment.findByIdAndDelete(commentId)
        res.json(response)
    } catch (error) {
        next(error)
    }
})

module.exports = router;