const express = require('express'); // import framework express
const router = express.Router(); // on met dans une varaible la function 

const auth = require('../middleware/auth'); // import le fichier auth.js dans le dossier middleware

const multer = require('../middleware/multer-config');// import le fichier multer-config.js dans le dossier middleware

const stuffCtrl = require('../controllers/stuff');// import le fichier stuff.js dans le dossier controllers

//toutes les routes on applique le middleware auth pour autorisation des tokens
router.get('/', auth, stuffCtrl.getAllStuff);// on utilise le controller grace a la variable stuffCtrl et on applique la methode du controller avec getAllStuff
router.post('/', auth, multer, stuffCtrl.createThing);// multer est un middleware mutlter-config.js dans le dossier middleware
router.get('/:id', auth, stuffCtrl.getOneThing);
router.put('/:id', auth, multer,stuffCtrl.modifyThing);
router.delete('/:id', auth, stuffCtrl.deleteThing);

module.exports = router; //export de ce fichier