export const getEvent = (state, id) => state.eventDetails[id];
export const getVehicles = (state) => state.vehicles;

export const getEvents = (state) => state.events;

export const getEventsPagination = (state) => ({
    ...state.eventsPagination
});
