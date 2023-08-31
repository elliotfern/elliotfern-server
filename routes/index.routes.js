const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("Welcome at OpenHistory");
});

// rutas auth para el signup, login y verify
const authRouter = require("./auth.routes")
router.use("/auth", authRouter)

/*
// rutas profile
const profileRouter = require("./profile.routes")
router.use("/profile", profileRouter)

// rutas comments
const commentsRouter = require("./comments.routes")
router.use("/comments", commentsRouter)

// rutas book
const commentsRouter = require("./comments.routes")
router.use("/comments", commentsRouter)
*/
module.exports = router;
