const {response} = require('express');
const Evento = require('../models/Evento');


const getEventos = async (request, res = response)=>{

    const eventos = await Evento.find().populate('user', 'name');
    
        res.json({
            ok:true,
            eventos
    
        })
}

const crearEventos = async (request, res = response)=>{

    const evento = new Evento(request.body);

    
    try {

        evento.user = request.uid;

        const eventoGuardado = await evento.save();

        res.json({
            ok: true,
            evento: eventoGuardado
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: 'Por favor hable con el administrador',
        })
    }
   
        
}

const actualizarEventos = async (request, res = response)=>{

    const eventoId = request.params.id;
    const uid = request.uid;
    
    
    try {
        const evento = await Evento.findById(eventoId);
        if(!evento){
            return res.status(404).json({
                ok:false,
                msg: 'Evento no existe por ese id',
            })
        }

        if(evento.user.toString() !== uid ){
            return res.status(401).json({
                ok:false,
                msg: 'No tiene privilegio para editar este evento',
            })
        }

        const nuevoEvento = {
            ...request.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, {new: true})

        res.json({
            ok:true,
            evento: eventoActualizado
        });
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: 'Por favor hable con el administrador',
        })
    }
        
}

const eliminarEventos = async (request, res = response)=>{
    
    const eventoId = request.params.id;
    const uid = request.uid;
    
    
    try {
        const evento = await Evento.findById(eventoId);
        if(!evento){
            return res.status(404).json({
                ok:false,
                msg: 'Evento no existe por ese id',
            })
        }

        if(evento.user.toString() !== uid ){
            return res.status(401).json({
                ok:false,
                msg: 'No tiene privilegio para eliminar este evento',
            })
        }

        

        const eventoEliminado = await Evento.findByIdAndRemove(eventoId)

        console.log(eventoEliminado)
        res.json({
            ok:true,
            evento: eventoEliminado
        });
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: 'Por favor hable con el administrador',
        })
    }
}

module.exports = {
    getEventos,
    crearEventos,
    actualizarEventos,
    eliminarEventos
    

}