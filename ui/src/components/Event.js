import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    Container,
    Icon,
    Item,
    Dimmer,
    Segment,
    Loader
} from 'semantic-ui-react';
import Dashboard from '../containers/Dashboard';
import History from './History';
import UpdateStatusButton from './UpdateStatusButton';


class Event extends Component {

    constructor(props, context) {
        super(props, context);
        this.onCheckStatus = this.onCheckStatus.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps');
        console.dir(nextProps);
    }

    onCheckStatus(e, id) {
        e.stopPropagation();
        this.props.onCheckStatus(id);
    }

    render() {

        const isEmpty = !this.props.id;

        return (
            <Dashboard>
                <Container>
                    <Dimmer.Dimmable as={Segment} dimmed={isEmpty}>
                        <Dimmer active={isEmpty} inverted>
                            <Loader>Loading</Loader>
                        </Dimmer>
                        <Item.Group divided>
                            <Item>
                                <Item.Image src='/the_cat.png'/>
                                <Item.Content>
                                    <Item.Header as='a'>{this.props.vehicle.plate}</Item.Header>
                                    <Item.Meta>
                                        <span>{this.props.vehicle.model}</span>
                                    </Item.Meta>
                                    <Item.Extra>
                                        <Icon name='calendar' alternate='true' outline='true' />
                                        {this.props.datetime}
                                    </Item.Extra>
                                    <Item.Extra>
                                        <Icon name='globe' alternate='true' outline='true' />
                                        {this.props.location}
                                    </Item.Extra>
                                    <Item.Meta>
                                        <span>{this.props.status}</span>
                                    </Item.Meta>
                                </Item.Content>
                            </Item>
                            <Item>
                                <Item.Content>
                                    <Item.Header as='a'>History</Item.Header>
                                    <Item.Meta>
                                        <UpdateStatusButton id={String(this.props.id)} onCheckStatus={this.onCheckStatus}/>
                                    </Item.Meta>
                                    <Item.Description>
                                        <History history={this.props.appealHistory}/>
                                    </Item.Description>
                                </Item.Content>
                            </Item>
                        </Item.Group>
                    </Dimmer.Dimmable>
                </Container>
            </Dashboard>
        );
    }
}

Event.propTypes = {
    id: PropTypes.number,
    vehicle: PropTypes.oneOfType([
        PropTypes.objectOf({
            id: PropTypes.number,
            model: PropTypes.string,
            plate: PropTypes.string
        }),
        PropTypes.any
    ]),
    datetime: PropTypes.string,
    status: PropTypes.string,
    location: PropTypes.string,
    appealHistory: PropTypes.array,
    // appealHistory: PropTypes.arrayOf(PropTypes.shape({
    //     id: PropTypes.number.isRequired,
    //     eventId: PropTypes.number.isRequired,
    //     datetime: PropTypes.string.isRequired,
    //     appealDate: PropTypes.string.isRequired,
    //     acceptDate: PropTypes.string.isRequired,
    //     genericId: PropTypes.string.isRequired,
    //     genericNumber: PropTypes.string.isRequired,
    //     rawStatus: PropTypes.string.isRequired
    // })).isRequired(),
    onCheckStatus: PropTypes.func.isRequired
};

Event.defaultProps = {
    id: 0,
    vehicle: {
        id: 0,
        model: 'xxxxxx',
        plate: 'xXXXxxXX'
    },
    datetime: '.....',
    status: '.....',
    location: '.....',
    appealHistory: []
};


const mapStateToProps = ({event}) => event;

const mapDispatchToProps = (dispatch) => ({
    onCheckStatus: (id) => dispatch({type: 'EVENT_CHECK_STATUS', payload: {id}, referer: 'Event'})
});

export default connect(mapStateToProps, mapDispatchToProps)(Event);

