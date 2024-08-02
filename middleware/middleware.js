const { Pageerror } = require("./error")

let wrapasync = (fn) => {
   return (req,res,next)=> {
        fn(req, res, next).catch((error) => {
            next(new Pageerror(500,"Internel server error"))
        })
    }
}
const loginrequire = (req, res, next) => {
   
    if (req.user) {
        next()
    } else {
      req.flash("error", "please sign up or login  first");
      req.session.returnTo = req.originalUrl;

      res.redirect("/login");
    }
}






const ownership = async (req, res, next) => {
   let { id } = req.params;
   let note = await Note.findById(id);
   console.log(note);
   console.log(req.user._id);
   if (!note.owner[0]._id.equals(req.user._id)) {
     req.flash("error", "you are not the owner of this note");
     res.redirect("/");
   } else {
     next();
   }
};

  
  
module.exports = { wrapasync, loginrequire, ownership };