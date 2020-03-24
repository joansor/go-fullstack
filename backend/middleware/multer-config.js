const multer = require('multer'); // import du package multer 

const MIME_TYPES = { // on précise les extensions des images que l'on veut 
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({ // on envoie le fichier dans le disque 
  destination: (req, file, callback) => {
    callback(null, 'images');// on lui précise sa destination du dossier ou le renvoyer l'image
  },
  filename: (req, file, callback) => { // on retransforme les titre d'image
    const name = file.originalname.split(' ').join('_');// on remplace les espace des titres part des underscore _ 
    const extension = MIME_TYPES[file.mimetype];// on applique l'extension 
    callback(null, name + Date.now() + '.' + extension);// on renvoie le nom la date et .extension 
  }
});

module.exports = multer({storage: storage}).single('image');// on export ce fichier 