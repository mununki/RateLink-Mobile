import React, { Component } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  TextInput,
  ScrollView,
  Modal,
  Button,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator
} from "react-native";
import PropTypes from "prop-types";
import DatePicker from "react-native-datepicker";

const { height, width } = Dimensions.get("window");

export default class RateCard extends Component {
  static navigationOptions = {
    title: "운임변경",
    headerStyle: {
      backgroundColor: "#6dbad8"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };
  state = {
    account: "",
    selectedItemsLiner: [],
    selectedItemsPol: [],
    selectedItemsPod: [],
    temp: [],
    br20: 0,
    br40: 0,
    br4H: 0,
    sl20: 0,
    sl40: 0,
    sl4H: 0,
    lft: 0,
    dft: 0,
    chosenDateED: new Date(),
    chosenDateOD: new Date(),
    ed: "",
    od: "",
    rmk: "",
    isED: false,
    isOD: false,
    isSubmitModify: false,
    isSubmitDelete: false
  };

  componentWillMount() {
    this._setSelectedItems();
  }

  render() {
    const { API_URL, TOKEN, _swipeable } = this.props.navigation.getParam(
      "dataModify"
    );
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <ScrollView style={{ flex: 1 }}>
          <View style={{ flex: 1, alignItems: "center" }}>
            <View style={styles.inputArea}>
              <TextInput
                value={this.state.account}
                onChangeText={text => this._controlInput("account", text)}
                style={styles.accountInput}
                autoCorrect={false}
                autoCapitalize="none"
                underlineColorAndroid={"transparent"}
              />
              <TouchableOpacity
                style={styles.searchMainLiner}
                onPress={() =>
                  this.props.navigation.navigate("Search", {
                    dataInput: {
                      handler: "linermodify",
                      selected: this.state.selectedItemsLiner,
                      API_URL,
                      TOKEN,
                      _updateState: this._updateState
                    }
                  })
                }
              >
                <Text numberOfLines={1}>
                  <Text style={{ color: "#6dbad8", fontWeight: "bold" }}>
                    선사 ({this.state.selectedItemsLiner.length})
                  </Text>
                  {this.state.selectedItemsLiner.map(
                    (item, key) => `  ${item}`
                  )}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.searchMainPol}
                onPress={() =>
                  this.props.navigation.navigate("Search", {
                    dataInput: {
                      handler: "polmodify",
                      selected: this.state.selectedItemsPol,
                      API_URL,
                      TOKEN,
                      _updateState: this._updateState
                    }
                  })
                }
              >
                <Text
                  style={{
                    color: "#6dbad8",
                    fontWeight: "bold",
                    marginBottom: 5
                  }}
                >
                  선적지 ({this.state.selectedItemsPol.length})
                </Text>
                <View style={{ flexDirection: "column" }}>
                  {this.state.selectedItemsPol.map((item, key) => (
                    <Text
                      key={key}
                      style={{
                        fontSize: 22
                      }}
                    >
                      {item}
                    </Text>
                  ))}
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.searchMainPod}
                onPress={() =>
                  this.props.navigation.navigate("Search", {
                    dataInput: {
                      handler: "podmodify",
                      selected: this.state.selectedItemsPod,
                      API_URL,
                      TOKEN,
                      _updateState: this._updateState
                    }
                  })
                }
              >
                <Text
                  style={{
                    color: "#6dbad8",
                    fontWeight: "bold",
                    marginBottom: 5
                  }}
                >
                  도착지 ({this.state.selectedItemsPod.length})
                </Text>
                <View style={{ flexDirection: "column" }}>
                  {this.state.selectedItemsPod.map((item, key) => (
                    <Text
                      key={key}
                      style={{
                        fontSize: 22
                      }}
                    >
                      {item}
                    </Text>
                  ))}
                </View>
              </TouchableOpacity>
              <Text style={{ color: "#6dbad8", marginTop: 5, marginBottom: 5 }}>
                BUYING
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  backgroundColor: "white",
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 5
                }}
              >
                <View>
                  <Text style={styles.typeFont}>20'</Text>
                  <TextInput
                    value={`${this.state.br20}`}
                    onChangeText={text => this._controlInput("br20", text)}
                    style={styles.rateInput}
                    autoCorrect={false}
                    autoCapitalize="none"
                    underlineColorAndroid={"transparent"}
                  />
                </View>
                <View>
                  <Text style={styles.typeFont}>40'</Text>
                  <TextInput
                    value={`${this.state.br40}`}
                    onChangeText={text => this._controlInput("br40", text)}
                    style={styles.rateInput}
                    autoCorrect={false}
                    autoCapitalize="none"
                    underlineColorAndroid={"transparent"}
                  />
                </View>
                <View>
                  <Text style={styles.typeFont}>40'HC</Text>
                  <TextInput
                    value={`${this.state.br4H}`}
                    onChangeText={text => this._controlInput("br4H", text)}
                    style={styles.rateInput}
                    autoCorrect={false}
                    autoCapitalize="none"
                    underlineColorAndroid={"transparent"}
                  />
                </View>
              </View>
              <Text style={{ color: "#6dbad8", marginTop: 5, marginBottom: 5 }}>
                SELLING
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 10,
                  backgroundColor: "white",
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 5
                }}
              >
                <View>
                  <Text style={styles.typeFont}>20'</Text>
                  <TextInput
                    value={`${this.state.sl20}`}
                    onChangeText={text => this._controlInput("sl20", text)}
                    style={styles.rateInput}
                    autoCorrect={false}
                    autoCapitalize="none"
                    underlineColorAndroid={"transparent"}
                  />
                </View>
                <View>
                  <Text style={styles.typeFont}>40'</Text>
                  <TextInput
                    value={`${this.state.sl40}`}
                    onChangeText={text => this._controlInput("sl40", text)}
                    style={styles.rateInput}
                    autoCorrect={false}
                    autoCapitalize="none"
                    underlineColorAndroid={"transparent"}
                  />
                </View>
                <View>
                  <Text style={styles.typeFont}>40'HC</Text>
                  <TextInput
                    value={`${this.state.sl4H}`}
                    onChangeText={text => this._controlInput("sl4H", text)}
                    style={styles.rateInput}
                    autoCorrect={false}
                    autoCapitalize="none"
                    underlineColorAndroid={"transparent"}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingTop: 5,
                  paddingLeft: 20,
                  paddingRight: 20,
                  backgroundColor: "white",
                  borderBottomWidth: 1,
                  borderColor: "#DDD"
                }}
              >
                <View style={{ alignItems: "flex-start" }}>
                  <Text style={{ color: "#6dbad8" }}>선적지F/T</Text>
                  <TextInput
                    value={`${this.state.lft}`}
                    onChangeText={text => this._controlInput("lft", text)}
                    style={{
                      backgroundColor: "white",
                      width: 40,
                      borderBottomWidth: 2,
                      borderColor: "#6dbad8"
                    }}
                    autoCapitalize="none"
                    autoCorrect={false}
                    underlineColorAndroid={"transparent"}
                  />
                </View>
                <View style={{ alignItems: "center" }}>
                  <Text style={{ color: "#6dbad8" }}>도착지F/T</Text>
                  <TextInput
                    value={`${this.state.dft}`}
                    onChangeText={text => this._controlInput("dft", text)}
                    style={{
                      backgroundColor: "white",
                      width: 40,
                      borderBottomWidth: 2,
                      borderColor: "#6dbad8"
                    }}
                    autoCapitalize="none"
                    autoCorrect={false}
                    underlineColorAndroid={"transparent"}
                  />
                </View>
                <View style={{ alignItems: "center" }}>
                  <Text style={{ color: "#6dbad8" }}>유효일</Text>
                  <DatePicker
                    style={{ width: 100 }}
                    showIcon={false}
                    date={this.state.ed}
                    locale={"ko"}
                    mode="date"
                    androidMode="spinner"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    confirmBtnText="확인"
                    cancelBtnText="취소"
                    customStyles={{
                      dateInput: {
                        borderWidth: 0,
                        padding: 0,
                        margin: 0
                      },
                      dateText: {
                        padding: 0,
                        margin: 0
                      }
                    }}
                    onDateChange={date => {
                      this.setState({ ed: date });
                    }}
                  />
                </View>
                <View style={{ alignItems: "center" }}>
                  <Text style={{ color: "#6dbad8" }}>견적일</Text>
                  <DatePicker
                    style={{ width: 100 }}
                    showIcon={false}
                    date={this.state.od}
                    locale={"ko"}
                    mode="date"
                    androidMode="spinner"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    confirmBtnText="확인"
                    cancelBtnText="취소"
                    customStyles={{
                      dateInput: {
                        borderWidth: 0,
                        padding: 0,
                        margin: 0
                      },
                      dateText: {
                        padding: 0,
                        margin: 0
                      }
                    }}
                    onDateChange={date => {
                      this.setState({ od: date });
                    }}
                  />
                </View>
              </View>
              <TextInput
                value={this.state.rmk}
                onChangeText={text => this._controlInput("rmk", text)}
                placeholder="REMARK를 입력하세요."
                style={{
                  paddingTop: 10,
                  paddingBottom: 10,
                  backgroundColor: "white",
                  paddingLeft: 10,
                  marginBottom: 20
                }}
                autoCorrect={false}
                autoCapitalize="none"
                underlineColorAndroid={"transparent"}
              />
            </View>
          </View>
        </ScrollView>
        <View style={styles.saveButtons}>
          <TouchableOpacity
            onPress={() =>
              Alert.alert("알림", "변경하시겠습니까?", [
                { text: "취소", onPress: () => console.log("cancel modify") },
                { text: "확인", onPress: this._checkBlank }
              ])
            }
            style={[styles.basicButtons, { backgroundColor: "#266d8c" }]}
          >
            {this.state.isSubmitModify ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={{ color: "white" }}>변경</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              _swipeable.recenter();
              this.props.navigation.navigate("Rates");
            }}
            style={[styles.basicButtons, { backgroundColor: "white" }]}
          >
            <Text>닫기</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
  _updateState = newState => {
    this.setState(newState);
  };
  _controlInput = (handler, text) => {
    const onlyNumber = new RegExp("^[0-9]+$");

    switch (handler) {
      case "account":
        this.setState({
          [handler]: text
        });
        break;
      case "rmk":
        this.setState({
          [handler]: text
        });
        break;
      default:
        console.log(text);
        if (onlyNumber.test(text) || text === "") {
          this.setState({
            [handler]: text
          });
        } else {
          this.setState({
            [handler]: text
          });
          Alert.alert("경고", "숫자만 입력이 가능합니다.", [
            { text: "확인", onPress: () => this.setState({ [handler]: "" }) }
          ]);
        }
    }
  };
  _checkBlank = () => {
    if (
      this.state.account === "" ||
      this.state.selectedItemsLiner.length < 1 ||
      this.state.selectedItemsPol.length < 1 ||
      this.state.selectedItemsPod.length < 1
    ) {
      Alert.alert("알림", "필수 정보가 입력되지 않았습니다.", [
        { text: "확인" }
      ]);
    } else {
      this._handleSubmit();
      this.setState({
        isSubmitModify: true
      });
    }
  };
  _handleSubmit = async () => {
    const { navigation } = this.props;
    const { API_URL, TOKEN, id, _updateRate, _swipeable } = navigation.getParam(
      "dataModify"
    );
    let { br20, br40, br4H, sl20, sl40, sl4H, lft, dft } = this.state;
    _swipeable.recenter();
    if (br20 === "") {
      br20 = "0";
    }
    if (br40 === "") {
      br40 = "0";
    }
    if (br4H === "") {
      br4H = "0";
    }
    if (sl20 === "") {
      sl20 = "0";
    }
    if (sl40 === "") {
      sl40 = "0";
    }
    if (sl4H === "") {
      sl4H = "0";
    }
    if (lft === "") {
      lft = "0";
    }
    if (dft === "") {
      dft = "0";
    }

    const postData = {
      inputperson: 2,
      account: this.state.account,
      liner: this.state.selectedItemsLiner[0],
      pol: this.state.selectedItemsPol[0],
      pod: this.state.selectedItemsPod[0],
      buying20: br20,
      selling20: sl20,
      buying40: br40,
      selling40: sl40,
      buying4H: br4H,
      selling4H: sl4H,
      loadingFT: lft,
      dischargingFT: dft,
      effectiveDate: this.state.ed,
      offeredDate: this.state.od,
      remark: this.state.rmk
    };
    await fetch(API_URL + "/rates/" + id + "/", {
      method: "PATCH",
      headers: {
        Authorization: "JWT " + TOKEN,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    })
      .then(response => response.json())
      .then(response => {
        if (!response.detail) {
          _updateRate(id);
        }
        navigation.navigate("Rates");
      })
      .catch(error => {
        console.log(error);
      });
  };
  _setSelectedItems = () => {
    const { navigation } = this.props;
    const {
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
    } = navigation.getParam("dataModify");
    this.setState({
      account: ac,
      br20: br20,
      br40: br40,
      br4H: br4H,
      sl20: sr20,
      sl40: sr40,
      sl4H: sr4H,
      lft: lft,
      dft: dft,
      rmk: rm,
      itemsPol: [{ name: pl }],
      itemsPod: [{ name: pd }],
      selectedItemsLiner: [ln],
      selectedItemsPol: [pl],
      selectedItemsPod: [pd],
      ed: ed,
      od: od
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ececec",
    justifyContent: "center",
    alignItems: "center"
  },
  inputArea: {
    flex: 1,
    backgroundColor: "#ececec",
    width: width - 10
  },
  saveButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: width,
    height: 50
  },
  accountInput: {
    width: width - 10,
    marginTop: 5,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "white",
    paddingLeft: 20,
    fontSize: 15,
    borderBottomWidth: 1,
    borderColor: "#DDD"
  },
  rateInput: {
    paddingTop: 10,
    marginBottom: 10,
    backgroundColor: "white",
    width: 80,
    borderBottomWidth: 2,
    borderColor: "#6dbad8"
  },
  basicButtons: {
    width: 70,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  },
  searchMainLiner: {
    width: width - 10,
    borderBottomWidth: 1,
    borderColor: "#DDD",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "white"
  },
  searchMainPol: {
    width: width - 10,
    borderBottomWidth: 1,
    borderColor: "#DDD",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: 10,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "white"
  },
  searchMainPod: {
    width: width - 10,
    borderBottomWidth: 1,
    borderColor: "#DDD",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: 10,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "white"
  },
  typeFont: {
    color: "#CCC"
  }
});
