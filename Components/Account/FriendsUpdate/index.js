import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../Reducer/reducer";
import FriendsUpdate from "./FriendsUpdate";

function mapStateProps(state) {
  const { isToken, API_URL, TOKEN, ID, PROFILE_NAME, IMAGE } = state;
  return {
    isToken,
    API_URL,
    TOKEN,
    ID,
    PROFILE_NAME,
    IMAGE
  };
}

function mapDispatchToProps(dispatch) {
  return {
    _checkAuth: bindActionCreators(actionCreators._checkAuth, dispatch)
  };
}

export default connect(
  mapStateProps,
  mapDispatchToProps
)(FriendsUpdate);
