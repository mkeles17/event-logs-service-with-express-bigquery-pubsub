const makeCreateEventLog = require("./create-event-log.js");
const makeListResults = require("./list-results.js");
const {pubSub, bigQuery} = require("../data-access/index.js");

const createEventLog = makeCreateEventLog({ pubSub });
const listResults = makeListResults({ bigQuery });

const eventLogService = Object.freeze({
  createEventLog,
  listResults
});

module.exports = { createEventLog, listResults }