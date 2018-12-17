import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {
    Button,
    Container,
    Icon,
    Image,
    Menu,
    Visibility
} from 'semantic-ui-react';
import connect from 'react-redux/es/connect/connect';


class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.menuStyle = {
            border: 'none',
            borderRadius: 0,
            boxShadow: 'none',
            marginBottom: '1em',
            transition: 'box-shadow 1.5s ease, padding 1.5s ease'
        };

        this.fixedMenuStyle = {
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)'
        };

        this.state = {
            menuFixed: false
        };
    }

    stickTopMenu = () => this.setState({menuFixed: true});

    unStickTopMenu = () => this.setState({menuFixed: false});


    render() {

        return (
            <div>
                <Visibility onBottomPassed={this.stickTopMenu} onBottomVisible={this.unStickTopMenu} once={false}>
                    <Menu borderless fixed={this.state.menuFixed ? 'top' : undefined}
                          style={this.state.menuFixed ? this.fixedMenuStyle : this.menuStyle}>

                        <Container>
                            <Menu.Item>
                                <Image size='tiny' src='/logo.png'/>
                            </Menu.Item>
                            <Menu.Item xheader='true' onClick={this.props.onClickEvents}>Events</Menu.Item>
                            <Menu.Item as='a' onClick={this.props.onClickVehicles}>Vehicles</Menu.Item>

                            <Menu.Menu position='right'>
                                <Menu.Item>
                                    <Button className='right aligned' color='green' size='small' onClick={this.props.onAddEvent}>
                                        <Icon name='add square'/>Add event
                                    </Button>
                                </Menu.Item>
                            </Menu.Menu>

                        </Container>

                    </Menu>
                </Visibility>

                <Container>
                    {this.props.children}
                </Container>
            </div>
        );
    }
}


Dashboard.propTypes = {
    // eventCount: PropTypes.number,
    // vehicleCount: PropTypes.number,
    children: PropTypes.element.isRequired,
    onClickEvents: PropTypes.func.isRequired,
    onClickVehicles: PropTypes.func.isRequired,
    onAddEvent: PropTypes.func.isRequired
};

Dashboard.defaultProps = {
    // eventCount: 0,
    // vehicleCount: 0
};


const mapStateToProps = ({events, vehicles}) => ({
    eventCount: Object.keys(events).length,
    vehicleCount: Object.keys(vehicles).length
});

const mapDispatchToProps = (dispatch) => ({
    onClickEvents: () => dispatch({type: 'EVENTS'}),
    onClickVehicles: () => dispatch({type: 'VEHICLES'}),
    onAddEvent: () => dispatch({type: 'EVENT_ADD'})
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
