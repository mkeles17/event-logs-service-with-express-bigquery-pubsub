const {
    listResults,
    createEventLog,
} = require('../use-cases/eventLogService.js');
  
const makeGetResults = require('./get-results.js');
const makePostEventLog = require('./post-event-log.js');
const notFound = require('./not-found.js');
    
const getResults = makeGetResults({ listResults })
const postEventLog = makePostEventLog({ createEventLog })
    
const eventLogController = Object.freeze({
    getResults,
    postEventLog,
    notFound
})

module.exports = eventLogController;