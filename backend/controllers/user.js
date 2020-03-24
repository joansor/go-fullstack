
const bcrypt = require('bcrypt');// import d'un package bcrypt 
const User = require('../models/User'); // import du model 
const jwt = require('jsonwebtoken'); // import du jsonwebtoken

// export module nodejs utilisé exports = module.exports
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)// plugin bcrypt et function hashage du password
      .then(hash => {// réponse ok
        const user = new User({
          email: req.body.email, // enregistre dans la bdd l'email dans la bdd
          password: hash // enregistre dans la bdd password dans la bdd en hasher
        });
        user.save()// on sauvegarde l'utilisateur ds la bdd
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))// revoie de la reponse favorable
          .catch(error => res.status(400).json({ error }));// erreur page
      })
      .catch(error => res.status(500).json({ error }));// et sinon erreur serveur
  };
  exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email }) // on recupere l'utilisateur avec email
      .then(user => {
        if (!user) { // si l'utilisateur pas trouver erreur 
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password) // on compare le pass et asher de la bdd et compare avec le password de l'utilisateur 
          .then(valid => {
            if (!valid) { // si pas pareil renvoie erreur page
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({ // sinon résultat ok 
              userId: user._id, // id utilisateur associer au jeton 
              token: jwt.sign(
                { userId: user._id },
                'RANDOM_TOKEN_SECRET', // mot secret du token 
                { expiresIn: '24h' } // délai du token
              )
            });
          })
          .catch(error => res.status(500).json({ error })); // sinon erreur serveur status 
      })
      .catch(error => res.status(500).json({ error }));
  };