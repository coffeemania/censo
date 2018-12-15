import React from 'react';
import {Button, Icon, Label} from 'semantic-ui-react';
import PropTypes from 'prop-types';


const UpdateStatusButton = ({id, count, onCheckStatus}) => count > 0 ?
    (
        <Button as='div' size='tiny' labelPosition='right' onClick={(e) => onCheckStatus(e, id)}>
            <Button basic color='green' size='tiny'>
                <Icon name='fork'/>Update
            </Button>
            <Label as='a' color='green' pointing='left'>{count}</Label>
        </Button>
    ) : (
        <Button basic color='green' size='tiny' onClick={(e) => onCheckStatus(e, id)}>
            <Icon name='fork'/>Update
        </Button>
    );

UpdateStatusButton.propTypes = {
    id: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    onCheckStatus: PropTypes.func.isRequired
};

export default UpdateStatusButton;
