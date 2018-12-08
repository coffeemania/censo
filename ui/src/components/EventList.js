import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Dashboard from '../containers/Dashboard';


class EventList extends Component {

    render() {

        const eventArray = Object.entries(this.props.events || {}).map(([id, event]) => (
            <tr key={id} onClick={this.props.onPickEvent.bind(null, id)}>
                <td>{id}</td>
                <td>{event.title}</td>
                <td>{event.vehicle}</td>
                <td>{event.status}</td>
            </tr>
        ));

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
        date: PropTypes.instanceOf(Date).isRequired,
        title: PropTypes.string.isRequired,
        vehicle: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired
    })).isRequired,
    onPickEvent: PropTypes.func.isRequired
};


const mapStateToProps = ({events}) => ({events});

const mapDispatchToProps = (dispatch) => ({
    onPickEvent: (id) => dispatch({type: 'EVENT', payload: {id}})
});

export default connect(mapStateToProps, mapDispatchToProps)(EventList);
