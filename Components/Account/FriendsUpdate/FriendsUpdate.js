import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import PropTypes from "prop-types";

const { height, width } = Dimensions.get("window");

export default class FriendsUpdate extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ color: "#6dbad8", fontSize: 17 }}>업데이트 예정</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ececec"
  }
});
