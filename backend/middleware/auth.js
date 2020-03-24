const jwt = require('jsonwebtoken');// iport le package jsonwebtoken

module.exports = (req, res, next) => {
  try {
        const token = req.headers.authorization.split(' ')[1]; // creation d'un token
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');// on applique un encodage au token grace au plugin et au mot secret 'RANDOM_TOKEN_SECRET
        const userId = decodedToken.userId;// on associe l'id user avec le token
        if (req.body.userId && req.body.userId !== userId) { // si l'id user correspond pas a l'encodage token 
          throw 'Invalid user ID';
        } else {

          next();// si tout se passe a merveille passe à la suite
        }
      } catch {
        res.status(401).json({ // si id user et token different renvoie une erreur 
          error: new Error('Invalid request!')
    });
  }
};