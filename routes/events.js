/*
    Events Routes
    host + /api/events

*/

const {Router} = require('express');
const {check} = require('express-validator');

const { getEventos, crearEventos, eliminarEventos, actualizarEventos } = require('../controllers/events');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');

const router = Router();

router.use(validarJWT);

router.get(
    '/',
    getEventos);

router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom(isDate),
        check('end', 'La fecha fin es obligatoria').custom(isDate),
        validarCampos
    ],
    crearEventos);

router.put(
    '/:id',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom(isDate),
        check('end', 'La fecha fin es obligatoria').custom(isDate),
        validarCampos
    ],
    actualizarEventos);

router.delete(
    '/:id',
    eliminarEventos);

module.exports = router;