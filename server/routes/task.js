const express = require("express");
const { store, update, remove } = require("../controllers/task");
const { authenticate } = require("../middleware/auth");
const router = express.Router();

router.post("/", authenticate, store);
router.put("/:id", authenticate, update);
router.delete("/:id", authenticate, remove);

module.exports = router;
