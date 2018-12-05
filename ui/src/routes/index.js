import EventList from '../components/EventList';
import Event from '../components/Event';
import connect from '../containers/connector';


export default [
    {
        path: '/events',
        name: 'Events',
        component: connect(EventList)
    },
    {
        path: '/event/:id',
        name: 'Event',
        component: connect(Event)
    }
];
