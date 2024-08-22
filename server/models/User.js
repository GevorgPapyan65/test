// const mongoose = require('mongoose');

// const UserSchema = new mongoose.Schema({
//   fullname: { type: String, required: true },
//   lastname: { type: String, required: true },
//   surname: { type: String, required: true },
//   organization: { type: String, required: true },
//   birthday: { type: Date, required: true },
//   email: { type: String, required: true, unique: true },
//   phone: { type: String, required: true },
//   password: { type: String, required: true }  // Add this if you plan to handle password
// });

// module.exports = mongoose.model('User', UserSchema);


const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  lastname: { type: String, required: true },
  surname: { type: String, required: true },
  organization: { type: String, required: true },
  birthday: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  photoPath: { type: String ,default:'avatar'} // Path to the user's photo
});

module.exports = mongoose.model('User', UserSchema);
