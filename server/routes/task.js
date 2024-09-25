const express = require("express");
const { store, update } = require("../controllers/task");
const { authenticate } = require("../middleware/auth");
const router = express.Router();

router.post("/", authenticate, store);
router.put("/:id", authenticate, update);

module.exports = router;
