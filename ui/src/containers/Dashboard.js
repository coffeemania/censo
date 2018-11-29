import React, { Component } from 'react';

import Event from '../components/Event';


class Dashboard extends Component {

    render() {
        return (
            <div className="Dashboard">
                <p> Hello world!</p>
                <Event {...this.props} />
            </div>
        );
    }
}


export default Dashboard;
