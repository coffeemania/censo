import React, { Component } from 'react';

import Event from '../components/Event';


class Dashboard extends Component {

    render() {

        console.log(this.props);

        return (
            <div className="Dashboard">
                <p> Hello world!</p>
                <Event {...this.props} />
            </div>
        );
    }
}


export default Dashboard;
