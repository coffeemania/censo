import React, {Component} from 'react';
import { Button } from 'semantic-ui-react'


class Event extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collapsed: true
        };

        this.onToggle = this.onToggle.bind(this);
    }

    onToggle() {
        this.setState((prevState /* , props */) => ({collapsed: !prevState.collapsed}));
    }


    render() {

        return (
            <tr>
                <td>{this.props.id}</td>
                <td>{this.props.title}</td>
                <td>{this.props.vehicle}</td>
                <td>{this.props.status}</td>
            </tr>
        );
    }
}

export default Event;
