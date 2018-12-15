import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Container,
    Comment,
    Segment
} from 'semantic-ui-react'


class History extends Component {

    render() {

        const history = this.props.history.map((item) => (
            <Segment raised>
                <Comment>
                    <Comment.Avatar src='/gibdd_logo.png' />
                    <Comment.Content>
                        <Comment.Author>ГИБДД</Comment.Author>
                        <Comment.Metadata>{item.datetime}</Comment.Metadata>
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
};


History.defaultProps = {
    history: []
};

export default History;
