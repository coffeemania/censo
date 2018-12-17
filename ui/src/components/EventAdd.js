import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    Image,
    Container,
    Segment,
    Divider,
    Step,
    Form,
    Icon,
    Button
} from 'semantic-ui-react';
import Dashboard from '../containers/Dashboard';


class Event extends Component {

    render() {

        return (
            <Dashboard>
                <Segment basic padded className='center aligned'>
                    <Step.Group ordered size='small'>

                        <Step completed>
                            <Step.Content>
                                <Step.Title>Загрузи фотку</Step.Title>
                                <Step.Description>Мы попробуем распознать все сами</Step.Description>
                            </Step.Content>
                        </Step>

                        <Step active>
                            <Step.Content>
                                <Step.Title>Заполни эту форму, если не прокатило</Step.Title>
                                <Step.Description>Она когда-нибудь будет работать</Step.Description>
                            </Step.Content>
                        </Step>

                        <Step>
                            <Step.Content>
                                <Step.Title>PROFIT !!!</Step.Title>
                                <Step.Description>Считай, злодей уже наказан</Step.Description>
                            </Step.Content>
                        </Step>
                    </Step.Group>
                </Segment>

                <Container>
                    <Form>

                        <Form.Group widths='equal'>
                            <Form.Field label='Регион' control='select'>
                                <option selected value='23'>23 Краснодар</option>
                            </Form.Field>
                            <Form.Field disabled label='Подразделение' control='select'>
                                <option selected value='23'>УГИБДД ГУ МВД России по Краснодарскому краю</option>
                            </Form.Field>
                        </Form.Group>

                        <Form.Group widths='equal'>
                            <Form.Input fluid label='Фамилия' placeholder='Фамилия' value='Иванов'/>
                            <Form.Input fluid label='Имя' placeholder='Имя' value='Иван'/>
                            <Form.Input fluid label='Email' placeholder='Email' value='ivanov@ivan.net'/>
                        </Form.Group>

                        <Divider hidden />

                        <Form.Group>
                            <Button size='small' color='grey'>
                                <Icon name='upload'/>Загрузить фото
                            </Button>
                        </Form.Group>

                        <Form.Group>
                            <Image.Group size='small'>
                                <Image src='/the_cat.png' />
                                <Image src='/the_cat.png' />
                                <Image src='/the_cat.png' />
                            </Image.Group>

                        </Form.Group>

                        <Form.Group widths='equal'>
                            <Form.Field label='ПДД' control='select'>
                                <option selected value='12.2'>12.2 Остановка и стоянка</option>
                            </Form.Field>
                            <Form.Field label='КОАП' control='select'>
                                <option selected value='12.19.6'>12.19.6 Нарушение правил остановки или стоянки транспортных средств</option>
                            </Form.Field>
                        </Form.Group>

                        <Form.TextArea readOnly label='Текст обращения' placeholder='этот текст генерится автоматически' />
                        <Form.Checkbox label='Я не шучу' />
                        <Form.Button>Отправить</Form.Button>

                    </Form>
                </Container>

            </Dashboard>
        );
    }
}

Event.propTypes = {};

Event.defaultProps = {};


const mapStateToProps = () => undefined;

const mapDispatchToProps = (dispatch) => ({
    // onCheckStatus: (id) => dispatch({type: 'EVENT_CHECK_STATUS', payload: {id}, referer: 'Event'})
});

export default connect(mapStateToProps, mapDispatchToProps)(Event);

