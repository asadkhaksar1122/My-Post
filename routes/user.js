const express = require("express");
const router = express.Router();
const { wrapasync, loginrequire } = require("../middleware/middleware");
const { user } = require("../schema/user");
const passport = require("passport");
const Usercontroll = require("../controller/user");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/profile"); // Specify the upload directory
  },
  filename: (req, file, cb) => {
    // Generate a unique filename
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});
const fileFilter = (req, file, cb) => {
  // Check if the file is an image
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error("Only image files are allowed."), false);
  }
  cb(null, true);
};
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

router
  .route("/signup")
  .get(Usercontroll.signupget)
  .post(upload.single("profile"), Usercontroll.signuppost);

router
  .route("/login")
  .get(Usercontroll.loginget)
  .post(
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    Usercontroll.loginpost
  );
router.get("/logout", Usercontroll.logout);
router.route("/mypost").get(loginrequire, Usercontroll.mypost);
router.route("/profile").get(loginrequire, Usercontroll.profileget);
router
  .route("/editname")
  .get(loginrequire, Usercontroll.editnameget)
  .post(loginrequire, Usercontroll.editnamepost);
router
  .route("/changepassword")
  .get(loginrequire, Usercontroll.changepasswordget)
  .post(loginrequire ,(req, res, next) => {
    const { oldpassword, password } = req.body;

    req.user.changePassword(oldpassword, password, (err) => {
      if (err) {
        req.flash("error", "Password is incorrect")
        console.log(err)
       return res.redirect("/changepassword")
      }

      req.flash("success", "Password updated successfully");
      res.redirect("/profile");
    });
  });;
module.exports = router;
