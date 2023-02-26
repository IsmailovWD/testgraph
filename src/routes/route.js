const express = require("express");
const router = express.Router();
const control = require('../controllers/Api')

router.get('/api', control.all)

module.exports = router;
