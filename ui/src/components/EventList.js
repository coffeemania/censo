import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Dashboard from '../containers/Dashboard';


class EventList extends Component {

    render() {

        const eventArray = Object.entries(this.props.events || {}).map(([id, event]) => (
            <tr key={id} onClick={this.props.onPickEvent.bind(null, id)}>
                <td className=''>{id}</td>
                <td>
                    <button className='ui mini button green' type='button'>{event.status}</button>
                </td>
                <td>{event.datetime}</td>
                <td>{event.location}</td>
                <td>{event.vehicle.model} [{event.vehicle.plate}]</td>
                <td><a href={event.statusCheckUrl} rel='noopener noreferrer' target='_blank'>Check</a></td>
            </tr>
        ));

        return (
            <Dashboard>
                <table className="ui very basic selectable stackable table">
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
};


const mapStateToProps = ({events}) => ({events});

const mapDispatchToProps = (dispatch) => ({
    onPickEvent: (id) => dispatch({type: 'EVENT', payload: {id}})
});

export default connect(mapStateToProps, mapDispatchToProps)(EventList);
