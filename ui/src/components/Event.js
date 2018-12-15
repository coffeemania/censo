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


class Event extends Component {

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
                                    <Item.Meta><a href={this.props.statusCheckUrl}>Check status</a></Item.Meta>
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
    statusCheckUrl: PropTypes.string,
    location: PropTypes.string,
    appealHistory: PropTypes.array  // TODO
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
    statusCheckUrl: '.....',
    location: '.....'
};


const mapStateToProps = ({event}) => event;

export default connect(mapStateToProps)(Event);

