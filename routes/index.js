const express = require('express');
const router = express.Router();
const signUp = require("./signup");
router.use("/users",signUp);
module.exports = router;