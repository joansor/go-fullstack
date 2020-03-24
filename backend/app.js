const express = require('express'); // import du framework express
const bodyParser = require('body-parser'); // import du package body-parser pour récuperer un data de la bdd en json
const app = express();// on met la function express() dans une varaible
const mongoose = require('mongoose'); // import du package mongoose
const stuffRoutes = require('./routes/stuff');// import du fichier route
const userRoutes = require('./routes/user');// import du fichier routeUser
const path = require('path');//import du package path pour le chemin du dossier ou seront ajouter ou supprimer dans le dossier images

//connection a la bdd mangodb
mongoose.connect('mongodb+srv://admin:root@cluster-0zvyu.gcp.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//middleware pour l'erreur CORS
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');// * donne access a tous les url
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();// passe la function suivante 
  });

//middleware pour renvoier le json en data pour la bdd 
  app.use(bodyParser.json());

//middleware a cette route tu applique ce qui se trouve dans le dossier routes -> stuff.js 
  app.use('/api/stuff',stuffRoutes);
  //middleware a cette route tu applique cette function pour le dossier images
  app.use('/images', express.static(path.join(__dirname, 'images')));
 //middleware a cette route tu applique ce qui se trouve dans le dossier routes -> user.js 
  app.use('/api/auth', userRoutes);
  
module.exports = app;// export ce fichier app 