const mongoose = require("mongoose");
const { user } = require("./user");
const Schema = mongoose.Schema;
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Notes");
}
main().catch((err) => console.log(err));
let noteschema = new Schema({
  title: {
    type: String,
    required: [true, "Enter something"],
    trim: true,
    minLength: [2, "The title is too small"],
  },
  description: {
    type: String,
    trim: true,
    require: [true, "Enter something"],
    minLength: [2, "The description is too small"],
  },
  date: {
    type: Date,
    required:true,
    default: Date.now,
  },
  owner: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
      
    },
  ],
});
Note = mongoose.model("Note", noteschema);


module.exports = { Note };