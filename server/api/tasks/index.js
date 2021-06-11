const router = require("express").Router();
const controller = require("./tasks.controller");

router.post('/', controller.createTask);

module.exports = router;
