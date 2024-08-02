const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { Note } = require("./notes.js");
const passportLocalMongoose = require("passport-local-mongoose");
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Notes");
}
main().catch((err) => console.log(err));
let userschema = new Schema({
  firstname: {
    type: String,
    required: [true, "First name can't be empty"],
    minlength: [2, "The first name is too small"],
  },
  secondname: {
    type: String,
    required: [true, "Second name can't be empty"],
    minlength: [2, "The Second name is too small"],
  },
  dateofbirth: {
    type: Date,
    required: [true, "plase select your date of birth"],
  },
  email: {
    type: String,
    required: [true, "Email can't be empty"],
    unique: [true, "Email already exist"],
  },
  note: [
    {
      type: Schema.Types.ObjectId,
      ref: "Note",
    },
  ],
  profile: {
    type: String,
    required: true,
    default: "profile.jpg",
  },
});
userschema.plugin(passportLocalMongoose);
let user = mongoose.model("user", userschema);

module.exports = { user };



