const express = require("express");
const { store } = require("../controllers/task");
const { authenticate } = require("../middleware/auth");
const router = express.Router();

router.post("/", authenticate, store);

module.exports = router;
