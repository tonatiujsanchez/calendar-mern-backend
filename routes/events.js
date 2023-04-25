/*
    Rutas de Eventos / Events
    host + /api/events
*/

const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')

const { validarJWT } = require('../helpers/validar-jwt')
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events')
const { validarCampos } = require('../middlewares/validar-campos')
const { isDate } = require('../helpers/isDate')

// Aplicar el middleware validarJWT a todas las rutas
router.use( validarJWT )

// Obtener eventos
router.get('/', getEventos)

// Crear un nuevo evento
router.post(
    '/', 
    [
        check('title','El título es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom(isDate),
        check('end','Fecha de finalización es obligatoria').custom(isDate),
        validarCampos
    ], 
    crearEvento
)

// Actualizar evento
router.put(
    '/:id',
    [
        check('title','El título es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom(isDate),
        check('end','Fecha de finalización es obligatoria').custom(isDate),
        validarCampos
    ],
    actualizarEvento
)

// Actualizar evento
router.delete('/:id', eliminarEvento)



module.exports = router


