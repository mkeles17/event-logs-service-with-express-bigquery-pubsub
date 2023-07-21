module.exports = function makeEventLog ({
    type,
    session_id,
    event_name,
    event_time,
    page,
    country,
    region,
    city,
    user_id
  } = {}) {

    // Type conditions
    if (!type) {
      throw new Error('Event Log must have a type.');
    }
    if (typeof(type) !== "string") {
      throw new Error('Type must be a string.');
    }

    // Session ID restrictions
    if (!session_id) {
      throw new Error('Event Log must have a session ID.');
    }
    if (typeof(session_id) !== "string") {
      throw new Error('Session ID must be a string.');
    }

    // Event Name restrictions
    if (!event_name) {
      throw new Error('Event Log must have an event name.');
    }
    if (typeof(event_name) !== "string") {
      throw new Error('Event Name must be a string.');
    }

    // Event Time restrictions
    if (!event_time) {
      throw new Error('Event Log must have an event time.');
    }
    if (typeof(event_time) !== "number") {
      throw new Error('Event Time must be a string.');
    }

    // Page restrictions
    if (!page) {
      throw new Error('Event Log must have a page.');
    }
    if(typeof(page) !== "string"){
      throw new Error('Page must be a string');
    }

    // Country restrictions
    if (!country) {
      throw new Error('Event Log must have a country');
    }
    if (typeof(country) !== "string") {
      throw new Error('Country must be a string.');
    }

    // Region restrictions
    if (!region) {
      throw new Error('Event Log must have a region.');
    }
    if (typeof(region) !== "string") {
      throw new Error('Region must be a string.');
    }

    // City restrictions
    if (!city) {
      throw new Error('Event Log must have a city.');
    }
    if (typeof(city) !== "string") {
      throw new Error('City must be a string.');
    }

    // User ID restrictions
    if (!user_id) {
      throw new Error('Event Log must have a user ID.');
    }
    if (typeof(user_id) !== 'string'){
      throw new Error('User ID must be a string.');
    }

    return Object.freeze({
      getType: () => type,
      getSessionID: () => session_id,
      getEventName: () => event_name,
      getEventTime: () => event_time,
      getPage: () => page,
      getCountry: () => country,
      getRegion: () => region,
      getCity: () => city,
      getUserID: () => user_id
    });
  };