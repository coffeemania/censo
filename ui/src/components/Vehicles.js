import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Dashboard from '../containers/Dashboard';


class EventList extends Component {

    render() {

        const vehicleArray = Object.entries(this.props.vehicles || {}).map(([id, vehicle]) => (
            <tr key={id} onClick={this.props.onPickVehicle.bind(null, id)}>
                <td>{id}</td>
                <td>{vehicle.model || 'неизвестно'}</td>
                <td>{vehicle.plate || 'не установлен'}</td>
            </tr>
        ));

        return (
            <Dashboard>
                <table className="ui very compact selectable celled table">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Model</th>
                        <th>Plate</th>
                    </tr>
                    </thead>
                    <tbody>
                        {vehicleArray}
                    </tbody>
                </table>
            </Dashboard>
        );
    }
}

EventList.propTypes = {
    vehicles: PropTypes.objectOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        model: PropTypes.string,
        plate: PropTypes.string
    })).isRequired,
    onPickVehicle: PropTypes.func.isRequired
};

// Dashboard.defaultProps = {
//     model: 'неизвестно',
//     plate: 'не установлен'
// };


const mapStateToProps = ({vehicles}) => ({vehicles});

const mapDispatchToProps = (dispatch) => ({
    onPickVehicle: (id) => dispatch({type: 'VEHICLE', payload: {id}})
});

export default connect(mapStateToProps, mapDispatchToProps)(EventList);
