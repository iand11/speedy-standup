const express = require("express");
const router = express.Router();
const Blocker = require("../controllers/blocker-controllers.js");
const auth = require('../middleware/auth');

router.post("/create", auth, Blocker.create);

router.get("/get-all", Blocker.findAll);

router.get("/:blockerId", auth, Blocker.findOne);

router.put("/:blockerId", auth,  Blocker.update);

router.delete("/:blockerId", auth, Blocker.delete);

module.exports = router;