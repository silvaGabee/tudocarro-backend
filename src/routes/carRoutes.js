const express = require('express')
const router = express.Router();

const carController = require('../controllers/carController');

router.get('/brands', carController.getBrands);
router.get('/models/:brandCode', carController.getModels);
router.get('/years/:brandCode/:modelCode', carController.getYears);
router.get('/details/:brandCode/:modelCode/:yearCode', carController.getCarDetails);

module.exports = router;