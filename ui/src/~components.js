import React from 'react';
import {connect} from 'react-redux';

const Events = () => <h3>Events</h3>;

const Event = ({eventId}) => <h3>{`Event ${eventId}`}</h3>;
const mapStateToProps = ({location}) => ({
    eventId: location.payload.id
});

const ConnectedEvent = connect(mapStateToProps)(Event);

const NotFound = () => <h3>404</h3>;

export {Events, ConnectedEvent as Event, NotFound};
