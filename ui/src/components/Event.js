import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Dashboard from '../containers/Dashboard';

class Event extends Component {

    render() {
        return (
            <Dashboard>
                <div>This is event # {this.props.eventId}</div>

            </Dashboard>
        );
    }
}

Event.propTypes = {
    eventId: PropTypes.string.isRequired
};

const mapStateToProps = ({location}) => ({
    eventId: location.payload.id
});

export default connect(mapStateToProps)(Event);

