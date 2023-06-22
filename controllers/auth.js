const {response} = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');



const crearUsuario = async (request, res = response)=>{
    const { email, password} =  request.body;
    // console.log(request)

    try {

        let usuario = await Usuario.findOne({email});

        if(usuario){
           return res.status(400).json({
                ok:false,
                msg: 'Usuario ya registrado  con ese correo',
               
        
            })
        }

        usuario = new Usuario(request.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);


       
        await usuario.save();

        const token = await generarJWT(usuario.id, usuario.name);



        res.status(201).json({
            ok:true,
            uid: usuario.id,
            name: usuario.name,
            token
        

    })
    } catch (error) {
        console.log(error)

        res.status(500).json({
            ok:false,
            msg: 'Por favor hable con el administrador',
           
    
        })
        
    }
    
    
}

const loginUsuario = async (request, res = response)=>{
    // console.log(request)

    const { email, password} =  request.body;


    try {
        const usuario = await Usuario.findOne({email});

        if(!usuario){
           return res.status(400).json({
                ok:false,
                msg: 'El usuario no existe con ese correo',
               
        
            })
        }

        //Confirmar los passwords
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg: 'Password no valido',
               
        
            });
        }

        const token = await generarJWT(usuario.id, usuario.name);

        res.json({
            ok:true,
            uid: usuario.id,
            name: usuario.name, 
            token,
        });


    } catch (error) {
        console.log(error)

        res.status(500).json({
            ok:false,
            msg: 'Por favor hable con el administrador',
           
    
        })
    }

    

  
}


const revalidarToken = async (req, res = response)=>{

    const uid = req.uid;
    const name = req.name;

    const token = await generarJWT(uid, name);

    res.json({
        ok:true,
        msg: 'renew', 
        token
    })
}

module.exports = {
    crearUsuario,
    revalidarToken,
    loginUsuario

}