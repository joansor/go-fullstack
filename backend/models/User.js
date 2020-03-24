const mongoose = require('mongoose');// import mongoose un package pour mangodb
const uniqueValidator = require('mongoose-unique-validator');
// import du plugin pour un utilisateur unique dans la bdd
const userSchema = mongoose.Schema({ // schema comment vont etre utiliser dans la bdd
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);// applique le plugin au schema

module.exports = mongoose.model('User', userSchema);// export de ce fichier