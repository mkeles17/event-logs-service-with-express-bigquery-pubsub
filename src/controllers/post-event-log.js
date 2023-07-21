module.exports = function makePostEventLog ({ createEventLog }) {
    return async function postEventLog (httpRequest) {
      try {
        const eventLogInfo = httpRequest.body;
        const posted = await createEventLog({ ...eventLogInfo });
        return {
          headers: {
            'Content-Type': 'application/json',
          },
          statusCode: 201,
          body: { posted }
        };
      } catch (e) { 
        console.log(e);
        return {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 400,
          body: {
            error: e.message
          }
        };
      }
    };
};