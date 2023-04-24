/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/

const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')

const { validarCampos } = require('../middlewares/validar-campos')
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth')


router.post(
    '/new', 
    [ 
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email no es válido').isEmail(),
        check('password', 'El password debe de tener minimo 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    crearUsuario
)

router.post(
    '/',
    [
        check('email', 'El email no es válido').isEmail(),
        check('password', 'El password debe de tener minimo 6 carateres').isLength({ min: 6 }),
        validarCampos
    ],
    loginUsuario
)



router.get('/renew', revalidarToken )


module.exports = router


