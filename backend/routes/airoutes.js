const express = require('express');
const aiController = require("../controllers/aicontrollers")

const router = express.Router();


router.post("/get-review", aiController.getReview)


module.exports = router;    