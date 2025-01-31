import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import route from '../routes/route';
import * as actionsHandler from '../actions/routeActionHandler';

const mapStateToProps = state => ({
    showLoader: state.RouteReducer.showLoader,
    alertDialog: state.RouteReducer.alertDialog,
});

const mapDispatchToProps = dispatch => ({
    routeActionHandler: bindActionCreators(actionsHandler, dispatch)
});

const RouteContatiner = connect(mapStateToProps, mapDispatchToProps)(route);
export default RouteContatiner;
