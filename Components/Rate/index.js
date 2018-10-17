import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../Reducer/reducer";
import RateList from "./RateList";

function mapStateProps(state) {
  const { isToken, API_URL, TOKEN, ID, PROFILE_NAME } = state;
  return {
    isToken,
    API_URL,
    TOKEN,
    ID,
    PROFILE_NAME
  };
}

function mapDispatchToProps(dispatch) {
  return {
    _checkAuth: bindActionCreators(actionCreators._checkAuth, dispatch)
  };
}

export default connect(mapStateProps, mapDispatchToProps)(RateList);
