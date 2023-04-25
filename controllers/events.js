const { response } = require("express")
const Evento = require("../models/Evento")
const { isValidObjectId } = require("mongoose")


const getEventos = async( req, res = response ) => {

    try {
        const eventos = await Evento.find()
                                    .populate('user', 'name')
        res.status(200).json({
            ok: true,
            eventos
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error, hable con el administrador'
        })    
    }
}



const crearEvento = async( req, res = response ) => {

    const evento = new Evento( req.body )
    
    try {

        evento.user = req.uid

        const eventoGuardado  = await evento.save()
        
        res.status(200).json({
            ok: true,
            evento: eventoGuardado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error, hable con el administrador'
        })        
    }


}



const actualizarEvento = async( req, res = response ) => {

    const eventoId = req.params.id
    const { uid } = req

    if (!isValidObjectId(eventoId)) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningun evento con ese ID'
        })
    }

    try {

        const evento = await Evento.findById(eventoId)

        if(!evento){
            return res.status(400).json({
                ok: false,
                msg: 'No hay ningun evento con ese ID'
            })
        }
        
        if( evento.user.toString() !== uid ){
            return res.status(401).json({
                ok: false,
                msg: 'No autorizado'
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento,{ new: true } )

        res.status(200).json({
            ok: true,
            eventoActualizado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error, hable con el administrador'
        })    
    }
}



const eliminarEvento = async( req, res = response ) => {

    const eventoId = req.params.id
    const { uid } = req

    if (!isValidObjectId(eventoId)) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningun evento con ese ID'
        })
    }

    try {
        
        const evento = await Evento.findById(eventoId)
    
        if(!evento){
            return res.status(400).json({
                ok: false,
                msg: 'No hay ningun evento con ese ID'
            })
        }
    
        if( evento.user.toString() !== uid ){
            return res.status(401).json({
                ok: false,
                msg: 'No autorizado'
            })
        }
        
        await evento.deleteOne()
    
        res.status(200).json({
            ok: true,
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error, hable con el administrador'
        }) 
    }
}


module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento,
}