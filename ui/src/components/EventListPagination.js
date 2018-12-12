import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Pagination, Grid, Icon} from 'semantic-ui-react';


class EventsPagination extends Component {

    onPickEventsPage = (e, {activePage}) => this.props.onPickEventsPage(activePage);

    render() {

        return (
            <Grid>
                <Grid.Column floated='right' width={5}>
                    <Pagination
                        boundaryRange={0}
                        activePage={this.props.eventsPagination.page}
                        onPageChange={this.onPickEventsPage}
                        ellipsisItem={null}
                        firstItem={{content: <Icon name='angle double left'/>, icon: true}}
                        lastItem={{content: <Icon name='angle double right'/>, icon: true}}
                        prevItem={{content: <Icon name='angle left'/>, icon: true}}
                        nextItem={{content: <Icon name='angle right'/>, icon: true}}
                        siblingRange={1}
                        totalPages={10}
                    />
                </Grid.Column>
            </Grid>
        );
    }
}

EventsPagination.propTypes = {
    eventsPagination: PropTypes.objectOf(PropTypes.shape({
        page: PropTypes.number.isRequired,
    })).isRequired,
    onPickEventsPage: PropTypes.func.isRequired
};


const mapStateToProps = ({events, eventsPagination}) => ({events, eventsPagination});

const mapDispatchToProps = (dispatch) => ({
    onPickEventsPage: (page) => dispatch({type: 'EVENTS', page})
});

export default connect(mapStateToProps, mapDispatchToProps)(EventsPagination);
