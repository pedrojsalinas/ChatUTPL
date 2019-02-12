'use strict'

const express = require('express');
const ChatController = require('../controllers/chat');

const router = express.Router();

router.post('/guardarChatListaTerminos', ChatController.guardarChatListaTerminos);
router.post('/guardarSalaChat', ChatController.guardarSalaChat);
router.put('/actualizarSalaChat', ChatController.actualizarSalaChat);
router.post('/listarSalasChat', ChatController.listarSalasChat);
router.post('/obtenerNombreSalaChat', ChatController.obtenerNombreSalaChat);

//router.get('/obtenerSalaChat/:id', ChatController.obtenerSalaChat);
//router.post('/obtenerPerfil', VerificarToken.verificarToken ,DocenteController.obtenerPerfil);

module.exports = router;