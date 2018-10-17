import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Button,
  ActivityIndicator,
  Platform,
  Modal,
  Dimensions,
  RefreshControl,
  TextInput
} from "react-native";
import RateCard from "./RateCard";
import ReadMore from "./ReadMore";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import DatePicker from "react-native-datepicker";

const { height, width } = Dimensions.get("window");

export default class RateSearchMain extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "검색",
    headerStyle: {
      backgroundColor: "#6dbad8"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  });
  state = {
    selectedItemsInputperson: [],
    selectedItemsAccount: [],
    selectedItemsLiner: [],
    selectedItemsPol: [],
    selectedItemsPod: [],
    search_from: "",
    search_to: "",
    chosenDateSF: new Date(),
    chosenDateST: new Date(),
    isSTOn: false,
    isSubmitSearch: false
  };
  componentWillMount() {
    this._setFirstofLastMonth();
  }
  componentDidMount() {
    const { paramsDetail } = this.props.navigation.getParam("dataSearch");
    this._convertDate();
    if (paramsDetail.ip.length > 0) {
      this.setState({
        selectedItemsInputperson: [...paramsDetail.ip]
      });
      console.log(paramsDetail.ip);
    }
    if (paramsDetail.ac.length > 0) {
      this.setState({
        selectedItemsAccount: [...paramsDetail.ac]
      });
    }
    if (paramsDetail.ln.length > 0) {
      this.setState({
        selectedItemsLiner: [...paramsDetail.ln]
      });
    }
    if (paramsDetail.pl.length > 0) {
      this.setState({
        selectedItemsPol: [...paramsDetail.pl]
      });
    }
    if (paramsDetail.pd.length > 0) {
      this.setState({
        selectedItemsPod: [...paramsDetail.pd]
      });
    }
    if (paramsDetail.sf !== "") {
      this.setState({
        search_from: paramsDetail.sf
      });
    }
    if (paramsDetail.st !== "") {
      this.setState({
        search_to: paramsDetail.st
      });
    }
    if (paramsDetail.isSTOn) {
      this.setState({
        isSTOn: true
      });
    }
  }

  render() {
    const { API_URL, TOKEN } = this.props.navigation.getParam("dataSearch");
    return (
      <View style={styles.modal}>
        <View style={styles.search}>
          <View
            style={{
              width: width - 10,
              marginLeft: 5,
              backgroundColor: "white"
            }}
          >
            <TouchableOpacity
              style={styles.searchMainLiner}
              onPressOut={() =>
                this.props.navigation.navigate("Search", {
                  dataInput: {
                    handler: "liner",
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
                {this.state.selectedItemsLiner.map((item, key) => `  ${item}`)}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.searchMainPol}
              onPressOut={() =>
                this.props.navigation.navigate("Search", {
                  dataInput: {
                    handler: "pol",
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
              onPressOut={() =>
                this.props.navigation.navigate("Search", {
                  dataInput: {
                    handler: "pod",
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
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                backgroundColor: "#ececec"
              }}
            >
              <View style={{ flexDirection: "column" }}>
                <Text
                  style={{
                    color: "#6dbad8",
                    marginTop: 5
                  }}
                >
                  유효기간(시작)
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <MaterialIcons name={"check-box"} size={20} />
                  <DatePicker
                    style={{ width: 100 }}
                    showIcon={false}
                    date={this.state.search_from}
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
                      this.setState({ search_from: date });
                    }}
                  />
                </View>
              </View>
              <View style={{ flexDirection: "column" }}>
                <Text
                  style={{
                    color: "#6dbad8",
                    marginTop: 5
                  }}
                >
                  유효기간(끝)
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TouchableOpacity
                    onPressOut={() => {
                      this.setState({ isSTOn: !this.state.isSTOn });
                    }}
                  >
                    {this.state.isSTOn ? (
                      <MaterialIcons name={"check-box"} size={20} />
                    ) : (
                      <MaterialIcons
                        name={"check-box-outline-blank"}
                        size={20}
                      />
                    )}
                  </TouchableOpacity>
                  {this.state.isSTOn ? (
                    <DatePicker
                      style={{ width: 100 }}
                      showIcon={false}
                      date={this.state.search_to}
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
                        this.setState({ search_to: date });
                      }}
                    />
                  ) : (
                    <TouchableOpacity
                      onPressOut={() => {
                        this.setState({ isSTOn: true });
                      }}
                    >
                      <Text style={{ padding: 12 }}>YY-MM-DD</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={styles.searchMainInputperson}
              onPressOut={() =>
                this.props.navigation.navigate("Search", {
                  dataInput: {
                    handler: "inputperson",
                    selected: this.state.selectedItemsInputperson,
                    API_URL,
                    TOKEN,
                    _updateState: this._updateState
                  }
                })
              }
            >
              <Text numberOfLines={1}>
                <Text style={{ color: "#6dbad8", fontWeight: "bold" }}>
                  입력자 ({this.state.selectedItemsInputperson.length})
                </Text>
                {this.state.selectedItemsInputperson.map(
                  (item, key) => `  ${item}`
                )}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.searchMainAccount}
              onPressOut={() =>
                this.props.navigation.navigate("Search", {
                  dataInput: {
                    handler: "account",
                    selected: this.state.selectedItemsAccount,
                    API_URL,
                    TOKEN,
                    _updateState: this._updateState
                  }
                })
              }
            >
              <Text numberOfLines={1}>
                <Text style={{ color: "#6dbad8", fontWeight: "bold" }}>
                  화주 ({this.state.selectedItemsAccount.length})
                </Text>
                {this.state.selectedItemsAccount.map(
                  (item, key) => `  ${item}`
                )}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.modalButtons}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={[styles.basicButtons, { backgroundColor: "white" }]}
          >
            <Text>취소</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this._handleSubmit}
            style={[styles.basicButtons, { backgroundColor: "#266d8c" }]}
          >
            {this.state.isSubmitSearch ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={{ color: "white" }}>검색</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this._resetSearch}
            style={[styles.basicButtons, { backgroundColor: "white" }]}
          >
            <Text>초기화</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  _updateState = newState => {
    this.setState(newState);
  };
  _handleSubmit = () => {
    const { _updateParams } = this.props.navigation.getParam("dataSearch");
    const {
      selectedItemsInputperson,
      selectedItemsAccount,
      selectedItemsLiner,
      selectedItemsPol,
      selectedItemsPod,
      search_from,
      search_to,
      isSTOn
    } = this.state;
    this.setState({
      isSubmitSearch: true
    });
    let totalParams = {};
    if (selectedItemsInputperson.length > 0) {
      totalParams.inputperson = selectedItemsInputperson;
    }
    if (selectedItemsAccount.length > 0) {
      totalParams.account = selectedItemsAccount;
    }
    if (selectedItemsLiner.length > 0) {
      totalParams.liner = selectedItemsLiner;
    }
    if (selectedItemsPol.length > 0) {
      totalParams.pol = selectedItemsPol;
    }
    if (selectedItemsPod.length > 0) {
      totalParams.pod = selectedItemsPod;
    }
    totalParams.search_from = search_from;
    if (isSTOn) {
      totalParams.search_to = search_to;
    }
    const Params = Object.keys(totalParams)
      .map(k => {
        if (Array.isArray(totalParams[k])) {
          return (
            `${encodeURIComponent(k)}=` +
            totalParams[k].map(val => `${encodeURIComponent(val)}`).join("|")
          );
        }

        return `${encodeURIComponent(k)}=${encodeURIComponent(totalParams[k])}`;
      })
      .join("&");
    _updateParams({
      isSearched: true,
      currentlyOpenSwipeable: null,
      queryParams: Params,
      paramsDetail: {
        ip: selectedItemsInputperson,
        ac: selectedItemsAccount,
        ln: selectedItemsLiner,
        pl: selectedItemsPol,
        pd: selectedItemsPod,
        sf: search_from,
        st: search_to,
        isSTOn: isSTOn
      }
    });
    this.props.navigation.goBack();
  };
  _resetSearch = () => {
    const { _updateParams } = this.props.navigation.getParam("dataSearch");
    this.setState({
      selectedItemsInputperson: [],
      selectedItemsAccount: [],
      selectedItemsLiner: [],
      selectedItemsPol: [],
      selectedItemsPod: []
    });
    _updateParams({
      isSearched: false,
      queryParams: "",
      paramsDetail: {
        ip: [],
        ac: [],
        ln: [],
        pl: [],
        pd: [],
        sf: "",
        st: "",
        isSTOn: false
      }
    });
    this.props.navigation.goBack();
  };
  _getDistinctValue = async (url, handler, text) => {
    const { API_URL, TOKEN } = this.props.navigation.getParam("dataSearch");
    await fetch(API_URL + url + text, {
      headers: {
        Authorization: "JWT " + TOKEN
      }
    })
      .then(response => response.json())
      .then(response => {
        switch (handler) {
          case "ip":
            this.setState({
              itemsInputperson: response,
              findedInputpersons: response
            });
            break;
          case "ac":
            this.setState({
              itemsAccount: response,
              findedAccounts: response
            });
            break;
          case "ln":
            this.setState({
              itemsLiner: response,
              findedLiners: response
            });
            break;
          case "pl":
            this.setState({
              itemsPol: response,
              findedPols: response
            });
            break;
          case "pd":
            this.setState({
              itemsPod: response,
              findedPods: response
            });
            break;
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  _setFirstofLastMonth = () => {
    const dtsf = new Date();
    let yearsf = dtsf.getFullYear();
    let monthsf = dtsf.getMonth();
    this.setState({
      chosenDateSF: new Date(yearsf, monthsf - 1, 1)
    });
  };
  _convertDate = handler => {
    const dtsf = new Date(this.state.chosenDateSF);
    const dtst = new Date(this.state.chosenDateST);
    let yearsf = dtsf.getFullYear();
    let yearst = dtst.getFullYear();
    let monthsf = dtsf.getMonth() + 1;
    let monthst = dtst.getMonth() + 1;
    let daysf = dtsf.getDate();
    let dayst = dtst.getDate();
    if (monthsf < 10) {
      monthsf = "0" + monthsf;
    }
    if (monthst < 10) {
      monthst = "0" + monthst;
    }
    if (daysf < 10) {
      daysf = "0" + daysf;
    }
    if (dayst < 10) {
      dayst = "0" + dayst;
    }
    const sf = yearsf + "-" + monthsf + "-" + daysf;
    const st = yearst + "-" + monthst + "-" + dayst;
    this.setState({
      search_from: sf,
      search_to: st
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
  modal: {
    flex: 1,
    alignItems: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  search: {
    flex: 1,
    width: width,
    paddingTop: 5,
    backgroundColor: "#ececec",
    alignItems: "flex-start"
  },
  modalButtons: {
    width: width,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#ececec",
    paddingTop: 10,
    paddingBottom: 10
  },
  title: {
    backgroundColor: "#266d8c",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 3,
    paddingBottom: 3,
    borderRadius: 5
  },
  titleText: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold"
  },
  basicButtons: {
    width: 70,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  },
  searchMainInputperson: {
    width: width - 10,
    borderBottomWidth: 1,
    borderColor: "#DDD",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20
  },
  searchMainAccount: {
    width: width - 10,
    borderBottomWidth: 1,
    borderColor: "#DDD",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20
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
    paddingRight: 20
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
    paddingRight: 20
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
    paddingRight: 20
  },
  searchInside: {
    flex: 1,
    width: width - 50 - 10,
    marginLeft: 5,
    backgroundColor: "#ececec"
  },
  searchSubTitle: {
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 20,
    fontWeight: "bold"
  },
  searchSubInput: {
    fontSize: 20,
    padding: 10,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderColor: "#DDD"
  },
  searchSubItems: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderColor: "#DDD"
  }
});
