import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../Reducer/reducer";
import CheckAuth from "./CheckAuth";

function mapStateProps(state) {
  const { isToken, API_URL, TOKEN } = state;
  return {
    isToken,
    API_URL,
    TOKEN
  };
}

function mapDispatchToProps(dispatch) {
  return {
    _checkAuth: bindActionCreators(actionCreators._checkAuth, dispatch)
  };
}

export default connect(mapStateProps, mapDispatchToProps)(CheckAuth);
