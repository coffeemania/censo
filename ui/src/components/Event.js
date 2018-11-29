import React, {Component} from 'react';

import {
    Button
} from 'reactstrap';


class Event extends Component {

    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    async onClick() {
        await this.props.onToggle('qwerty!');
    }

    render() {
        return (
            <Button onClick={this.onClick}>Click me</Button>
        );
    }
}

export default Event;
