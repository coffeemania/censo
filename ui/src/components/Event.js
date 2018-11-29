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
            <div>
                <p>{this.props.test}</p>
                <Button onClick={this.onClick}>Click me</Button>
            </div>
        );
    }
}

export default Event;
