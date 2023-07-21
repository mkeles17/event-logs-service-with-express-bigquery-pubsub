const express = require('express');
const router = express.Router();
const makeCallback = require('../express-callback/index.js');

const eventLogController = require('../controllers/eventLogController');

//Get aggregated results
router.get('/event-logs', makeCallback(eventLogController.getResults));

//Post the event log 
router.post('/event-logs', makeCallback(eventLogController.postEventLog));

module.exports = router;