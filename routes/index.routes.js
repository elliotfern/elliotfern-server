const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("Welcome at OpenHistory");
});

// rutas auth para el signup, login y verify
const authRouter = require("./auth.routes")
router.use("/auth", authRouter)


// rutas profile
const profileRouter = require("./profile.routes")
router.use("/profile", profileRouter)


// rutas comments
const commentRouter = require("./comment.routes")
router.use("/comment", commentRouter)


// rutas book
const bookRouter = require("./book.routes")
router.use("/book", bookRouter)

// rutas upload imagen
const uploadRoutes = require("./upload.routes");
router.use("/upload", uploadRoutes);

module.exports = router;
