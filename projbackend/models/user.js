var mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1"); //uuid:generates unique id for hashing password

var userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    lastname: {
      type: String,
      maxlength: 32,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    userInfo: {
      type: String,
      trim: true,
    },
    encry_password: {
      type: String,
      required: true,
    },
    salt: String, //cryptography - hashing passwords
    role: {
      type: Number, //userlevel-priviledge - higher number higher priviledge
      default: 0,
    },
    purchases: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
); //updates when the schema is inserted; https://mongoosejs.com/docs/guide.html#timestamps

userSchema
  .virtual("password") //creating virtuals- kind of getter/setter
  .set(function (password) {
    //setter
    this._password = password; //underscore for private variable
    this.salt = uuidv1(); //populate using uuid
    this.encry_password = this.securePassword(password);
  })
  .get(function () {
    //getter
    return this._password;
  });

userSchema.methods = {
  //use methods not method
  authenticate: function (plainpassword) {
    return this.securePassword(plainpassword) === this.encry_password;
  },

  securePassword: function(plainpassword) {
    //method to create password
    if (!plainpassword) return ""; //pass the parameter
    try {
      return crypto
        .createHmac("sha256", this.salt) //look up in  node js crypto documentation
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);