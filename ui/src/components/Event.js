import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Dashboard from '../containers/Dashboard';

class Event extends Component {

    render() {
        return (
            <Dashboard>
                <div>{JSON.stringify(this.props.event)}</div>
            </Dashboard>
        );
    }
}

Event.propTypes = {
    event: PropTypes.object.isRequired
};

const mapStateToProps = ({location, events}) => {
    const eventId = location.payload.id;
    return {
        event: events[eventId]
    }
};

export default connect(mapStateToProps)(Event);

