import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    List
} from 'semantic-ui-react'


class History extends Component {

    render() {

        const history = this.props.history.map((item) => (
            <List.Item>
                <List.Icon name='envelope outline' size='large' verticalAlign='middle'/>
                <List.Content>
                    <List.Header>{item.datetime}</List.Header>
                    <List.Content><code>{item.rawStatus}</code></List.Content>
                    <List size='mini'>
                        <List.Item>Дата обращения: {item.appealDate}</List.Item>
                        <List.Item>Дата регистрации: {item.acceptDate}</List.Item>
                        <List.Item>Внутренний ID провайдера: {item.genericId}</List.Item>
                        <List.Item>Внутренний номер провайдера: {item.genericNumber}</List.Item>
                    </List>
                </List.Content>
            </List.Item>
        ));

        return (
            <List divided relaxed size='large'>
                {history}
            </List>
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
