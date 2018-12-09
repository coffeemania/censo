import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Dashboard from '../containers/Dashboard';


class EventList extends Component {

    componentDidMount() {
        // this.props.getEvents();
    }

    render() {

        const eventArray = Object.entries(this.props.events || {}).map(([id, event]) => (
            <tr key={id} onClick={this.props.onPickEvent.bind(null, id)}>
                <td>{id}</td>
                <td>{event.datetime}</td>
                <td>{event.location}</td>
                <td>{JSON.stringify(event.vehicle)}</td>
                <td>{event.status}</td>
                <td>{event.foreignId}</td>
            </tr>
        ));

        return (
            <Dashboard>
                <table className="ui very compact selectable celled table">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>datetime</th>
                        <th>location</th>
                        <th>Vehicle</th>
                        <th>Status</th>
                        <th>foreignId</th>
                    </tr>
                    </thead>
                    <tbody>
                        {eventArray}
                    </tbody>
                </table>
            </Dashboard>
        );
    }
}

EventList.propTypes = {
    events: PropTypes.objectOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        datetime: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        vehicle: PropTypes.object.isRequired,
        status: PropTypes.string.isRequired,
        foreignId: PropTypes.string.isRequired
    })).isRequired,
    onPickEvent: PropTypes.func.isRequired
    // getEvents: PropTypes.func.isRequired
};


const mapStateToProps = ({events}) => ({events});

const mapDispatchToProps = (dispatch) => ({
    // getEvents: () => dispatch({type: 'EVENTS'}),
    onPickEvent: (id) => dispatch({type: 'EVENT', id})
});

export default connect(mapStateToProps, mapDispatchToProps)(EventList);
