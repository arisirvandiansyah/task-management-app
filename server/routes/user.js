const express = require("express");
const { route } = require("./auth");
const { getAll, getEmployee } = require("../controllers/user");
const { authenticate } = require("../middleware/auth");
const router = express.Router();

router.get("/employee/all", authenticate, getEmployee);

module.exports = router;
