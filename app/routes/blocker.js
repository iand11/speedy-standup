const express = require("express");
const { check } = require("express-validator/check");
const router = express.Router();
const Blocker = require("../controllers/blocker-controllers.js");
const auth = require("../middleware/auth");

const { create, findAll, findOne, update, remove } = Blocker;

router.post(
  "/create",
  auth,
  [
    check("name", "Please Enter a Valid Name").not().isEmpty(),
    check("blocker", "Please Enter a Valid Blocker").not().isEmpty(),
    check("ticket", "Please Enter a Valid Ticket").not().isEmpty(),
  ],
  create
);

router.get("/get-all", findAll);

router.get("/:blockerId", auth, findOne);

router.put("/:blockerId", auth, update);

router.delete("/:blockerId", auth, remove);

module.exports = router;
