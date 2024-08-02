const express = require("express");
const router = express.Router();
const { Note } = require("../schema/notes.js");
const {  user } = require("../schema/user.js");
const { wrapasync, loginrequire, ownership } = require("../middleware/middleware.js");
const { Pageerror } = require("../middleware/error.js");
const { home, newnote, editget, postnew, postedit, destroyroute } = require("../controller/home.js");

router.get(
  "/",
  wrapasync(home)
);
router
  .route("/new")
  .get(loginrequire, newnote)
  .post( loginrequire, postnew);
router.get(
  "/edit/:id",
  loginrequire,
  ownership,
  wrapasync(editget)
);

router.post("/edit/:id", loginrequire, ownership,postedit);

router.get(
  "/delete/:id",
  loginrequire, ownership,
  wrapasync(destroyroute)
);

module.exports = router;
