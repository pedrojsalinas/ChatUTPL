'use strict'

const Chat = require('../models/chat');
const Glosario = require('../models/glosario');
const mongoose = require('mongoose');

const controller = {
    //Guarda un nombre de chat, y una lista de términos y definiciones
    guardarChatListaTerminos: function (req, res) {
        var chat = new Chat();
        var glosario = new Glosario();
        var params = req.body;
        chat.docente = params.idDocente;
        chat.nombreChat = params.nombreChat;
        var arregloGlosario = [];
        var jsonTerminos = JSON.parse(params.terminos);

        chat.save((err, chatAlmacenado) => {
            if (err) return res.status(500).send({ message: "Error al almacenar la información del chat." });
            if (!chatAlmacenado) return res.status(404).send({ message: "No se ha podido almacenar la información del chat." });
            if (res.status(200)) {
                for (let i in jsonTerminos.terminos) {
                    arregloGlosario.push({
                        'chat': chatAlmacenado.id,
                        'termino': jsonTerminos.terminos[i].termino,
                        'descripcion': jsonTerminos.terminos[i].descripcion
                    });
                }

                glosario.collection.insertMany(arregloGlosario, function (err, glosarioAlmacenado) {
                    if (err) return res.status(500).send({ message: "Error al almacenar el glosario." });
                    if (!glosarioAlmacenado) return res.status(404).send({ message: "No se ha podido almacenar el glosario ingresado." });
                    return res.status(200).send({ 'glosarioAlmacenado': glosarioAlmacenado });
                });

            }
        });
    },
    guardarSalaChat: function (req, res) {
        var chat = new Chat();
        var params = req.body;
        chat.docente = mongoose.Types.ObjectId(params.docente);
        chat.nombreChat = params.nombreChat;
        let fechaActual = new Date();
        let dia = fechaActual.getDate();
        let mes = parseInt(fechaActual.getMonth())+1;
        let anio = fechaActual.getFullYear();
        chat.fecha = anio+'-'+mes+'-'+dia;

        chat.save((err, chatAlmacenado) => {
            if (err) return res.status(500).send({ message: "Error al almacenar la información del chat." });
            if (!chatAlmacenado) return res.status(404).send({ message: "No se ha podido almacenar la información del chat." });
            return res.status(200).send({ 'chatAlmacenado': chatAlmacenado });
        });
    },

    actualizarSalaChat: function (req, res) {
        var params = req.body;
        Chat.findOneAndUpdate({ "_id": mongoose.Types.ObjectId(params._id) }, { 'nombreChat': params.nombreChat }, { new: true }, function (err, chatActualizado) {
            if (err) return res.status(500).send({ message: "Error al actualizar la información de la sala de chat." });
            if (!chatActualizado) return res.status(404).send({ message: "No se ha podido almacenar la información actualizada de la sala de chat." });
            return res.status(200).send({ 'chatActualizado': chatActualizado });
        });
    },

    listarSalasChat: function (req, res) {
        var params = req.body;
        Chat.find({ "docente": params.docente }, function (err, salasChat) {
            if (err) return res.status(500).send({ message: "Error al recurperar la información de las salas de chat." });
            if (!salasChat) return res.status(404).send({ message: "No se ha podido encontrar salas de chat asociadas al docente." });
            return res.status(200).send({ 'listaSalasChat': salasChat });
        });
    },

    obtenerSalaChat: function (req, res) {
        var params = req.body;
        Chat.find({ "docente": params.docente }, function (err, salasChat) {
            if (err) return res.status(500).send({ message: "Error al recurperar la información de las salas de chat." });
            if (!salasChat) return res.status(404).send({ message: "No se ha podido encontrar salas de chat asociadas al docente." });
            return res.status(200).send({ 'listaSalasChat': salasChat });
        });
    },

    obtenerNombreSalaChat: function (req, res) {
        var params = req.body;
        Chat.find({"_id": mongoose.Types.ObjectId(params.idChat)}, function (err, salaEncontrada) {
            if (err) return res.status(500).send({ message: "Error al recurperar la información de las salas de chat." });
            if (!salaEncontrada) return res.status(404).send({ message: "No se ha podido encontrar el nombre de la sala de chat." });
            return res.status(200).send({ 'salaEncontrada': salaEncontrada });
        });
    },


};

module.exports = controller;
