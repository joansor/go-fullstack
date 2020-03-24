const express = require('express');// import framework express
const router = express.Router();// function dans une variable

const userCtrl = require('../controllers/user');// import du fichier user.js dans le dossier controllers

router.post('/signup', userCtrl.signup);// route post pour enregistre un nouveau utilisateur 
router.post('/login', userCtrl.login);// route post pour se connecter un utilisateur 

module.exports = router;// export de ce fichier