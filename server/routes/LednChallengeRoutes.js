const express = require('express');
const router = express.Router();
const controllers = require('../controllers/TokenDataController');

router.get('/getTableData', controllers.getTokenHolderData);

router.get('/getMFAOptions', controllers.getMFAOptions);

router.get('/getCountryCodes', controllers.getCountryCodes);

router.get('/getCSVFile', controllers.getCSVFile);

module.exports = router;