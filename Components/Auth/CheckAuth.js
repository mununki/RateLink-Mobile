import React from "react";
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Button,
  AsyncStorage
} from "react-native";
import PropTypes from "prop-types";

export default class CheckAuth extends React.Component {
  componentDidMount() {
    this._checkifAuth();
  }

  render() {
    const { isToken, API_URL, _checkAuth } = this.props;
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
  _checkifAuth = async () => {
    const { _checkAuth } = this.props;
    await AsyncStorage.getItem("userToken@ratelink")
      .then(userData => {
        userData = JSON.parse(userData);
        if (userData !== null) {
          this._checkTokenExpiry(userData);
        } else {
          const istoken = false;
          const token = "";
          const id = "";
          const profile_name = "";
          const image = "";
          _checkAuth(istoken, token, id, profile_name, image);
          this.props.navigation.navigate("Auth");
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  _checkTokenExpiry = async userData => {
    const { API_URL, _checkAuth } = this.props;
    await fetch(API_URL + "/users/" + userData.id + "/", {
      headers: {
        Authorization: "JWT " + userData.token,
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(response => {
        if (response.detail) {
          const istoken = false;
          const token = "";
          const id = "";
          const profile_name = "";
          const image = "";
          _checkAuth(istoken, token, id, profile_name, image);
          this.props.navigation.navigate("Auth");
        } else {
          this._refreshToken(userData.token);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  _refreshToken = async token => {
    const { API_URL, _checkAuth } = this.props;
    const data = {
      token: token
    };
    await fetch(API_URL + "-token-refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(response => {
        const istoken = true;
        _checkAuth(
          istoken,
          response.token,
          response.user.id,
          response.user.profile.profile_name,
          response.user.profile.image
        );
        console.log(response.token);
        this.props.navigation.navigate("Rates");
      })
      .catch(error => console.log(error));
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
