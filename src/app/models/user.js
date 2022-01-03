const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//bcypt encryptaa salasanan
const bcrypt = require("bcrypt-nodejs");

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 20,
  },
  password: { type: String, required: true, minlength: 5, maxlength: 60 },
});

//.pre tekee jotai ennen jotain, ennen 'save' > cryptaa salasana
/*UserSchema.pre("save", function (next) {
  const user = this;
  bcrypt.hash(user.password, null, null, function (err, hash) {
    user.password = hash;
    next();
  });
});*/

module.exports = User = mongoose.model("User", UserSchema);
