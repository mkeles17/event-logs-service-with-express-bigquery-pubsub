
const makeEventLog = require("../models/eventLog.js");

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
      /*
      
      const topicNameOrId = 'projects/event-log-servic-1689702608739/topics/event-logs';

      const pubSubClient = new PubSub();

      try {
        const messageId = await pubSubClient
          .topic(topicNameOrId)
          .publishMessage({data: dataBuffer});
        console.log(`Message ${messageId} published.`);
        return { 
          success: true,
          message: 'Event Log succeded.' 
        };
      } catch (error) {
        console.error(`Received error while publishing: ${error.message}`);
        process.exitCode = 1;
        return { 
          success: false,
          message: 'Event Log failed.' 
        };
      }
      */
    }
  }