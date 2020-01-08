import {connect} from 'react-redux'
import RoutesIndex from './routes_index';

const mstp=state=>({
    placeholder:null
});

const mdtp=dispatch=>({
    placeholder:null
});

export default connect(mstp,mdtp)(RoutesIndex)