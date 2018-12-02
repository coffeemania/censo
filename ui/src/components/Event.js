import React, {Component} from 'react';
import { Button } from 'semantic-ui-react'


class Event extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collapsed: true
        };

        this.onToggle = this.onToggle.bind(this);
    }

    onToggle() {
        this.setState((prevState /* , props */) => ({collapsed: !prevState.collapsed}));
    }


    render() {

        return (
            <div>
                <Button className='ui basic Button' role='Button'>
                    Standard
                </Button>
                <Button className='ui red basic Button' role='Button'>
                    Red
                </Button>
                <Button className='ui orange basic Button' role='Button'>
                    Orange
                </Button>
                <Button className='ui yellow basic Button' role='Button'>
                    Yellow
                </Button>
                <Button className='ui olive basic Button' role='Button'>
                    Olive
                </Button>
                <Button className='ui green basic Button' role='Button'>
                    Green
                </Button>
                <Button className='ui teal basic Button' role='Button'>
                    Teal
                </Button>
                <Button className='ui blue basic Button' role='Button'>
                    Blue
                </Button>
                <Button className='ui violet basic Button' role='Button'>
                    Violet
                </Button>
                <Button className='ui purple basic Button' role='Button'>
                    Purple
                </Button>
                <Button className='ui pink basic Button' role='Button'>
                    Pink
                </Button>
                <Button className='ui brown basic Button' role='Button'>
                    Brown
                </Button>
                <Button className='ui grey basic Button' role='Button'>
                    Grey
                </Button>
                <Button className='ui black basic Button' role='Button'>
                    Black
                </Button>
            </div>
        );
    }
}

export default Event;
