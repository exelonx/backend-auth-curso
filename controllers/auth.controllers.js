const { response, request } = require("express");
const Usuario = require("../models/Usuario");
const bcrypt = require('bcryptjs');
const { generarJWT } = require("../helpers/jwt");

const crearUsuario = async(req = request, res = response) => {

    const { email, name, password } = req.body;

    try {

        // Verificar el email
        let usuario = await Usuario.findOne({ email: email});

        if ( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe con ese email'
            })
        }

        // Crear usuario con el modelo
        DBusuario = new Usuario( req.body )
        
        // Hashear contraseña
        const salt = bcrypt.genSaltSync();
        DBusuario.password = bcrypt.hashSync( password, salt );

        // Generar JWT
        const token = await generarJWT(DBusuario.id, name)

        // Crear usuario de DB
        DBusuario.save()

        // Generar respuesta exitosa
        return res.status(201).json({
            ok: true,
            uid: DBusuario.id,
            name,
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

}

const login = async(req = request, res = response) => {

    const { email, password } = req.body;

    try {
        // Confirmar existencia del correo
        const dbUser = await Usuario.findOne({ email })
        
        if( !dbUser ) {
            return res.status(404).json({
                ok: false,
                msg: 'El correo o la contraseña no coinciden'
            })
        }

        // Confirmar si el password hace match
        const validarPassword = await bcrypt.compareSync( password, dbUser.password )
        if( !validarPassword ) {
            return res.status(404).json({
                ok: false,
                msg: 'El correo o la contraseña no coinciden'
            })
        }

        // Generar JWT
        const token = await generarJWT(dbUser.id, dbUser.name)

        //Respuesta del servicio
        return res.json({
            ok: true,
            uid : dbUser.id,
            name: dbUser.name,
            token
        })

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con su administrador'
        })
    }
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