const router = require("express").Router();
const bcrypt = require("bcryptjs")
const User = require("../models/User.model")

const jwt = require("jsonwebtoken")
const isAuthenticated = require("../middlewares/isAuthenticated")
const uploader = require("../middlewares/cloudinary.config.js");

// GET "/api/profile" => esta ruta sirve para consultar en la BD toda la informacion de un usuario registrado
router.get("/", async (req, res, next) => {
    // Primero es obtener el id del usuario registrado a través del payload
    console.log(req.headers.authorization)

    const tokenString = req.headers.authorization

    // Dividir la cadena para obtener el token (como se hizo en el ejemplo anterior)
    const tokenArray = tokenString.split(' ');
    const token = tokenArray[1];

    // Decodificar el token
    const decodedToken = jwt.decode(token);
    console.log('ID de usuario:', decodedToken._id);
    console.log('Correo electrónico:', decodedToken.email);

    const userId = decodedToken._id

    try {
        const response = await User.findById(userId).
            select({ username: 1, fullName: 1, email: 1, imageProfile: 1, lang: 1, savedCourses: 1, savedLessons: 1, role: 1 })

        res.json(response)
    } catch (error) {
        next(error)
    }

})

// PUT "/api/profile" => esta ruta sirve para actualizar datos del modelo User en la base de datos
router.put("/", async (req, res, next) => {
    console.log(req.body)
    const { fullName, lang } = req.body;
    const tokenString = req.headers.authorization

    // Dividir la cadena para obtener el token (como se hizo en el ejemplo anterior)
    const tokenArray = tokenString.split(' ');
    const token = tokenArray[1];

    // Decodificar el token
    const decodedToken = jwt.decode(token);
    const userId = decodedToken._id

    try {
        await User.findByIdAndUpdate(userId, { fullName, lang })
        res.json("User updated")
    } catch (error) {
        next(error)
    }
})


// PATCH "/api/profile" => esta ruta sirve para subir a cloudinary una imagen y guardar la URL en la base de datos
router.patch("/", uploader.single("image"), async (req, res, next) => {
    // console.log("file is: ", req.file);

    if (!req.file) {
        next("No file uploaded!");
        return;
    }

    // get the URL of the uploaded file and send it as a response.
    // 'imageUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend

    try {

        // Dividir la cadena para obtener el token (como se hizo en el ejemplo anterior)
        const tokenString = req.headers.authorization
        const tokenArray = tokenString.split(' ');
        const token = tokenArray[1];

        // Decodificar el token
        const decodedToken = jwt.decode(token);
        const userId = decodedToken._id

        // actualizar el campo profileImage
        await User.findByIdAndUpdate(userId, { profileImage: req.file.path })
        res.json("User image profile updated")

    } catch (error) {
        next(error)
    }

    res.json({ imageUrl: req.file.path });
});

// GET "/api/profile/savedCourses" => esta ruta devuele un listado de cursos salvados
router.get("/savedCourses", async (req, res, next) => {

    // Dividir la cadena para obtener el token (como se hizo en el ejemplo anterior)
    const tokenString = req.headers.authorization
    const tokenArray = tokenString.split(' ');
    const token = tokenArray[1];

    // Decodificar el token
    const decodedToken = jwt.decode(token);
    const userId = decodedToken._id

    try {
        const response = await User.findById(userId).
            select({ savedCourses: 1 })

        res.json(response)

    } catch (error) {

    }

})

// PATCH "/api/profile/savedCourses" => esta ruta sirve para añadir un nuevo curso favorito en el modelo User
router.patch("/savedCourses", async (req, res, next) => {

    const { savedCourses } = req.body;

    // Dividir la cadena para obtener el token (como se hizo en el ejemplo anterior)
    const tokenString = req.headers.authorization
    const tokenArray = tokenString.split(' ');
    const token = tokenArray[1];

    // Decodificar el token
    const decodedToken = jwt.decode(token);
    const userId = decodedToken._id

    try {
        // actualizar el campo profileImage
        await User.findByIdAndUpdate(userId, { $push: { savedCourses } })
        res.json("Courses saved")
    } catch (error) {
        next(error)
    }
})

// GET "/api/profile/savedLessons" => esta ruta devuele un listado de lecciones salvadas
router.get("/savedLessons", async (req, res, next) => {

    // Dividir la cadena para obtener el token (como se hizo en el ejemplo anterior)
    const tokenString = req.headers.authorization
    const tokenArray = tokenString.split(' ');
    const token = tokenArray[1];

    // Decodificar el token
    const decodedToken = jwt.decode(token);
    const userId = decodedToken._id

    try {
        const response = await User.findById(userId).
            select({ savedLessons: 1 })

        res.json(response)

    } catch (error) {

    }

})

// PATCH "/api/profile/savedLessons" => esta ruta sirve para añadir un nuevo curso favorito en el modelo User
router.patch("/savedLessons", async (req, res, next) => {

    const { savedLessons } = req.body;

    // Dividir la cadena para obtener el token (como se hizo en el ejemplo anterior)
    const tokenString = req.headers.authorization
    const tokenArray = tokenString.split(' ');
    const token = tokenArray[1];

    // Decodificar el token
    const decodedToken = jwt.decode(token);
    const userId = decodedToken._id

    try {
        // actualizar el campo profileImage
        await User.findByIdAndUpdate(userId, { $push: { savedLessons } })
        res.json("Lessons saved")
    } catch (error) {
        next(error)
    }
})


module.exports = router;

// https://elliotfern.com/controller/blog.php?type=articleId&id=11
// https://elliotfern.com/controller/blog.php?type=curso&idCurso=1&langCurso=es