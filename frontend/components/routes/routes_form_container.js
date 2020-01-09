import { connect } from 'react-redux'
import RoutesForm from './routes_form'

const mstp = state => ({
    placeholder: null
});

const mdtp = dispatch => ({
    placeholder: null
});

export default connect(mstp, mdtp)(RoutesForm);