
const Thing = require('../models/thing');// import le model du fichier thing.js
const fs = require('fs'); // sincère je sait pas trop il doit être utiliser pour la suppression tu le retrouvera dans le module delete

exports.createThing = (req, res, next) => {// création d'un objet
  const thingObject = JSON.parse(req.body.thing);// on le parse format data
  delete thingObject._id; // supprimer  l'id  ds le corp de l'objet
  const thing = new Thing({
    ...thingObject, // on ajout a la bdd tout les elements dans leurs champs
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // par l'url on récupere la source image 
  });
    thing.save()// on sauvegarde l'objet dans la bdd 
      .then(() => res.status(201).json({ message: 'Objet enregistré !'})) // promise ok
      .catch(error => res.status(400).json({ error })); //promise erreur
  };

  // on récupere un seul element
  exports.getOneThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id }) // trouve un seul element par sont id 
      .then(thing => res.status(200).json(thing)) //promise ok  
      .catch(error => res.status(404).json({ error })); // promise erreur
  };

  // modifie un element dans la bdd
  exports.modifyThing = (req, res, next) => {
    const thingObject = req.file ?// si y'a un fichier image 
    {
      ...JSON.parse(req.body.thing),// parse en data pour la bdd
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`// recupere l'iamge dans l'url 
    } : { ...req.body };// et les autre champs
  Thing.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })// modifie un seul element par son id et revoie dans le corp
      .then(() => res.status(200).json({ message: 'Objet modifié !'})) // promise ok
      .catch(error => res.status(400).json({ error }));// promise erreur
  };

  exports.deleteThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id })// trouve element par son id
      .then(thing => { // si c'est ok il la trouvé alors ... 
        const filename = thing.imageUrl.split('/images/')[1];//il va le chercher dans l'url  
        fs.unlink(`images/${filename}`, () => {// il le retire  du dossier 
          Thing.deleteOne({ _id: req.params.id })// supprime de la bdd par son id
            .then(() => res.status(200).json({ message: 'Objet supprimé !'}))//promise ok
            .catch(error => res.status(400).json({ error }));// promise erreur page 400
        });
      })
      .catch(error => res.status(500).json({ error }));// sinon promise erreur serveur
  };
  exports.getAllStuff = (req, res, next) => {
    Thing.find()// trouve tout les elements 
      .then(things => res.status(200).json(things)) //promise ok 
      .catch(error => res.status(400).json({ error })); // promise erreur
  };

