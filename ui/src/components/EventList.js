import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    Container,
    Button,
    Form,
    Icon,
    Label
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
                    <Label color='green' horizontal basic>{event.status}</Label>
                </td>
                <td>{event.datetime}</td>
                <td>{event.location}</td>
                <td>
                    {event.vehicle.model} <Icon name='car' outline='true' /><strong>{event.vehicle.plate}</strong>&nbsp;&nbsp;&nbsp;
                    <Label color='grey' horizontal basic>{event.eventCount}</Label>
                </td>
                {/* <td><img src={`https://www.car72.ru/nomer/rus/${event.vehicle.plate}.png`} /></td> */}

                <td className='right aligned'><UpdateStatusButton id={id} count={event.historyCount} onCheckStatus={this.onCheckStatus}/></td>
            </tr>
        )).reverse();

        return (
            <Dashboard>
                <div>
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
                    {eventArray.length > 0 ? <EventListPagination/> : <div/>}
                </div>
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
        historyCount: PropTypes.number
    })).isRequired,
    onPickEvent: PropTypes.func.isRequired,
    onCheckStatus: PropTypes.func.isRequired
};


const mapStateToProps = ({events}) => ({events});

const mapDispatchToProps = (dispatch) => ({
    onPickEvent: (id) => dispatch({type: 'EVENT', payload: {id}}),
    onCheckStatus: (id) => dispatch({type: 'EVENT_CHECK_STATUS', payload: {id}, referer: 'EventList'})
});

export default connect(mapStateToProps, mapDispatchToProps)(EventList);
