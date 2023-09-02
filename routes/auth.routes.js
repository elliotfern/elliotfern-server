const router = require("express").Router();
const bcrypt = require("bcryptjs")
const User = require("../models/User.model")

const jwt = require("jsonwebtoken")
const isAuthenticated = require("../middlewares/isAuthenticated")

// POST "/api/auth/signup" => esta ruta sirve para transmitir a la base de datos el fomulario de registro de un nuevo usuario
router.post("/signup", async (req, res, next) => {

  const { username, email, password, lang } = req.body

  // validacion de los campos del formulario
  if (!username) {
    res.status(400).json({ errorMessageUsername: "You must provide a username" })
    return;
  }

  if (!email) {
    res.status(400).json({ errorMessageEmail: "You must provide a valid email" })
    return;
  } else {
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    // verificamos el formato correcto del email
    if (regexEmail.test(email) === false) {
      res.status(400).json({ errorMessageEmail: "You must provide a valid format email" })
      return;
    }
  }

  if (!password) {
    res.status(400).json({ errorMessagePassword: "You must provide a password" })
    return;
  } else {

    // verificamos el formato correcto del password
    const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    if (regexPassword.test(password) === false) {
      res.status(400).json({ errorMessagePassword: "The password must have at least 1 uppercase letter, 1 lowercase letter, 1 special character, and be 8 characters or more." })
      return; // detiene la ejecucion de la ruta
    }
  }

  if (!lang) {
    res.status(400).json({ errorMessageLang: "You must provide a prefered language" })
    return;
  }

  // validacion extra: buscar en la base de datos que el usuario o el email no esten repetidos
  // y ciframos la contraseña
  // y por ultimo añadimos el usuario a la BD
  try {
    const foundUser = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });
    if (foundUser !== null) {
      res.status(400).json({ errorMessageUniqueUsername: "A user with that username or email already exists." })
      return; // detiene la ejecucion de la ruta
    }

    // aqui ciframos la contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // creamos user en bd
    await User.create({
      username: username,
      email: email,
      password: passwordHash,
      lang: lang,
    });

    res.json("User create!")

  } catch (error) {
    next(error)
  }


})

//POST "/api/auth/login" => esta ruta se encarga de verificar que el usuario está escribiendo datos de email y contraseña registrados en la bd. Si son correctos quiere decir que es un usuario registrado en la web.
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400).json({ errorMessage: "You can't leave these fields empty" })
    return
  }

  try {

    // validaciones de email y password
    const foundUser = await User.findOne({ email })
    console.log(foundUser)

    // si no se encuentra el usuario, aviso hacia el frontend
    if (foundUser === null) {
      res.status(400).json({ errorMessage: "The user don't exist" })
      return;
    }

    // verifacion de la contraseña, consultamos en db si coincide con la que está introduciendo el usuario en el formulario
    const isPasswordValid = bcrypt.compare(password, foundUser.password)

    if (isPasswordValid === false) {
      res.status(400).json({ errorMessage: "Password don't correct" })
      return;
    }

    // hechas las dos verificaciones, tenemos que crear el sistema de sesion con Token.

    // Payload, información que no debería cambiar
    const payload = {
      _id: foundUser._id,
      email: foundUser.email,
      lang: foundUser.lang,
      role: foundUser.role,
      // si tuvieramos roles, tienen que ir aqui
    }

    const authToken = jwt.sign(
      payload,
      process.env.TOKEN_SECRET,
      { algorithm: "HS256", expiresIn: "3d" }

    )

    res.json({ authToken })



  } catch (error) {
    next(error)
  }
})

// GET "/api/auth/verify" => indicar al front-end que el usuario está activo en llamadas futuras
router.get("/verify", isAuthenticated, (req, res, next) => {
  // https://www.npmjs.com/package/express-jwt

  console.log(req.payload)
  res.json(req.payload)
})



module.exports = router;