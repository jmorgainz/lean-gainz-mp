const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  googleId: { 
      type: String,
      required: true,
  },
  email: String,
  cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cart'
  }
}); 
  
module.exports = mongoose.model('User', userSchema);
