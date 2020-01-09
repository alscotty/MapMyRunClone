import {connect} from 'react-redux'
import RoutesIndex from './routes_index';

const mstp=state=>{
    const { entities } = state;
    const { session } = state;

    return({
        currentUser: entities.users[session.id]
    })

};

const mdtp=dispatch=>({
    placeholder:null
});

export default connect(mstp,mdtp)(RoutesIndex)