import React, { Component } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
  ScrollView,
  Modal,
  Button,
  Image,
  Alert
} from "react-native";
import PropTypes from "prop-types";
import Ionicons from "react-native-vector-icons/Ionicons";
import POLtranslator from "./POLtranslator";
import Swipeable from "react-native-swipeable";

const { height, width } = Dimensions.get("window");

export default class RateCard extends Component {
  state = {
    isDetail: false,
    leftActionActivated: false,
    leftToggle: false
  };

  static propTypes = {
    ip: PropTypes.string.isRequired,
    ac: PropTypes.string.isRequired,
    ln: PropTypes.string.isRequired,
    pl: PropTypes.string.isRequired,
    pd: PropTypes.string.isRequired,
    br20: PropTypes.number.isRequired,
    br40: PropTypes.number.isRequired,
    br4H: PropTypes.number.isRequired,
    sr20: PropTypes.number.isRequired,
    sr40: PropTypes.number.isRequired,
    sr4H: PropTypes.number.isRequired,
    lft: PropTypes.number.isRequired,
    dft: PropTypes.number.isRequired,
    ed: PropTypes.string.isRequired,
    od: PropTypes.string.isRequired,
    rm: PropTypes.string.isRequired
  };

  render() {
    const {
      id,
      ip,
      ac,
      ln,
      pl,
      pd,
      br20,
      br40,
      br4H,
      sr20,
      sr40,
      sr4H,
      lft,
      dft,
      ed,
      od,
      rm
    } = this.props;
    const { isDetail } = this.state;
    const leftContent = (
      <View
        style={[
          {
            flex: 1,
            alignItems: "flex-end",
            justifyContent: "center",
            paddingRight: 20
          },
          this.state.leftActionActivated
            ? { backgroundColor: "#6dbad8" }
            : { backgroundColor: "#AAA" }
        ]}
      >
        {this.state.leftActionActivated ? (
          <Ionicons
            name={"md-checkmark"}
            size={20}
            style={{ color: "#266d8c" }}
          />
        ) : (
          <Text />
        )}
      </View>
    );

    const rightButtons = [
      <TouchableOpacity
        onPress={this._isModify}
        style={{
          flex: 1,
          justifyContent: "center",
          paddingLeft: 21,
          backgroundColor: "#266d8c"
        }}
      >
        <Text style={{ color: "white", fontSize: 17 }}>변 경</Text>
      </TouchableOpacity>,
      <TouchableOpacity
        onPress={this._deleteRate}
        style={{
          flex: 1,
          justifyContent: "center",
          paddingLeft: 21,
          backgroundColor: "#dc3545"
        }}
      >
        <Text style={{ color: "white", fontSize: 17 }}>삭 제</Text>
      </TouchableOpacity>
    ];

    return (
      <Swipeable
        key={id}
        leftContent={leftContent}
        leftActionActivationDistance={100}
        rightButtons={rightButtons}
        onRef={ref => (this._swipeable = ref)}
        onLeftActionActivate={() =>
          this.setState({ leftActionActivated: true })
        }
        onLeftActionDeactivate={() =>
          this.setState({ leftActionActivated: false })
        }
        onLeftActionComplete={() =>
          this.setState({ leftToggle: !this.state.leftToggle })
        }
        onSwipeStart={this._disableScroll.bind(this)}
        onSwipeRelease={this._enableScroll.bind(this)}
        onRightButtonsOpenRelease={(event, gestureState, _swipeable) => {
          if (
            this.props.currentlyOpenSwipeable &&
            this.props.currentlyOpenSwipeable !== _swipeable
          ) {
            this.props.currentlyOpenSwipeable.recenter();
          }
          this.props._updateState({
            currentlyOpenSwipeable: _swipeable
          });
        }}
        onRightButtonsCloseRelease={() => {
          this.props._updateState({
            currentlyOpenSwipeable: null
          });
        }}
        style={styles.cardList}
      >
        {this._getRecordedDate(this.props.rd) ? (
          <View style={styles.recentContent} />
        ) : null}
        <View
          style={[
            styles.container,
            this.state.leftToggle
              ? { backgroundColor: "#ddf5ff" }
              : { backgroundColor: "white" }
          ]}
        >
          <TouchableWithoutFeedback onPress={this._toggleDetail}>
            <View style={{ flex: 1 }}>
              <View style={styles.r1}>
                <View style={styles.r1c1}>
                  <Text style={styles.accountFont}>{ac}</Text>
                  <Text style={styles.ipFont}>{ip}</Text>
                </View>
                <View style={styles.r1c2}>
                  <Text style={styles.edodFont}>{od.slice(5)}</Text>
                  <Text
                    style={styles.edodFont}
                    textDecorationLine="underline"
                    textDecorationColor="#6dbad8"
                  >
                    {ed.slice(5)}
                  </Text>
                </View>
                <View style={styles.r1c3}>
                  {rm !== "" ? (
                    <Ionicons
                      name={"ios-notifications"}
                      size={15}
                      color={"#ffc107"}
                    />
                  ) : null}
                </View>
              </View>
              <View style={styles.r2}>
                <View style={styles.r2c1}>
                  <Text style={styles.linerFont}>{ln}</Text>
                </View>
                <View style={styles.r2c2}>
                  <Text numberOfLines={1} style={styles.plpdFont}>
                    <POLtranslator pol={pl} />
                  </Text>
                </View>
                <View style={styles.r2c3}>
                  <Text numberOfLines={1} style={styles.plpdFont}>
                    {pd}
                  </Text>
                </View>
                <View style={styles.r2c4}>
                  <Text style={styles.rate}>
                    {br20.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </Text>
                </View>
                <View style={styles.r2c5}>
                  <Text style={styles.rate}>
                    {br40.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </Text>
                </View>
                <View style={styles.r2c6}>
                  <Text style={styles.rate}>
                    {br4H.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </Text>
                </View>
              </View>
              {isDetail ? (
                <View>
                  <View style={styles.r3}>
                    <View style={styles.r3c0} />
                    <View style={styles.r3c1}>
                      <Text style={styles.detailHeader}>L.FT</Text>
                      <Text> {lft}</Text>
                    </View>
                    <View style={styles.r3c2}>
                      <Text style={styles.detailHeader}>D.FT</Text>
                      <Text> {dft}</Text>
                    </View>
                    <View style={styles.r3c3}>
                      <Text>
                        {sr20.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </Text>
                    </View>
                    <View style={styles.r3c4}>
                      <Text>
                        {sr40.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </Text>
                    </View>
                    <View style={styles.r3c5}>
                      <Text>
                        {sr4H.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.r4}>
                    <View style={styles.r4c1} />
                    <View style={styles.r4c2}>
                      <Text style={styles.detailHeader}>REMARK</Text>
                      <Text> {rm}</Text>
                    </View>
                  </View>
                </View>
              ) : null}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Swipeable>
    );
  }
  _getRecordedDate = rd => {
    let recordedDate = rd.substring(5, 10);

    let today = new Date();
    month = today.getMonth() + 1;
    day = today.getDate();
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    today = month + "-" + day;

    return recordedDate === today;
  };
  _disableScroll() {
    this.props._scrollview.getScrollResponder().setNativeProps({
      scrollEnabled: false
    });
  }
  _enableScroll() {
    this.props._scrollview.getScrollResponder().setNativeProps({
      scrollEnabled: true
    });
  }
  _deleteRate = () => {
    const { _deleteRateState, id, PROFILE_NAME, ip } = this.props;
    if (ip === PROFILE_NAME) {
      Alert.alert("알림", "정말 삭제하시겠습니까?", [
        { text: "취소", onPress: () => console.log("cancel delete") },
        { text: "확인", onPress: () => _deleteRateState(id) }
      ]);
      this.props.navigation.navigate("Rates");
    } else {
      Alert.alert(
        "경고",
        "입력자만 삭제가 가능합니다.",
        [{ text: "확인", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }
  };
  _toggleDetail = event => {
    event.stopPropagation();
    this.setState({
      isDetail: !this.state.isDetail
    });
  };
  _isModify = () => {
    const {
      PROFILE_NAME,
      id,
      ip,
      ac,
      ln,
      pl,
      pd,
      br20,
      br40,
      br4H,
      sr20,
      sr40,
      sr4H,
      lft,
      dft,
      ed,
      od,
      rm,
      API_URL,
      TOKEN,
      _updateRate
    } = this.props;
    if (ip === PROFILE_NAME) {
      this.props.navigation.navigate("Modify", {
        dataModify: {
          id,
          ip,
          ac,
          ln,
          pl,
          pd,
          br20,
          br40,
          br4H,
          sr20,
          sr40,
          sr4H,
          lft,
          dft,
          ed,
          od,
          rm,
          API_URL,
          TOKEN,
          _updateRate,
          _swipeable: this._swipeable
        }
      });
    } else {
      Alert.alert(
        "경고",
        "입력자만 변경 가능합니다.",
        [{ text: "확인", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }
  };
}

const styles = StyleSheet.create({
  cardList: {
    flex: 1,
    width: width,
    flexDirection: "row"
  },
  container: {
    flex: 1,
    width: width,
    marginBottom: 1,
    padding: 10,
    flexDirection: "row"
  },
  recentContent: {
    position: "absolute",
    width: 5,
    height: "100%",
    backgroundColor: "#266d8c",
    zIndex: 1
  },
  r1: {
    flexDirection: "row",
    marginBottom: 5,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  r1c1: {
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  r1c2: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 80
  },
  r1c3: {
    alignItems: "flex-end",
    width: 20
  },
  r2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 3
  },
  r2c1: {
    flex: 2,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  r2c2: {
    flex: 4,
    alignItems: "flex-start",
    paddingLeft: 5,
    paddingRight: 1
  },
  r2c3: {
    flex: 4,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 1,
    paddingRight: 1
  },
  r2c4: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  r2c5: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  r2c6: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  r3: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  r3c0: {
    flex: 2
  },
  r3c1: {
    flex: 4,
    flexDirection: "row",
    alignItems: "flex-start",
    paddingLeft: 7,
    paddingRight: 1
  },
  r3c2: {
    flex: 4,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 1,
    paddingRight: 1
  },
  r3c3: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  r3c4: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  r3c5: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  r4: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  r4c1: {
    flex: 2
  },
  r4c2: {
    flex: 14,
    flexDirection: "row",
    paddingLeft: 6
  },
  detailHeader: {
    color: "white",
    backgroundColor: "#CCC",
    fontSize: 10,
    marginBottom: 3,
    paddingLeft: 3,
    paddingRight: 3
  },
  ipFont: {
    fontSize: 12,
    color: "#CCC",
    marginRight: 10
  },
  accountFont: {
    fontSize: 12,
    color: "#CCC",
    marginRight: 10
  },
  linerFont: {
    fontSize: 12,
    color: "#333"
  },
  plpdFont: {
    fontSize: 14,
    color: "#333"
  },
  edodFont: {
    fontSize: 12,
    color: "#CCC"
  },
  rate: {
    fontSize: 14,
    color: "#555"
  }
});
