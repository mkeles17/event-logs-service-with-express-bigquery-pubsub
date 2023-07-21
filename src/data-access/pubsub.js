const dotenv = require('dotenv');
dotenv.config({path: '../../.env'});

module.exports = function makePubSub ({ pubSubClient }) {
    return Object.freeze({
      publish
    })

    async function publish ({dataBuffer}) {
      try {
        const messageId = await pubSubClient
          .topic(process.env.TOPIC_ID)
          .publishMessage({data: dataBuffer});
        console.log(`Message ${messageId} published.`);
        return { 
            success: true,
            message: 'Event Log was successfully posted.' 
        };
      } catch (error) {
        return { 
            success: false,
            message: error.message 
        };
      }
    }
}
