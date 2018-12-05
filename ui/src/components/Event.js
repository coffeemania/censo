import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dashboard from '../containers/Dashboard';

class Event extends Component {

    render() {
        return (
            <Dashboard>
                <div>This is event # {this.props.match.params.id}</div>

            </Dashboard>
        );
    }
}

Event.propTypes = {};

export default Event;
