import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../Reducer/reducer";
import Login from "./Login";

function mapStateProps(state) {
  const { isToken, API_URL, TOKEN } = state;
  return {
    isToken,
    TOKEN,
    API_URL
  };
}

function mapDispatchToProps(dispatch) {
  return {
    _checkAuth: bindActionCreators(actionCreators._checkAuth, dispatch)
  };
}

export default connect(mapStateProps, mapDispatchToProps)(Login);
