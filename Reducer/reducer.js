// Import

// Actions

const API_URL = "https://localhost:8000/api";

const CHECK_AUTH = "Checking the Auth Token exist and Save the loaded Token";

// Action Creators

function _checkAuth(istoken, token, id, profile_name, image) {
  return {
    type: CHECK_AUTH,
    istoken,
    token,
    id,
    profile_name,
    image
  };
}

// Reducer

const initialState = {
  API_URL: API_URL,
  isToken: false,
  TOKEN: "",
  ID: "",
  PROFILE_NAME: "",
  IMAGE: ""
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case CHECK_AUTH:
      return _checkAuth_Reducer(
        state,
        action.istoken,
        action.token,
        action.id,
        action.profile_name,
        action.image
      );
      break;
    default:
      return state;
  }
}

// Reducer Functions

_checkAuth_Reducer = (state, istoken, token, id, profile_name, image) => {
  return {
    ...state,
    isToken: istoken,
    TOKEN: token,
    ID: id,
    PROFILE_NAME: profile_name,
    IMAGE: image
  };
};

// Export Action Creators

const actionCreators = {
  _checkAuth
};

export { actionCreators };

// Export Reducer

export default reducer;
