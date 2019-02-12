'use strict'

const Glosario = require('../models/glosario');
const mongoose = require('mongoose');

const controller = {
    agregarArrayGlosarios: function (req, res) {
        var glosario = new Glosario();
        var params = req.body;
        var chat = params.idChat;
        var arregloGlosario = [];
        var jsonTerminos = JSON.parse(params.terminos);

        for (let i in jsonTerminos.terminos) {
            arregloGlosario.push({
                'chat': chat,
                'termino': jsonTerminos.terminos[i].termino,
                'descripcion': jsonTerminos.terminos[i].descripcion
            });
        }

        glosario.collection.insertMany(arregloGlosario, function (err, glosarioAlmacenado) {
            if (err) return res.status(500).send({ message: "Error al almacenar el glosario."});
            if (!glosarioAlmacenado) return res.status(404).send({ message: "No se ha podido almacenar el glosario ingresado." });
            return res.status(200).send({ 'glosarioAlmacenado': glosarioAlmacenado });
        });

    },
    agregarTerminoGlosario: function (req, res) {
        var glosario = new Glosario();
        var params = req.body;
        glosario.chat = params.chat;
        glosario.termino = params.termino;
        glosario.descripcion = params.descripcion;

        glosario.save((err, terminoGlosarioAlmacenado) => {
            if (err) console.log(err);
            if (!terminoGlosarioAlmacenado) return res.status(404).send({ message: "No se ha podido almacenar la información del glosario." });
            return res.status(200).send({ 'terminoGlosarioAlmacenado': terminoGlosarioAlmacenado });
        });
    },

    listarTerminosGlosario: function (req, res) {
        var params = req.body;
        console.log(params.chat);

        Glosario.find({"chat": params.chat }, function (err, terminos) {
            if (err) console.log(err);
            if (!terminos) return res.status(404).send({ message: "No se ha encontrado términos asociados a la sala de chat especificada." });
            return res.status(200).send({ 'terminosGlosarioAlmacenados': terminos });
        });
    },

    eliminarTerminoGlosario: function (req, res) {
        var params = req.body;
        console.log(params);

        Glosario.findOneAndDelete({"_id": params._id }, function (err, terminoEliminado) {
            if (err) console.log(err);
            if (!terminoEliminado) return res.status(404).send({ message: "No se ha encontrado términos asociados a la sala de chat especificada." });
            return res.status(200).send({ 'terminoEliminado': terminoEliminado });
        });
    }
}

module.exports = controller;
