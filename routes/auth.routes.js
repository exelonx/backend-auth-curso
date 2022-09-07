const { crearUsuario, login, revalidarToken } = require("../controllers/auth.controllers");

const { Router } = require('express');
const { check } = require("express-validator");

const router = Router();

router.post('/new', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').isLength({ min:6 })
], crearUsuario)

//Login de usuario
router.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').isLength({ min:6 })
], login)

//Validar y revalidar token
router.post('/renew', revalidarToken)

module.exports = router;