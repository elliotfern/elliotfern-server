const { expressjwt: jwt } = require("express-jwt");

//https://www.npmjs.com/package/express-jwt

const isAuthenticated = jwt({
    secret: process.env.TOKEN_SECRET,
    algorithms: ["HS256"],
    requestProperty: "payload", //despues de validar el token, nos devuelve el valor del payload

    getToken: (req) => {
        console.log(req.headers)

        // hay que retornar el token y hacer cierta logica manualmente.
        // 1- verificacion de si los headers existen o la autenticacion
        if (
            req.headers.authorization === undefined || req.headers === undefined) {
            console.log("Token no entregado")
            return null
        }

        const tokenArr = req.headers.authorization.split(" ")
        const tokenType = tokenArr[0]
        const token = tokenArr[1]

        if (tokenType !== "Bearer") {
            console.log("Tipo de token no válido")
            return null
        }

        console.log("Token entregado")
        return token;
    },
})

module.exports = isAuthenticated