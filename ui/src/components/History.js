import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Container,
    Comment,
    Segment
} from 'semantic-ui-react'


class History extends Component {

    render() {

        console.dir(this.props.history);

        const history = this.props.history.reverse().map((item) => (
            <Segment key={item.id} raised>
                <Comment>
                    <Comment.Avatar src='/gibdd_logo.png' />
                    <Comment.Content>
                        <Comment.Author>{item.datetime}</Comment.Author>
                        <Comment.Metadata>Parser</Comment.Metadata>
                        <Comment.Text>{item.rawStatus}</Comment.Text>
                        <Comment.Actions>Дата обращения: {item.appealDate}</Comment.Actions>
                        <Comment.Actions>Дата регистрации: {item.acceptDate}</Comment.Actions>
                        <Comment.Actions>Внутренний ID провайдера: {item.genericId}</Comment.Actions>
                        <Comment.Actions>Внутренний номер провайдера: {item.genericNumber}</Comment.Actions>
                    </Comment.Content>
                </Comment>
            </Segment>
        ));

        return (
            <Container fluid>
                <Comment.Group>
                    {history}
                </Comment.Group>
            </Container>
        );
    }
}

// TODO
History.propTypes = {
    history: PropTypes.array
    // history: PropTypes.arrayOf(PropTypes.shape({
    //     id: PropTypes.number.isRequired,
    //     eventId: PropTypes.number.isRequired,
    //     datetime: PropTypes.string.isRequired,
    //     appealDate: PropTypes.string.isRequired,
    //     acceptDate: PropTypes.string.isRequired,
    //     genericId: PropTypes.string.isRequired,
    //     genericNumber: PropTypes.string.isRequired,
    //     rawStatus: PropTypes.string.isRequired
    // }))
};


History.defaultProps = {
    history: []
};

export default History;
