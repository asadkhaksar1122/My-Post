const passport = require("passport")
const {user} = require("../schema/user");
const { Pageerror } = require("../middleware/error");
module.exports.signuppost = (req, res, next) => {
  let {firstname,secondname,dateofbirth, username, email, password } = req.body;
  let userone = new user({
    firstname: firstname,
    secondname:secondname,
    username: username,
    dateofbirth: dateofbirth,
    email: email,
  });
  
  if (req.file) {
    
    userone.profile = req.file.filename;
  }
  user
    .register(userone, password)
    .then((result) => {
      req.login(result, (error) => {
        if (error) {
          next(error);
        }
        req.flash("success", "You have been signed up");
        res.redirect("/");
      });
    })
    .catch((error) => {
      if (error.code === 11000 && error.keyValue.email) {
        // Modify the error message
        const errorMessage = "Email already exists";
        // Handle the error or return the error message to the user
        req.flash("error",errorMessage)
      } 
      else if (error && error.message) {
        let errormessageupdated = error.message.replace("user validation failed:","");
        req.flash("error", errormessageupdated);
      }
      res.redirect("/signup");
    });
};
module.exports.signupget = (req, res) => {
  res.render("routesejs/signup.ejs");
};
module.exports.loginget = (req, res) => {
  res.render("routesejs/login.ejs");
};
module.exports.loginpost = function (req, res) {
  req.flash("success", "You have logged in");
    const returnTo = req.session.returnTo || "/";
  res.redirect(returnTo);
};
module.exports.logout= (req, res,next) => {
  req.logout((error) => {
    if (error) {
      next(error)
    }
    res.redirect("/");
  })
}
module.exports.mypost = (req, res, next) => {
  user.findById(req.user._id).populate("note").then((user) => {
     res.render("routesejs/mypost.ejs",{user});
  })
 
}
module.exports.profileget = (req, res, next) => {
  user.findById(req.user._id).then((user) => {
    res.render("routesejs/profile.ejs",{user});
  })
}
module.exports.editnameget = (req, res, next) => {
  user.findById(req.user._id).then((oneuser) => {
    res.render("routesejs/editname.ejs", { oneuser });
  });
};
module.exports.editnamepost = (req, res, next) => {
  let { firstname, secondname } = req.body;
  user
    .findByIdAndUpdate(req.user._id, {
      firstname: firstname,
      secondname: secondname,
    },{runValidators:true})
    .then((result) => {
      req.flash("success", "Name updated successfully");
      res.redirect("/profile");
    })
    .catch((error) => {
      next(Pageerror(500,"Internel server error"));
    });
};
module.exports.changepasswordget = (req, res, next) => {
  res.render("routesejs/changepassword.ejs");
};