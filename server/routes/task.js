const express = require("express");
const { store, update, remove, getAll } = require("../controllers/task");
const { authenticate } = require("../middleware/auth");
const router = express.Router();

router.get("/all", authenticate, getAll);
router.post("/", authenticate, store);
router.put("/:id", authenticate, update);
router.delete("/:id", authenticate, remove);

module.exports = router;
