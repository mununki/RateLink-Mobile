import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

export default class POLtranslator extends Component {
  render() {
    const { pol } = this.props;
    if (pol.toLowerCase() === "busan") {
      return <Text>KRPUS</Text>;
    } else if (pol.toLowerCase() === "gwangyang") {
      return <Text>KRKAN</Text>;
    } else if (pol.toLowerCase() === "incheon") {
      return <Text>KRINC</Text>;
    } else {
      return <Text>{pol}</Text>;
    }
  }
}
