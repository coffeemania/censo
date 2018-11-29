import {connect} from 'react-redux';

import {
    onToggle
} from '../actions';


function mapStateToProps(state) {
  return {
    events: state.events
  };
}

function mapDispatchToProps(dispatch) {
  return {
      onToggle: (msg) => dispatch(onToggle(msg))
    // ...
  };
}

export default connect(mapStateToProps, mapDispatchToProps);
