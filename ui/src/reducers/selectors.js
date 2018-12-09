export const getEvent = (state, id) => id === state.event.id ? state.event : {};
export const getEvents = (state) => state.events;
