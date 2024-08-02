const { Pageerror } = require("../middleware/error.js");
const { Note } = require("../schema/notes.js");
const { user } = require("../schema/user.js");
module.exports.newnote = (req, res, next) => {
  res.render("routesejs/addnote.ejs", { error: null });
};
module.exports.home = async (req, res, next) => {
  Note.find({}).populate("owner").then((result) => {
    res.render("routesejs/home.ejs", { result });
  });
};
module.exports.editget = async (req, res, next) => {
  let { id } = req.params;
  Note.findById(id).then((result) => {
    if (!result) {
      next(new Pageerror(404, "Page not found"));
    } else {
      res.render("routesejs/edit.ejs", { note: result, error: null });
    }
  });
};
module.exports.postnew = async (req, res) => {
  let { title, description } = req.body;
  let newNote = new Note({
    title: title,
    description: description,
  });
  newNote.owner = req.user._id;
  newNote
    .save()
    .then((note) => {
      user
        .findById(req.user._id)
        .then((singleUser) => {
          singleUser.note.push(note._id);
          singleUser.save();
          req.flash("success", "you have added the note successfully");
          res.redirect("/");
        })
        .catch((error) => {
          res.render("routesejs/addnote.ejs", { error });
        });
    })
    .catch((error) => {
      res.render("routesejs/addnote.ejs", { error });
    });
};
module.exports.postedit = async (req, res, next) => {
  let { id } = req.params;
  let { title, description } = req.body;
  Note.findByIdAndUpdate(
    id,
    { title: title, description: description, date: new Date(), },
    { runValidators: true }
  )
    .then((result) => {
      
      req.flash("success", "The Post has been edited successfully");
      res.redirect("/");
    })
    .catch((error) => {
      Note.findById(id)
        .then((result) => {
          res.render("routesejs/edit.ejs", { note: result, error });
        })
        .catch((error) => {
          next(new Pageerror(404, "Page not found"));
        });
    });
};
module.exports.destroyroute = async (req, res, next) => {
  let { id } = req.params;
  Note.findByIdAndDelete(id).then((result) => {
   
user.findByIdAndUpdate(
    req.user._id,
    { $pull: { note: id } },
    { multi: true }
).then((updateduser) => {
 console.log(updateduser);
  })
    
    req.flash("error", "The Post has been deleted");
    res.redirect("/");
  });
};
