const { response } = require('express')
const Usuario = require('../models/Usuario')

const crearUsuario = async(req, res = response )=>{

    // const { name, email, password } = req.body

    try {
        
        const usuario = new Usuario( req.body )
    
        const nuevoUsuario = await usuario.save()
    
        res.status(201).json({
            ok: true,
            msg: 'Register',
            nuevoUsuario
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se pudo crear la cuenta'
        })
    }

}

const loginUsuario = (req, res = response)=>{

    const { email, password } = req.body

    res.json({
        ok: true,
        msg: 'Login',
        email, 
        password
    })
}

const revalidarToken = (req, res= response)=>{
    res.json({
        ok: true,
        msg: 'renew'
    })
}



module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
}