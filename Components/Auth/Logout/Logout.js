import React from "react";
import { View, Text, AsyncStorage } from "react-native";
import PropTypes from "prop-types";

export default class LogoutScreen extends React.Component {
  componentDidMount() {
    this._logout();
  }
  render() {
    return (
      <View>
        <Text>로그아웃!</Text>
      </View>
    );
  }
  _logout = async () => {
    const { _checkAuth } = this.props;
    await AsyncStorage.clear()
      .then(response => {
        console.log(response);
        const istoken = false;
        const token = "";
        _checkAuth(istoken, token);
        this.props.navigation.navigate("Auth");
      })
      .catch(error => {
        console.log(error);
      });
  };
}
