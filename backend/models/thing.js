const mongoose = require('mongoose');// import mongoose pour mangodb

const thingSchema = mongoose.Schema({// construit un schéma pour la bdd 
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model('Thing', thingSchema); // export de ce fichier