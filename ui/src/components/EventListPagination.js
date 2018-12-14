import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Pagination, Grid} from 'semantic-ui-react';


class EventsPagination extends Component {

    onPickEventsPage = (e, {activePage}) => this.props.onPickEventsPage(activePage);

    render() {

        const totalPages = this.props.total / this.props.pageSize;

        return (
            <Grid>
                <Grid.Column textAlign='center'>
                    <Pagination
                        boundaryRange={1}
                        siblingRange={1}
                        activePage={this.props.page}
                        totalPages={totalPages}
                        onPageChange={this.onPickEventsPage}
                        ellipsisItem={undefined}
                        firstItem={null}
                        lastItem={null}
                        prevItem={null}
                        nextItem={null}
                        size='mini'
                        // firstItem={this.props.first ? null : {content: <Icon name='angle double left'/>, icon: true}}
                        // lastItem={this.props.last ? null : {content: <Icon name='angle double right'/>, icon: true}}
                        // prevItem={this.props.first ? null : {content: <Icon name='angle left'/>, icon: true}}
                        // nextItem={this.props.last ? null : {content: <Icon name='angle right'/>, icon: true}}
                    />
                </Grid.Column>
            </Grid>
        );
    }
}

EventsPagination.propTypes = {
    page: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    first: PropTypes.bool.isRequired,
    last: PropTypes.bool.isRequired,
    onPickEventsPage: PropTypes.func.isRequired
};


const mapStateToProps = ({eventsPagination}) => eventsPagination;

const mapDispatchToProps = (dispatch) => ({
    onPickEventsPage: (page) => dispatch({type: 'EVENTS', page})
});

export default connect(mapStateToProps, mapDispatchToProps)(EventsPagination);
