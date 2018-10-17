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
  Dimensions,
  RefreshControl,
  TextInput
} from "react-native";
import RateCard from "./RateCard";
import RateSearchedCard from "./RateSearchedCard";
import ReadMore from "./ReadMore";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import DatePicker from "react-native-datepicker";

const { height, width } = Dimensions.get("window");

export default class RateList extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "RATELINK",
    headerStyle: {
      backgroundColor: "#6dbad8"
    },
    headerBackTitle: "뒤로",
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    },
    headerLeft: (
      <Ionicons
        name={"ios-menu"}
        size={25}
        color={"white"}
        onPress={() => navigation.toggleDrawer()}
        style={{ paddingLeft: 20, paddingRight: 20 }}
      />
    ),
    headerRight: (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Input", {
            dataInput: {
              API_URL: navigation.state.params.API_URL,
              TOKEN: navigation.state.params.TOKEN,
              _getRates: navigation.state.params._getRates,
              _updateState: navigation.state.params._updateState
            }
          })
        }
      >
        <View
          style={{
            marginLeft: 10,
            marginRight: 15
          }}
        >
          <MaterialIcons name={"add-circle"} size={25} color={"white"} />
        </View>
      </TouchableOpacity>
    )
  });
  state = {
    isLoaded: false,
    isSearched: false,
    refreshing: false,
    isSortButton: false,
    isSorted20: false,
    isSorted40: false,
    isSorted4H: false,
    currentlyOpenSwipeable: null,
    next_page: "",
    rates: [],
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
  };

  componentWillMount() {
    const { setParams } = this.props.navigation;
    setParams({
      API_URL: this.props.API_URL,
      TOKEN: this.props.TOKEN,
      _getRates: this._getRates,
      _updateState: this._updateState
    });
  }

  componentDidUpdate(_, prevState) {
    if (prevState.queryParams !== this.state.queryParams) {
      this._getRates();
    }
  }

  componentDidMount() {
    this._getRates();
  }

  render() {
    const { isLoaded, isSearched, next_page, rates } = this.state;
    if (isSearched) {
      return (
        <View style={styles.container}>
          <View
            style={{
              width: width - 10,
              backgroundColor: "white",
              marginTop: 5,
              marginBottom: 5,
              alignItems: "center",
              paddingTop: 5,
              paddingBottom: 10
            }}
          >
            <View
              style={{
                width: width - 10,
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 5
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    queryParams: "",
                    isSearched: false,
                    refreshing: true,
                    currentlyOpenSwipeable: null
                  })
                }
                style={{
                  width: 80,
                  paddingLeft: 5,
                  paddingRight: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <Ionicons
                  name={"ios-arrow-back"}
                  size={27}
                  style={{ color: "#777" }}
                />
                <Text style={{ marginBottom: 2, color: "#777" }}>전체보기</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.setState({ isSortButton: !this.state.isSortButton })
                }
              >
                {this.state.isSortButton ? (
                  <View
                    style={{
                      backgroundColor: "#6dbad8",
                      marginRight: 5,
                      paddingTop: 6,
                      padding: 7,
                      borderRadius: 5
                    }}
                  >
                    <FontAwesome
                      name={"sort-numeric-asc"}
                      size={17}
                      style={{
                        color: "white"
                      }}
                    />
                  </View>
                ) : (
                  <View
                    style={{
                      backgroundColor: "#CCC",
                      marginRight: 5,
                      paddingTop: 6,
                      padding: 7,
                      borderRadius: 5
                    }}
                  >
                    <FontAwesome
                      name={"sort-numeric-asc"}
                      size={17}
                      style={{ color: "white" }}
                    />
                  </View>
                )}
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row", paddingBottom: 10 }}>
              <View
                style={{
                  width: (width - 100) / 2,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                {this.state.paramsDetail.pl.length > 0 ? (
                  <TouchableOpacity
                    onPressOut={() => {
                      this.props.navigation.navigate("SearchMain", {
                        dataSearch: {
                          API_URL: this.props.API_URL,
                          TOKEN: this.props.TOKEN,
                          _updateParams: this._updateParams,
                          paramsDetail: this.state.paramsDetail
                        }
                      });
                    }}
                  >
                    {this.state.paramsDetail.pl.map((item, key) => (
                      <Text key={key} style={{ fontSize: 20 }}>
                        {item}
                      </Text>
                    ))}
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPressOut={() => {
                      this.props.navigation.navigate("SearchMain", {
                        dataSearch: {
                          API_URL: this.props.API_URL,
                          TOKEN: this.props.TOKEN,
                          _updateParams: this._updateParams,
                          paramsDetail: this.state.paramsDetail
                        }
                      });
                    }}
                  >
                    <Text style={{ color: "#CCC", fontSize: 17 }}>
                      (선택없음)
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              <TouchableOpacity
                onPressOut={() => {
                  this.props.navigation.navigate("SearchMain", {
                    dataSearch: {
                      API_URL: this.props.API_URL,
                      TOKEN: this.props.TOKEN,
                      _updateParams: this._updateParams,
                      paramsDetail: this.state.paramsDetail
                    }
                  });
                }}
                style={{
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                {this.state.paramsDetail.ln.map((item, key) => (
                  <Text key={key} style={{ marginBottom: 2 }}>
                    {this._changeLinerName(item)}
                  </Text>
                ))}
                <MaterialIcons name={"directions-boat"} size={20} />
              </TouchableOpacity>
              <View
                style={{
                  width: (width - 100) / 2,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                {this.state.paramsDetail.pd.length > 0 ? (
                  <TouchableOpacity
                    onPressOut={() => {
                      this.props.navigation.navigate("SearchMain", {
                        dataSearch: {
                          API_URL: this.props.API_URL,
                          TOKEN: this.props.TOKEN,
                          _updateParams: this._updateParams,
                          paramsDetail: this.state.paramsDetail
                        }
                      });
                    }}
                  >
                    {this.state.paramsDetail.pd.map((item, key) => (
                      <Text key={key} style={{ fontSize: 20 }}>
                        {item}
                      </Text>
                    ))}
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPressOut={() => {
                      this.props.navigation.navigate("SearchMain", {
                        dataSearch: {
                          API_URL: this.props.API_URL,
                          TOKEN: this.props.TOKEN,
                          _updateParams: this._updateParams,
                          paramsDetail: this.state.paramsDetail
                        }
                      });
                    }}
                  >
                    <Text style={{ color: "#CCC", fontSize: 17 }}>
                      (선택없음)
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "#ececec",
                paddingTop: 5,
                paddingBottom: 5,
                marginBottom: 10,
                width: width - 50,
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <Ionicons
                name={"ios-arrow-back"}
                size={17}
                style={{ color: "#CCC", paddingLeft: 10 }}
              />
              <TouchableOpacity
                onPressOut={() => {
                  this.props.navigation.navigate("SearchMain", {
                    dataSearch: {
                      API_URL: this.props.API_URL,
                      TOKEN: this.props.TOKEN,
                      _updateParams: this._updateParams,
                      paramsDetail: this.state.paramsDetail
                    }
                  });
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ color: "#777" }}>
                    {this.state.paramsDetail.sf.slice(5)} ~{" "}
                  </Text>
                  {this.state.paramsDetail.isSTOn ? (
                    <Text style={{ color: "#777" }}>
                      {this.state.paramsDetail.st.slice(5)}
                    </Text>
                  ) : (
                    <Text style={{ color: "#777" }} />
                  )}
                </View>
              </TouchableOpacity>
              <Ionicons
                name={"ios-arrow-forward"}
                size={17}
                style={{ color: "#CCC", paddingRight: 10 }}
              />
            </View>
            {this.state.isSortButton ? (
              <View style={{ flexDirection: "row", paddingRight: 20 }}>
                <View style={{ flex: 12 }} />
                {this.state.isSorted20 ? (
                  <TouchableOpacity
                    style={[styles.sortButton, { backgroundColor: "#6dbad8" }]}
                    onPress={() => {
                      this._sortRates("20");
                      this.setState({
                        isSorted20: false
                      });
                    }}
                  >
                    <Text style={{ color: "white" }}>20'</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={[styles.sortButton, { backgroundColor: "#CCC" }]}
                    onPress={() => {
                      this._sortRates("20");
                      this.setState({
                        isSorted20: true,
                        isSorted40: false,
                        isSorted4H: false
                      });
                    }}
                  >
                    <Text style={{ color: "white" }}>20'</Text>
                  </TouchableOpacity>
                )}
                {this.state.isSorted40 ? (
                  <TouchableOpacity
                    style={[styles.sortButton, { backgroundColor: "#6dbad8" }]}
                    onPress={() => {
                      this._sortRates("40");
                      this.setState({
                        isSorted40: false
                      });
                    }}
                  >
                    <Text style={{ color: "white" }}>40'</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={[styles.sortButton, { backgroundColor: "#CCC" }]}
                    onPress={() => {
                      this._sortRates("40");
                      this.setState({
                        isSorted20: false,
                        isSorted40: true,
                        isSorted4H: false
                      });
                    }}
                  >
                    <Text style={{ color: "white" }}>40'</Text>
                  </TouchableOpacity>
                )}
                {this.state.isSorted4H ? (
                  <TouchableOpacity
                    style={[styles.sortButton, { backgroundColor: "#6dbad8" }]}
                    onPress={() => {
                      this._sortRates("4H");
                      this.setState({
                        isSorted4H: false
                      });
                    }}
                  >
                    <Text style={{ color: "white" }}>4H</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={[styles.sortButton, { backgroundColor: "#CCC" }]}
                    onPress={() => {
                      this._sortRates("4H");
                      this.setState({
                        isSorted20: false,
                        isSorted40: false,
                        isSorted4H: true
                      });
                    }}
                  >
                    <Text style={{ color: "white" }}>4H</Text>
                  </TouchableOpacity>
                )}
              </View>
            ) : null}
          </View>
          <ScrollView
            contentContainerStyle={styles.cardList}
            ref={ref => (this._scrollview = ref)}
            onScroll={this._handleScroll}
            scrollEventThrottle={16}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefreshing.bind(this)}
                progressViewOffset={35}
              />
            }
          >
            {rates.map(item => (
              <RateSearchedCard
                isPL={this.state.paramsDetail.pl}
                isPD={this.state.paramsDetail.pd}
                key={item.id}
                id={item.id}
                ip={item.inputperson.profile.profile_name}
                ac={item.account}
                ln={item.liner}
                pl={item.pol}
                pd={item.pod}
                br20={item.buying20}
                br40={item.buying40}
                br4H={item.buying4H}
                sr20={item.selling20}
                sr40={item.selling40}
                sr4H={item.selling4H}
                lft={item.loadingFT}
                dft={item.dischargingFT}
                ed={item.effectiveDate}
                od={item.offeredDate}
                rd={item.recordedDate}
                rm={item.remark}
                API_URL={this.props.API_URL}
                TOKEN={this.props.TOKEN}
                ID={this.props.ID}
                PROFILE_NAME={this.props.PROFILE_NAME}
                _updateRate={this._updateRate}
                _deleteRateState={this._deleteRateState}
                navigation={this.props.navigation}
                _scrollview={this._scrollview}
                currentlyOpenSwipeable={this.state.currentlyOpenSwipeable}
                _updateState={this._updateState}
              />
            ))}
            {isLoaded ? null : <ActivityIndicator style={{ marginTop: 10 }} />}
            {isLoaded ? (
              <TouchableOpacity
                onPress={next_page !== "nomore" ? this._getReadMore : null}
              >
                <ReadMore nextpage={next_page} />
              </TouchableOpacity>
            ) : null}
          </ScrollView>

          <TouchableOpacity
            style={styles.searchButton}
            onPressOut={() => {
              this.props.navigation.navigate("SearchMain", {
                dataSearch: {
                  API_URL: this.props.API_URL,
                  TOKEN: this.props.TOKEN,
                  _handleSubmit: this._handleSubmit,
                  _updateParams: this._updateParams,
                  paramsDetail: this.state.paramsDetail
                }
              });
            }}
          >
            <Ionicons
              name={"md-search"}
              size={40}
              color={"#6dbad8"}
              backgroundColor={"white"}
            />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.cardList}
            ref={ref => (this._scrollview = ref)}
            onScroll={this._handleScroll}
            scrollEventThrottle={16}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefreshing.bind(this)}
                progressViewOffset={35}
              />
            }
          >
            {rates.map(item => (
              <RateCard
                key={item.id}
                id={item.id}
                ip={item.inputperson.profile.profile_name}
                ac={item.account}
                ln={item.liner}
                pl={item.pol}
                pd={item.pod}
                br20={item.buying20}
                br40={item.buying40}
                br4H={item.buying4H}
                sr20={item.selling20}
                sr40={item.selling40}
                sr4H={item.selling4H}
                lft={item.loadingFT}
                dft={item.dischargingFT}
                ed={item.effectiveDate}
                od={item.offeredDate}
                rd={item.recordedDate}
                rm={item.remark}
                API_URL={this.props.API_URL}
                TOKEN={this.props.TOKEN}
                ID={this.props.ID}
                PROFILE_NAME={this.props.PROFILE_NAME}
                _updateRate={this._updateRate}
                _deleteRateState={this._deleteRateState}
                navigation={this.props.navigation}
                _scrollview={this._scrollview}
                currentlyOpenSwipeable={this.state.currentlyOpenSwipeable}
                _updateState={this._updateState}
              />
            ))}
            {isLoaded ? null : <ActivityIndicator style={{ marginTop: 10 }} />}
            {isLoaded ? (
              <TouchableOpacity
                onPress={next_page !== "nomore" ? this._getReadMore : null}
              >
                <ReadMore nextpage={next_page} />
              </TouchableOpacity>
            ) : null}
          </ScrollView>
          <TouchableOpacity
            style={styles.searchButton}
            onPressOut={() => {
              this.props.navigation.navigate("SearchMain", {
                dataSearch: {
                  API_URL: this.props.API_URL,
                  TOKEN: this.props.TOKEN,
                  _updateParams: this._updateParams,
                  paramsDetail: this.state.paramsDetail
                }
              });
            }}
          >
            <Ionicons
              name={"md-search"}
              size={40}
              color={"#6dbad8"}
              backgroundColor={"white"}
            />
          </TouchableOpacity>
        </View>
      );
    }
  }
  _changeLinerName = label => {
    switch (label) {
      case "EMIRATES":
        return "EMI";
        break;
      case "WANHAI":
        return "WH";
        break;
      case "CMA-CGM":
        return "CMA";
        break;
      case "EVERGREEN":
        return "EVER";
        break;
      case "HAMBURG SUD":
        return "HSUD";
        break;
      case "MAERSK":
        return "MSK";
        break;
      case "ONE LINE":
        return "ONE";
        break;
      case "SAFMARINE":
        return "SAF";
        break;
      case "YANGMING":
        return "YML";
        break;
      case "PAN OCEAN":
        return "PO";
        break;
      default:
        return label;
    }
  };
  _handleScroll = () => {
    const { currentlyOpenSwipeable } = this.state;
    if (currentlyOpenSwipeable) {
      currentlyOpenSwipeable.recenter();
    }
  };
  _sortRates = handler => {
    let sortedRates = [...this.state.rates];
    switch (handler) {
      case "20":
        sortedRates.sort((a, b) => a.buying20 - b.buying20);
        break;
      case "40":
        sortedRates.sort((a, b) => a.buying40 - b.buying40);
        break;
      case "4H":
        sortedRates.sort((a, b) => a.buying4H - b.buying4H);
        break;
    }
    this.setState({
      rates: [...sortedRates]
    });
  };
  _updateParams = newState => {
    this.setState(newState);
  };
  _updateState = newState => {
    this.setState(newState);
  };
  _onRefreshing = () => {
    this.setState({ refreshing: true });
    this._getRates();
  };
  _deleteRateState = async id => {
    const { API_URL, TOKEN } = this.props;
    await fetch(API_URL + "/rates/" + id + "/", {
      method: "PATCH",
      headers: {
        Authorization: "JWT " + TOKEN,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ deleted: 1 })
    })
      .then(response => response.json())
      .then(response => {
        if (!response.detail) {
          let index = this.state.rates.findIndex(rate => {
            return rate.id === id;
          });
          let currentRates = this.state.rates;
          currentRates.splice(index, 1);
          this.setState({
            rates: currentRates
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  _updateRate = async id => {
    const { API_URL, TOKEN } = this.props;
    await fetch(API_URL + "/rates/" + id + "/", {
      headers: {
        Authorization: "JWT " + TOKEN
      }
    })
      .then(response => response.json())
      .then(response => {
        let index = this.state.rates.findIndex(rate => {
          return rate.id === id;
        });
        let currentRates = this.state.rates;
        currentRates.splice(index, 1, response);
        this.setState({
          rates: currentRates
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
  _getRates = async () => {
    const { API_URL, TOKEN } = this.props;
    if (this.state.refreshing) {
      this.setState({
        isLoaded: true
      });
    }
    await fetch(API_URL + "/rates/" + "?" + this.state.queryParams, {
      headers: {
        Authorization: "JWT " + TOKEN
      }
    })
      .then(response => response.json())
      .then(response => {
        if (response.next !== null) {
          this.setState({
            next_page: response.next,
            rates: [...response.results],
            isLoaded: true,
            refreshing: false
          });
        } else {
          this.setState({
            next_page: "nomore",
            rates: [...response.results],
            isLoaded: true,
            refreshing: false
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  _getReadMore = async () => {
    const { TOKEN } = this.props;
    this.setState({
      isLoaded: false
    });
    await fetch(this.state.next_page, {
      headers: {
        Authorization: "JWT " + TOKEN
      }
    })
      .then(response => response.json())
      .then(response => {
        if (response.next !== null) {
          this.setState(prevState => ({
            next_page: response.next,
            rates: [...prevState.rates, ...response.results],
            isLoaded: true
          }));
        } else {
          this.setState(prevState => ({
            next_page: "nomore",
            rates: [...prevState.rates, ...response.results],
            isLoaded: true
          }));
        }
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
  cards: {
    flex: 1,
    backgroundColor: "#ececec"
  },
  readmore: {
    marginTop: 10,
    marginBottom: 30,
    padding: 10,
    borderRadius: 5,
    alignItems: "center"
  },
  cardList: {
    paddingTop: 0
  },
  addButton: {
    position: "absolute",
    bottom: 10,
    right: 20,
    alignSelf: "flex-end"
  },
  searchButton: {
    position: "absolute",
    bottom: 30,
    right: 25,
    alignSelf: "flex-end"
  },
  modal: {
    flex: 1,
    alignItems: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  search: {
    flex: 1,
    width: width - 50,
    paddingTop: 30,
    backgroundColor: "#ececec",
    alignItems: "flex-start"
  },
  modalButtons: {
    width: width - 50,
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
    width: width - 50 - 10,
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
    width: width - 50 - 10,
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
    width: width - 50 - 10,
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
    width: width - 50 - 10,
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
    width: width - 50 - 10,
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
  },
  sortButton: {
    flex: 2,
    alignItems: "center",
    paddingTop: 3,
    paddingBottom: 3,
    marginLeft: 2,
    marginRight: 2,
    borderRadius: 5
  }
});
