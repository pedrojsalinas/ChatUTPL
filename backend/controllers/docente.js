'use strict'

const Docente = require('../models/docente');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const controller = {
    guardarDocente: function (req, res) {
        var docente = new Docente();
        var params = req.body;
        docente.nombres = params.nombres;
        docente.apellidos = params.apellidos;
        docente.email = params.email;
        docente.password = Docente.hashPassword(params.password);

        docente.save((err, docenteAlmacenado) => {
            if (err) return res.status(500).send({ message: "Error al almacenar la información del docente." });
            if (!docenteAlmacenado) return res.status(404).send({ message: "No se ha podido almacenar la información del docente." });
            return res.status(200).send({ docente: docenteAlmacenado });
        });
    },

    consultarDocenteIngreso: function (req, res) {
        const email = req.body.email;
        const password = req.body.password;

        Docente.findOne({ 'email': email }, (err, docenteEncontrado) => {
            if (err) return res.status(500).send({ message: "Error al consultar la información del docente." });
            if (!docenteEncontrado) return res.status(404).send({ message: "El usuario y password ingresados no son correctos." });
            if (docenteEncontrado) {
                if (docenteEncontrado.isValid(password)) {
                    const token = jwt.sign({ id: docenteEncontrado.id }, 'chatUtpl2019', { expiresIn: '2h' });
                    return res.status(200).json({ idDocente: docenteEncontrado.id, token: token, nombresDocente: docenteEncontrado.nombres, apellidosDocente: docenteEncontrado.apellidos });
                } else {
                    return res.status(404).json({ message: 'El usuario y password ingresados no son correctos.' });
                }
            };
        })

    },

    obtenerPerfil:function(req, res, next) {
        res.json({ text:"ingresado22" });
    },

    /*
    consultarDocenteIngreso: function(req, res){
        const email = req.body.email;
        const password = req.body.password;

        Docente.findOne({'email':email, 'password':password}, (err, docenteEncontrado)=>{
            if(err) return res.status(500).send({message: "Error al consultar la información del docente."});
            if(!docenteEncontrado) return res.status(404).send({message:"EL usuario y password ingresados no son correctos."});
            return res.status(200).send({docente:docenteEncontrado});
        })
       
    },
    */
};

module.exports = controller;
