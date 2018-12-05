import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Event from './Event';
import Dashboard from '../containers/Dashboard';


class EventList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collapsed: true
        };

        this.onToggle = this.onToggle.bind(this);
    }

    onToggle() {
        this.setState((prevState /* , props */) => ({collapsed: !prevState.collapsed}));
    }


    render() {

        const Events = Object.entries(this.props.events || {}).map(([id, event]) =>
            (<tr>
                <td>{id}</td>
                <td>{event.title}</td>
                <td>{event.vehicle}</td>
                <td>{event.status}</td>
            </tr>
            )
        );

        return (
            <Dashboard>
                <table className="ui very compact selectable celled table">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Vehicle</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                        {Events}
                    </tbody>
                </table>
            </Dashboard>
        );
    }
}

EventList.propTypes = {
    events: PropTypes.objectOf({

    }).isRequired
};

export default EventList;
