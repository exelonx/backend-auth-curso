const { response, request } = require("express")


const crearUsuario = (req = request, res = response) => {

    const { email, name, passowrd } = req.body;

    return res.json({
        ok: true,
        msg: 'Crear usuario /new'
    })
}

const login = (req = request, res = response) => {

    const { email, passowrd } = req.body;

    return res.json({
        ok: true,
        msg: 'Login usuario /new'
    })
}

const revalidarToken = (req = request, res = response) => {
    return res.json({
        ok: true,
        msg: 'Renew'
    })
}

module.exports = {
    crearUsuario,
    login,
    revalidarToken
}