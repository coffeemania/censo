import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    Form
} from 'semantic-ui-react';
import Dashboard from '../containers/Dashboard';
import EventListPagination from './EventListPagination';
import EventListFilter from './EventListFilter';
import UpdateStatusButton from './UpdateStatusButton';


class EventList extends Component {

    constructor(props, context) {
        super(props, context);
        this.onCheckStatus = this.onCheckStatus.bind(this);
    }

    onCheckStatus(e, id) {
        e.stopPropagation();
        this.props.onCheckStatus(id);
    }


    render() {

        const eventArray = Object.entries(this.props.events || {}).map(([id, event]) => (
            <tr key={id} onClick={this.props.onPickEvent.bind(null, id)}>
                <td className=''>{id}</td>
                <td>
                    <button className='ui tiny basic button green' type='button'>{event.status}</button>
                </td>
                <td>{event.datetime}</td>
                <td>{event.location}</td>
                <td>{event.vehicle.model} / {event.vehicle.plate}</td>
                {/* <td><img src={`https://www.car72.ru/nomer/rus/${event.vehicle.plate}.png`} /></td> */}

                <td><UpdateStatusButton id={id} count={event.appealHistory.length} onCheckStatus={this.onCheckStatus}/></td>
            </tr>
        )).reverse();

        return (
            <Dashboard>
                <Form size='small'>
                    <table className="ui very basic selectable stackable table">
                        <thead>
                        <EventListFilter/>
                        </thead>
                        <tbody className='eventlist'>
                        {eventArray}
                        </tbody>
                    </table>
                </Form>
                <EventListPagination/>
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
        foreignId: PropTypes.string.isRequired,
        appealHistory: PropTypes.array
    })).isRequired,
    onPickEvent: PropTypes.func.isRequired,
    onCheckStatus: PropTypes.func.isRequired
};


const mapStateToProps = ({events}) => ({events});

const mapDispatchToProps = (dispatch) => ({
    onPickEvent: (id) => dispatch({type: 'EVENT', payload: {id}}),
    onCheckStatus: (id) => dispatch({type: 'EVENT_CHECK_STATUS', payload: {id}})
});

export default connect(mapStateToProps, mapDispatchToProps)(EventList);
