const express = require('express');
const router = express.Router();
const carController = require("./car.controller");


console.log("here");

router.get("", carController.getList);

module.exports = router;
