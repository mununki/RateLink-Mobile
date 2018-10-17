import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import PropTypes from "prop-types";

export default class ReadMore extends Component {
  constructor(props) {
    super(props);
    this.state = { nextpage: props.nextpage };
  }
  static propTypes = {
    nextpage: PropTypes.string.isRequired
  };
  render() {
    const { nextpage } = this.props;
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        {nextpage !== "nomore" ? (
          <View
            style={(style = [styles.readmore, { backgroundColor: "#FDC02F" }])}
          >
            <Text>READ MORE</Text>
          </View>
        ) : (
          <View
            style={(style = [styles.readmore, { backgroundColor: "grey" }])}
          >
            <Text style={{ color: "white" }}>NO MORE</Text>
          </View>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  readmore: {
    marginTop: 10,
    marginBottom: 30,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 5,
    alignItems: "center"
  }
});
