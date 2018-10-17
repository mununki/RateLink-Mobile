import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  TextInput,
  Alert,
  KeyboardAvoidingView
} from "react-native";
import DatePicker from "react-native-datepicker";

const { height, width } = Dimensions.get("window");

export default class RateInput extends React.Component {
  static navigationOptions = {
    title: "운임입력",
    headerStyle: {
      backgroundColor: "#6dbad8"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    },
    headerBackTitle: "뒤로"
  };
  state = {
    account: "",
    selectedItemsLiner: [],
    selectedItemsPol: [],
    selectedItemsPod: [],
    br20: "",
    br40: "",
    br4H: "",
    sl20: "",
    sl40: "",
    sl4H: "",
    lft: "0",
    dft: "0",
    chosenDateED: new Date(),
    chosenDateOD: new Date(),
    ed: "",
    od: "",
    rmk: "",
    isED: false,
    isOD: false,
    isSubmitInput: false
  };

  componentWillMount() {
    this._setEndofMonth();
  }

  componentDidMount() {
    this._convertDate();
  }

  render() {
    const {
      itemsLiner,
      itemsPol,
      itemsPod,
      selectedItemsLiner,
      selectedItemsPol,
      selectedItemsPod,
      isOD
    } = this.state;
    const { API_URL, TOKEN } = this.props.navigation.getParam("dataInput");
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <ScrollView style={{ flex: 1 }}>
          <View style={{ flex: 1, alignItems: "center" }}>
            <View style={styles.inputArea}>
              <TextInput
                onChangeText={text => this._controlInput("account", text)}
                placeholder="화주를 입력하세요."
                style={styles.accountInput}
                autoCapitalize="none"
                autoCorrect={false}
                underlineColorAndroid={"transparent"}
              />
              <TouchableOpacity
                style={styles.searchMainLiner}
                onPress={() =>
                  this.props.navigation.navigate("Search", {
                    dataInput: {
                      handler: "linerinput",
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
                      handler: "polinput",
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
                      handler: "podinput",
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
                    onChangeText={text => this._controlInput("br20", text)}
                    value={this.state.br20}
                    placeholder="0"
                    style={styles.rateInput}
                    autoCapitalize="none"
                    autoCorrect={false}
                    underlineColorAndroid={"transparent"}
                  />
                </View>
                <View>
                  <Text style={styles.typeFont}>40'</Text>
                  <TextInput
                    onChangeText={text => this._controlInput("br40", text)}
                    value={this.state.br40}
                    placeholder="0"
                    style={styles.rateInput}
                    autoCapitalize="none"
                    autoCorrect={false}
                    underlineColorAndroid={"transparent"}
                  />
                </View>
                <View>
                  <Text style={styles.typeFont}>40'HC</Text>
                  <TextInput
                    onChangeText={text => this._controlInput("br4H", text)}
                    value={this.state.br4H}
                    placeholder="0"
                    style={styles.rateInput}
                    autoCapitalize="none"
                    autoCorrect={false}
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
                    onChangeText={text => this._controlInput("sl20", text)}
                    value={this.state.sl20}
                    placeholder="0"
                    style={styles.rateInput}
                    autoCapitalize="none"
                    autoCorrect={false}
                    underlineColorAndroid={"transparent"}
                  />
                </View>
                <View>
                  <Text style={styles.typeFont}>40'</Text>
                  <TextInput
                    onChangeText={text => this._controlInput("sl40", text)}
                    value={this.state.sl40}
                    placeholder="0"
                    style={styles.rateInput}
                    autoCapitalize="none"
                    autoCorrect={false}
                    underlineColorAndroid={"transparent"}
                  />
                </View>
                <View>
                  <Text style={styles.typeFont}>40'HC</Text>
                  <TextInput
                    onChangeText={text => this._controlInput("sl4H", text)}
                    value={this.state.sl4H}
                    placeholder="0"
                    style={styles.rateInput}
                    autoCapitalize="none"
                    autoCorrect={false}
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
                    onChangeText={text => this._controlInput("lft", text)}
                    value={this.state.lft}
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
                    onChangeText={text => this._controlInput("dft", text)}
                    value={this.state.dft}
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
                onChangeText={text => this._controlInput("rmk", text)}
                placeholder="REMARK를 입력하세요."
                style={{
                  paddingTop: 10,
                  paddingBottom: 10,
                  backgroundColor: "white",
                  paddingLeft: 20,
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
            onPress={this._checkBlank}
            style={[styles.basicButtons, { backgroundColor: "#266d8c" }]}
          >
            {this.state.isSubmitInput ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={{ color: "white" }}>입력</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this._resetSearch}
            style={[styles.basicButtons, { backgroundColor: "white" }]}
          >
            <Text>취소</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
  _updateState = newState => {
    this.setState(newState);
  };
  _setEndofMonth = () => {
    const dted = new Date();
    let yeared = dted.getFullYear();
    let monthed = dted.getMonth();
    this.setState({
      chosenDateED: new Date(yeared, monthed + 1, 0)
    });
  };
  _convertDate = handler => {
    const dted = new Date(this.state.chosenDateED);
    const dtod = new Date(this.state.chosenDateOD);
    let yeared = dted.getFullYear();
    let yearod = dtod.getFullYear();
    let monthed = dted.getMonth() + 1;
    let monthod = dtod.getMonth() + 1;
    let dayed = dted.getDate();
    let dayod = dtod.getDate();
    if (monthed < 10) {
      monthed = "0" + monthed;
    }
    if (monthod < 10) {
      monthod = "0" + monthod;
    }
    if (dayed < 10) {
      dayed = "0" + dayed;
    }
    if (dayod < 10) {
      dayod = "0" + dayod;
    }
    this.setState({
      ed: yeared + "-" + monthed + "-" + dayed,
      od: yearod + "-" + monthod + "-" + dayod
    });
    switch (handler) {
      case "ed":
        this.setState({
          isED: false
        });
        break;
      case "od":
        this.setState({
          isOD: false
        });
        break;
    }
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
  _resetSearch = () => {
    const { navigation } = this.props;
    this.setState({
      account: "",
      selectedItemsLiner: [],
      selectedItemsPol: [],
      selectedItemsPod: [],
      br20: "",
      br40: "",
      br4H: "",
      sl20: "",
      sl40: "",
      sl4H: "",
      lft: "",
      dft: "",
      chosenDateED: new Date(),
      chosenDateOD: new Date(),
      ed: "",
      od: "",
      rmk: "",
      isED: false,
      isOD: false
    });
    navigation.navigate("Rates");
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
      this.setState({
        isSubmitInput: true
      });
      this._handleSubmit();
    }
  };
  _handleSubmit = async () => {
    const { navigation } = this.props;
    const { API_URL, TOKEN, _getRates, _updateState } = navigation.getParam(
      "dataInput"
    );
    let { br20, br40, br4H, sl20, sl40, sl4H, lft, dft } = this.state;

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

    let postData = [];
    for (ln in this.state.selectedItemsLiner) {
      for (pl in this.state.selectedItemsPol) {
        for (pd in this.state.selectedItemsPod) {
          const data = {
            inputperson: 2,
            account: this.state.account,
            liner: this.state.selectedItemsLiner[ln],
            pol: this.state.selectedItemsPol[pl],
            pod: this.state.selectedItemsPod[pd],
            buying20: br20,
            selling20: sl20,
            buying40: br40,
            selling40: sl40,
            buying4H: br4H,
            selling4H: sl4H,
            loadingFT: this.state.lft,
            dischargingFT: this.state.dft,
            effectiveDate: this.state.ed,
            offeredDate: this.state.od,
            remark: this.state.rmk
          };
          postData = [...postData, data];
        }
      }
    }
    await fetch(API_URL + "/rates/", {
      method: "POST",
      headers: {
        Authorization: "JWT " + TOKEN,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    })
      .then(response => response.json())
      .then(response => {
        _updateState({ isSearched: false, queryParams: "" });
        _getRates();
        navigation.navigate("Rates");
      })
      .catch(error => {
        console.log(error);
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
    marginTop: 5,
    width: width - 10,
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
