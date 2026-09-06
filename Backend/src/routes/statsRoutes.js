const express = require('express');
const router = express.Router();
const { getTableCountsController } = require('../controllers/statsController');

router.get('/counts', getTableCountsController);

module.exports = router;
