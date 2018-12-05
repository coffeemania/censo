import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {
    Container,
    Image,
    Menu,
    Visibility
} from 'semantic-ui-react';


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

                        <Container text>
                            <Menu.Item>
                                <Image size='tiny' src='/logo.png'/>
                            </Menu.Item>
                            <Menu.Item xheader>Events</Menu.Item>
                            <Menu.Item as='a'>Vehicles</Menu.Item>
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
    children: PropTypes.element.isRequired
};


export default Dashboard;
