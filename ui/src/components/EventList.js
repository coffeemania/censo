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

        const Events = Object.entries(this.props.events || {}).map(([id, event]) =>
            (<Event
                key={id}
                id={id}
                {...event}
            />)
        );

        return (
            <table className="ui very compact selectable celled table">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Vehicle</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                    {Events}
                </tbody>
            </table>
        );
    }
}

export default EventList;
