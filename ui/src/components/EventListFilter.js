import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    Button,
    Icon,
    Input
} from 'semantic-ui-react';



class EventsFilter extends Component {

    onChangeFilter = (e) => {
        this.props.onChangeFilter({[e.target.id]: e.target.value});
    };

    render() {

        return (
            <tr key={-1}>
                <th><Input id='id' style={{width: '100px'}} icon='users' iconPosition='left' placeholder='id' onChange={this.onChangeFilter} value={this.props.id} /></th>
                <th />
                <th />
                <th><Input id='location' icon='users' iconPosition='left' placeholder='location' onChange={this.onChangeFilter} value={this.props.location} /></th>
                <th><Input id='vehicle' icon='users' iconPosition='left' placeholder='vehicle' onChange={this.onChangeFilter} value={this.props.vehicle}/></th>
                <th className='right aligned'>
                    <Button basic size='small' onClick={this.props.onResetFilter}>
                        <Icon name='refresh'/>Reset
                    </Button>
                </th>
            </tr>
        );
    }
}

EventsFilter.propTypes = {
    id: PropTypes.number,
    location: PropTypes.string,
    vehicle: PropTypes.string,
    onChangeFilter: PropTypes.func.isRequired,
    onResetFilter: PropTypes.func.isRequired
};

const mapStateToProps = ({eventsFilter}) => eventsFilter;

const mapDispatchToProps = (dispatch) => ({
    onChangeFilter: (where) => dispatch({type: 'EVENTS_FILTER', where}),
    onResetFilter: () => dispatch({type: 'EVENTS_FILTER'})
});

export default connect(mapStateToProps, mapDispatchToProps)(EventsFilter);
