import {connect} from 'react-redux';

import {
    onToggle
} from '../actions';


function mapStateToProps(state) {
    return {
        events: state.events,
        test: state.test
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onToggle: (msg) => dispatch(onToggle(msg))
        // ...
    };
}

export default connect(mapStateToProps, mapDispatchToProps);
