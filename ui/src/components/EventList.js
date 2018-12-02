import React, {Component} from 'react';
import Event from './Event';


class EventList extends Component {

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

        const Events = Object.entries(this.props.events || {}).map((event) =>
            (<Event
                key={event.id}
                id={event.id}
                {...event}
            />)
        );

        return (
            <div>{Events}</div>
        );
    }
}

export default EventList;
