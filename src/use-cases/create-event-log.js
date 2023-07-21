
const makeEventLog = require("../entities/eventLog.js");

module.exports = function makeCreateEventLog ({ pubSub }) {
    return async function createEventLog (eventLogInfo) {
      const eventLog = makeEventLog(eventLogInfo)
      const currentDate = new Date();
      const data = {
        "type": eventLog.getType(),
        "session_id": eventLog.getSessionID(),
        "event_name": eventLog.getEventName(),
        "event_time": eventLog.getEventTime(),
        "page": eventLog.getPage(),
        "country": eventLog.getCountry(),
        "region": eventLog.getRegion(),
        "city": eventLog.getCity(),
        "user_id": eventLog.getUserID(),
        "date": currentDate.toISOString().split('T')[0]
      };
      const dataBuffer = Buffer.from(JSON.stringify(data));
      
      return pubSub.publish({dataBuffer});
    }
  }
