/*
    Rutas de usuario / Auth
    host + /api/auth

*/



const {Router} = require('express');
const {check} = require('express-validator');

const { crearUsuario, revalidarToken, loginUsuario } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();




router.post('/',
[//midelwares
check('email', 'El mail es obligatorio ').isEmail(),
check('password', 'El password es obligatorio y minimo 6 caracteres ').isLength({min:6}),
validarCampos
],
 
loginUsuario);

router.post(
    '/new',
    [//midelwares
    check('name', 'El nombre es obligatorio ').not().isEmpty(),
    check('email', 'El mail es obligatorio ').isEmail(),
    check('password', 'El password es obligatorio y minimo 6 caracteres ').isLength({min:6}),
    validarCampos
    ],
    
    crearUsuario
    );

router.get(
    '/renew',
    validarJWT,
    revalidarToken);



module.exports = router;