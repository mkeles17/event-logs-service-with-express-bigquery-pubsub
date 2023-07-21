module.exports = function makeGetResults ({ listResults }) {
    return async function getResults (httpRequest) {
      const headers = {
        'Content-Type': 'application/json'
      };
      try {
        const results = await listResults();
        return {
          headers,
          statusCode: 200,
          body: results
        };
      } catch (e) {
        console.log(e);
        return {
          headers,
          statusCode: 400,
          body: {
            error: e.message
          }
        };
      }
    };
};