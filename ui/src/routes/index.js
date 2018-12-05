import Dashboard from '../containers/Dashboard';
import connect from '../containers/connector';


export default [
    {
        path: '/',
        name: 'Home',
        component: connect(Dashboard)
    }
];
