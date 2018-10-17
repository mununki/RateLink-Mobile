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
  TextInput,
  Image
} from "react-native";
import { Constants } from "expo";
import linerimages from "../images/index";
import Ionicons from "react-native-vector-icons/Ionicons";

const { height, width } = Dimensions.get("window");

export default class RateSearch extends React.Component {
  static navigationOptions = {
    title: "상세선택",
    headerStyle: {
      backgroundColor: "#6dbad8"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };
  state = {
    items: [],
    selected: [],
    finded: [],
    temp: []
  };

  componentWillMount() {
    const { handler, selected } = this.props.navigation.getParam("dataInput");
    switch (handler) {
      case "inputperson":
        this._getDistinctValue("/ratesip/", "");
        break;
      case "account":
        this._getDistinctValue("/ratesac/", "");
        break;
      case "liner":
        this._getDistinctValue("/ratesln/", "");
        break;
      case "pol":
        this._getDistinctValue("/ratespl/", "");
        break;
      case "pod":
        this._getDistinctValue("/ratespd/", "");
        break;
      case "linerinput":
        this._getDistinctValue("/liners/", "");
        break;
      case "linermodify":
        this._getDistinctValue("/liners/", "");
        break;
    }
  }
  componentDidMount() {
    const { selected } = this.props.navigation.getParam("dataInput");
    this.setState({
      selected: selected,
      temp: selected
    });
  }
  render() {
    const { handler, _updateState } = this.props.navigation.getParam(
      "dataInput"
    );
    const { selected, finded, temp } = this.state;

    switch (handler) {
      case "inputperson":
        return (
          <View style={styles.modal}>
            <View style={styles.search}>
              <View style={styles.searchInside}>
                <TextInput
                  style={styles.searchSubInput}
                  ref={input => (this._textInput = input)}
                  onChangeText={text => this._setItems("inputperson", text)}
                  placeholder="..."
                  autoCapitalize="none"
                  autoCorrect={false}
                  underlineColorAndroid={"transparent"}
                />
                <View style={{ marginTop: 5, marginBottom: 5 }}>
                  <Text>선택항목</Text>
                  <View style={{ flexDirection: "row", marginTop: 5 }}>
                    {selected.map((item, key) => (
                      <TouchableOpacity
                        key={key}
                        onPress={() => {
                          let index = selected.findIndex(loc => {
                            return loc === item;
                          });
                          let currentState = [...selected];
                          currentState.splice(index, 1);
                          this.setState({
                            selected: [...currentState]
                          });
                        }}
                        style={styles.searchSubSelectedItems}
                      >
                        <Text key={key}>
                          {item} <Ionicons name={"md-close"} size={13} />
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
                <ScrollView keyboardShouldPersistTaps={"handled"}>
                  {finded.map((item, key) => (
                    <TouchableOpacity
                      key={key}
                      onPress={event => {
                        event.stopPropagation();
                        if (selected.includes(item.inputperson)) {
                          let index = selected.findIndex(loc => {
                            return loc === item.inputperson;
                          });
                          let currentState = [...selected];
                          currentState.splice(index, 1);
                          this.setState({
                            selected: [...currentState]
                          });
                        } else {
                          this.setState({
                            selected: [...selected, item.inputperson]
                          });
                        }
                        this._textInput.clear();
                      }}
                      style={[
                        styles.searchSubItems,
                        selected.includes(item.inputperson)
                          ? { backgroundColor: "#6dbad8" }
                          : { backgroundColor: "white" }
                      ]}
                    >
                      {selected.includes(item.inputperson) ? (
                        <View style={{ flexDirection: "row" }}>
                          <Text key={key} style={{ color: "white" }}>
                            {item.inputperson}
                          </Text>
                        </View>
                      ) : (
                        <Text key={key}>{item.inputperson}</Text>
                      )}
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    onPress={() => {
                      _updateState({ selectedItemsInputperson: selected });
                      this.props.navigation.goBack();
                    }}
                    style={[
                      styles.basicButtons,
                      { backgroundColor: "#266d8c" }
                    ]}
                  >
                    <Text style={{ color: "white" }}>확인</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      _updateState({ selectedItemsInputperson: temp });
                      this.props.navigation.goBack();
                    }}
                    style={[styles.basicButtons, { backgroundColor: "white" }]}
                  >
                    <Text>취소</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        );
        break;
      case "account":
        return (
          <View style={styles.modal}>
            <View style={styles.search}>
              <View style={styles.searchInside}>
                <TextInput
                  style={styles.searchSubInput}
                  ref={input => (this._textInput = input)}
                  onChangeText={text => this._setItems("account", text)}
                  placeholder="..."
                  autoCapitalize="none"
                  autoCorrect={false}
                  underlineColorAndroid={"transparent"}
                />
                <View style={{ marginTop: 5, marginBottom: 5 }}>
                  <Text>선택항목</Text>
                  <View style={{ flexDirection: "row", marginTop: 5 }}>
                    {selected.map((item, key) => (
                      <TouchableOpacity
                        key={key}
                        onPress={() => {
                          let index = selected.findIndex(loc => {
                            return loc === item;
                          });
                          let currentState = [...selected];
                          currentState.splice(index, 1);
                          this.setState({
                            selected: [...currentState]
                          });
                        }}
                        style={styles.searchSubSelectedItems}
                      >
                        <Text key={key}>
                          {item} <Ionicons name={"md-close"} size={13} />
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
                <ScrollView keyboardShouldPersistTaps={"handled"}>
                  {finded.map((item, key) => (
                    <TouchableOpacity
                      key={key}
                      onPress={event => {
                        event.stopPropagation();
                        if (selected.includes(item.account)) {
                          let index = selected.findIndex(loc => {
                            return loc === item.account;
                          });
                          let currentState = [...selected];
                          currentState.splice(index, 1);
                          this.setState({
                            selected: [...currentState]
                          });
                        } else {
                          this.setState({
                            selected: [...selected, item.account]
                          });
                        }
                        this._textInput.clear();
                      }}
                      style={[
                        styles.searchSubItems,
                        selected.includes(item.account)
                          ? { backgroundColor: "#6dbad8" }
                          : { backgroundColor: "white" }
                      ]}
                    >
                      {selected.includes(item.account) ? (
                        <View style={{ flexDirection: "row" }}>
                          <Text key={key} style={{ color: "white" }}>
                            {item.account}
                          </Text>
                        </View>
                      ) : (
                        <Text key={key}>{item.account}</Text>
                      )}
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    onPress={() => {
                      _updateState({ selectedItemsAccount: selected });
                      this.props.navigation.goBack();
                    }}
                    style={[
                      styles.basicButtons,
                      { backgroundColor: "#266d8c" }
                    ]}
                  >
                    <Text style={{ color: "white" }}>확인</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      _updateState({ selectedItemsAccount: temp });
                      this.props.navigation.goBack();
                    }}
                    style={[styles.basicButtons, { backgroundColor: "white" }]}
                  >
                    <Text>취소</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        );
        break;
      case "liner":
        return (
          <View style={styles.modal}>
            <View style={styles.search}>
              <View style={styles.searchInside}>
                <TextInput
                  style={styles.searchSubInput}
                  ref={input => (this._textInput = input)}
                  onChangeText={text => this._setItems("liner", text)}
                  placeholder="..."
                  autoCapitalize="none"
                  autoCorrect={false}
                  underlineColorAndroid={"transparent"}
                />
                <View style={{ marginTop: 5, marginBottom: 5 }}>
                  <Text>선택항목</Text>
                  <View style={{ flexDirection: "row", marginTop: 5 }}>
                    {selected.map((item, key) => (
                      <TouchableOpacity
                        key={key}
                        onPress={() => {
                          let index = selected.findIndex(loc => {
                            return loc === item;
                          });
                          let currentState = [...selected];
                          currentState.splice(index, 1);
                          this.setState({
                            selected: [...currentState]
                          });
                        }}
                        style={styles.searchSubSelectedItems}
                      >
                        <Text key={key}>
                          {item} <Ionicons name={"md-close"} size={13} />
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
                <ScrollView keyboardShouldPersistTaps={"handled"}>
                  {finded.map((item, key) => (
                    <TouchableOpacity
                      key={key}
                      onPress={event => {
                        event.stopPropagation();
                        if (selected.includes(item.label)) {
                          let index = selected.findIndex(loc => {
                            return loc === item.label;
                          });
                          let currentState = [...selected];
                          currentState.splice(index, 1);
                          this.setState({
                            selected: [...currentState]
                          });
                        } else {
                          this.setState({
                            selected: [...selected, item.label]
                          });
                        }
                        this._textInput.clear();
                      }}
                      style={[
                        styles.searchSubItems,
                        selected.includes(item.label)
                          ? { backgroundColor: "#6dbad8" }
                          : { backgroundColor: "white" }
                      ]}
                    >
                      {selected.includes(item.label) ? (
                        <View style={{ flexDirection: "row" }}>
                          <Text key={key} style={{ color: "white" }}>
                            {item.label}
                          </Text>
                          <Image
                            style={{ width: 70, height: 20 }}
                            resizeMode={"contain"}
                            source={linerimages[item.name]}
                          />
                        </View>
                      ) : (
                        <View style={{ flexDirection: "row" }}>
                          <Text key={key}>{item.label}</Text>
                          <Image
                            style={{ width: 70, height: 20 }}
                            resizeMode={"contain"}
                            source={linerimages[item.name]}
                          />
                        </View>
                      )}
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    onPress={() => {
                      _updateState({ selectedItemsLiner: selected });
                      this.props.navigation.goBack();
                    }}
                    style={[
                      styles.basicButtons,
                      { backgroundColor: "#266d8c" }
                    ]}
                  >
                    <Text style={{ color: "white" }}>확인</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      _updateState({ selectedItemsLiner: temp });
                      this.props.navigation.goBack();
                    }}
                    style={[styles.basicButtons, { backgroundColor: "white" }]}
                  >
                    <Text>취소</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        );
        break;
      case "pol":
        return (
          <View style={styles.modal}>
            <View style={styles.search}>
              <View style={styles.searchInside}>
                <TextInput
                  style={styles.searchSubInput}
                  ref={input => (this._textInput = input)}
                  onChangeText={text => this._setItems("pol", text)}
                  placeholder="..."
                  autoCapitalize="none"
                  autoCorrect={false}
                  underlineColorAndroid={"transparent"}
                />
                <View style={{ marginTop: 5, marginBottom: 5 }}>
                  <Text>선택항목</Text>
                  <View style={{ flexDirection: "row", marginTop: 5 }}>
                    {selected.map((item, key) => (
                      <TouchableOpacity
                        key={key}
                        onPress={() => {
                          let index = selected.findIndex(loc => {
                            return loc === item;
                          });
                          let currentState = [...selected];
                          currentState.splice(index, 1);
                          this.setState({
                            selected: [...currentState]
                          });
                        }}
                        style={styles.searchSubSelectedItems}
                      >
                        <Text key={key}>
                          {item} <Ionicons name={"md-close"} size={13} />
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
                <ScrollView keyboardShouldPersistTaps={"handled"}>
                  {finded.map((item, key) => (
                    <TouchableOpacity
                      key={key}
                      onPress={event => {
                        event.stopPropagation();
                        if (selected.includes(item.pol)) {
                          let index = selected.findIndex(loc => {
                            return loc === item.pol;
                          });
                          let currentState = [...selected];
                          currentState.splice(index, 1);
                          this.setState({
                            selected: [...currentState]
                          });
                        } else {
                          this.setState({
                            selected: [...selected, item.pol]
                          });
                        }
                        this._textInput.clear();
                      }}
                      style={[
                        styles.searchSubItems,
                        selected.includes(item.pol)
                          ? { backgroundColor: "#6dbad8" }
                          : { backgroundColor: "white" }
                      ]}
                    >
                      {selected.includes(item.pol) ? (
                        <View style={{ flexDirection: "row" }}>
                          <Text key={key} style={{ color: "white" }}>
                            {item.pol}
                          </Text>
                        </View>
                      ) : (
                        <Text key={key}>{item.pol}</Text>
                      )}
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    onPress={() => {
                      _updateState({ selectedItemsPol: selected });
                      this.props.navigation.goBack();
                    }}
                    style={[
                      styles.basicButtons,
                      { backgroundColor: "#266d8c" }
                    ]}
                  >
                    <Text style={{ color: "white" }}>확인</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      _updateState({ selectedItemsPol: temp });
                      this.props.navigation.goBack();
                    }}
                    style={[styles.basicButtons, { backgroundColor: "white" }]}
                  >
                    <Text>취소</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        );
        break;
      case "pod":
        return (
          <View style={styles.modal}>
            <View style={styles.search}>
              <View style={styles.searchInside}>
                <TextInput
                  style={styles.searchSubInput}
                  ref={input => (this._textInput = input)}
                  onChangeText={text => this._setItems("pod", text)}
                  placeholder="..."
                  autoCapitalize="none"
                  autoCorrect={false}
                  underlineColorAndroid={"transparent"}
                />
                <View style={{ marginTop: 5, marginBottom: 5 }}>
                  <Text>선택항목</Text>
                  <View style={{ flexDirection: "row", marginTop: 5 }}>
                    {selected.map((item, key) => (
                      <TouchableOpacity
                        key={key}
                        onPress={event => {
                          event.stopPropagation();
                          let index = selected.findIndex(loc => {
                            return loc === item;
                          });
                          let currentState = [...selected];
                          currentState.splice(index, 1);
                          this.setState({
                            selected: [...currentState]
                          });
                        }}
                        style={styles.searchSubSelectedItems}
                      >
                        <Text key={key}>
                          {item} <Ionicons name={"md-close"} size={13} />
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
                <ScrollView keyboardShouldPersistTaps={"handled"}>
                  {finded.map((item, key) => (
                    <TouchableOpacity
                      key={key}
                      onPress={event => {
                        event.stopPropagation();
                        if (selected.includes(item.pod)) {
                          let index = selected.findIndex(loc => {
                            return loc === item.pod;
                          });
                          let currentState = [...selected];
                          currentState.splice(index, 1);
                          this.setState({
                            selected: [...currentState]
                          });
                        } else {
                          this.setState({
                            selected: [...selected, item.pod]
                          });
                        }
                        this._textInput.clear();
                      }}
                      style={[
                        styles.searchSubItems,
                        selected.includes(item.pod)
                          ? { backgroundColor: "#6dbad8" }
                          : { backgroundColor: "white" }
                      ]}
                    >
                      {selected.includes(item.pod) ? (
                        <View style={{ flexDirection: "row" }}>
                          <Text key={key} style={{ color: "white" }}>
                            {item.pod}
                          </Text>
                        </View>
                      ) : (
                        <Text key={key}>{item.pod}</Text>
                      )}
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    onPress={() => {
                      _updateState({ selectedItemsPod: selected });
                      this.props.navigation.goBack();
                    }}
                    style={[
                      styles.basicButtons,
                      { backgroundColor: "#266d8c" }
                    ]}
                  >
                    <Text style={{ color: "white" }}>확인</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      _updateState({ selectedItemsPod: temp });
                      this.props.navigation.goBack();
                    }}
                    style={[styles.basicButtons, { backgroundColor: "white" }]}
                  >
                    <Text>취소</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        );
        break;
      case "linerinput":
        return (
          <View style={styles.modal}>
            <View style={styles.searchinput}>
              <View style={styles.searchInsideinput}>
                <TextInput
                  style={styles.searchSubInput}
                  ref={input => (this._textInput = input)}
                  onChangeText={text => this._setItems("liner", text)}
                  placeholder="..."
                  autoCapitalize="none"
                  autoCorrect={false}
                  underlineColorAndroid={"transparent"}
                />
                <View style={{ marginTop: 5, marginBottom: 5 }}>
                  <Text>선택항목</Text>
                  <View style={{ flexDirection: "row", marginTop: 5 }}>
                    {selected.map((item, key) => (
                      <TouchableOpacity
                        key={key}
                        onPress={() => {
                          let index = selected.findIndex(loc => {
                            return loc === item;
                          });
                          let currentState = [...selected];
                          currentState.splice(index, 1);
                          this.setState({
                            selected: [...currentState]
                          });
                        }}
                        style={styles.searchSubSelectedItems}
                      >
                        <Text key={key}>
                          {item} <Ionicons name={"md-close"} size={13} />
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <ScrollView keyboardShouldPersistTaps={"handled"}>
                  {finded.map((item, key) => (
                    <TouchableOpacity
                      key={key}
                      onPress={event => {
                        event.stopPropagation();
                        if (selected.includes(item.name)) {
                          let index = selected.findIndex(loc => {
                            return loc === item.name;
                          });
                          let currentState = [...selected];
                          currentState.splice(index, 1);
                          this.setState({
                            selected: [...currentState]
                          });
                        } else {
                          this.setState({
                            selected: [...selected, item.name]
                          });
                        }
                        this._textInput.clear();
                      }}
                      style={[
                        styles.searchSubItems,
                        selected.includes(item.name)
                          ? { backgroundColor: "#6dbad8" }
                          : { backgroundColor: "white" }
                      ]}
                    >
                      {selected.includes(item.name) ? (
                        <View style={{ flexDirection: "row" }}>
                          <Text key={key} style={{ color: "white" }}>
                            {item.label}
                          </Text>
                        </View>
                      ) : (
                        <Text key={key}>{item.label}</Text>
                      )}
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <View style={styles.modalButtonsinput}>
                  <TouchableOpacity
                    onPress={() => {
                      _updateState({ selectedItemsLiner: selected });
                      this.props.navigation.goBack();
                    }}
                    style={[
                      styles.basicButtons,
                      { backgroundColor: "#266d8c" }
                    ]}
                  >
                    <Text style={{ color: "white" }}>확인</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      _updateState({ selectedItemsLiner: temp });
                      this.props.navigation.goBack();
                    }}
                    style={[styles.basicButtons, { backgroundColor: "white" }]}
                  >
                    <Text>취소</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        );
        break;
      case "polinput":
        return (
          <View style={styles.modal}>
            <View style={styles.searchinput}>
              <View style={styles.searchInsideinput}>
                <TextInput
                  style={styles.searchSubInput}
                  ref={input => (this._textInput = input)}
                  onChangeText={text =>
                    this._getDistinctValue("/locations/?location=", text)
                  }
                  placeholder="Please Search..."
                  autoCapitalize="none"
                  autoCorrect={false}
                  underlineColorAndroid={"transparent"}
                  autoFocus={true}
                />
                <View style={{ marginTop: 5, marginBottom: 5 }}>
                  <Text>선택항목</Text>
                  <View style={{ flexDirection: "row", marginTop: 5 }}>
                    {selected.map((item, key) => (
                      <TouchableOpacity
                        key={key}
                        onPress={() => {
                          let index = selected.findIndex(loc => {
                            return loc === item;
                          });
                          let currentState = [...selected];
                          currentState.splice(index, 1);
                          this.setState({
                            selected: [...currentState]
                          });
                        }}
                        style={styles.searchSubSelectedItems}
                      >
                        <Text key={key}>
                          {item} <Ionicons name={"md-close"} size={13} />
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
                <ScrollView keyboardShouldPersistTaps={"handled"}>
                  {finded.map((item, key) => (
                    <TouchableOpacity
                      key={key}
                      onPress={event => {
                        event.stopPropagation();
                        if (selected.includes(item.name)) {
                          let index = selected.findIndex(loc => {
                            return loc === item.name;
                          });
                          let currentState = [...selected];
                          currentState.splice(index, 1);
                          this.setState({
                            selected: [...currentState]
                          });
                        } else {
                          this.setState({
                            selected: [...selected, item.name]
                          });
                        }
                        this._textInput.clear();
                      }}
                      style={[
                        styles.searchSubItems,
                        selected.includes(item.name)
                          ? { backgroundColor: "#6dbad8" }
                          : { backgroundColor: "white" }
                      ]}
                    >
                      {selected.includes(item.name) ? (
                        <View style={{ flexDirection: "row" }}>
                          <Text key={key} style={{ color: "white" }}>
                            {item.name}
                          </Text>
                        </View>
                      ) : (
                        <Text key={key}>{item.name}</Text>
                      )}
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <View style={styles.modalButtonsinput}>
                  <TouchableOpacity
                    onPress={() => {
                      _updateState({ selectedItemsPol: selected });
                      this.props.navigation.goBack();
                    }}
                    style={[
                      styles.basicButtons,
                      { backgroundColor: "#266d8c" }
                    ]}
                  >
                    <Text style={{ color: "white" }}>확인</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      _updateState({ selectedItemsPol: temp });
                      this.props.navigation.goBack();
                    }}
                    style={[styles.basicButtons, { backgroundColor: "white" }]}
                  >
                    <Text>취소</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        );
        break;
      case "podinput":
        return (
          <View style={styles.modal}>
            <View style={styles.searchinput}>
              <View style={styles.searchInsideinput}>
                <TextInput
                  style={styles.searchSubInput}
                  ref={input => (this._textInput = input)}
                  onChangeText={text =>
                    this._getDistinctValue("/locations/?location=", text)
                  }
                  placeholder="Please Search..."
                  autoCapitalize="none"
                  autoCorrect={false}
                  underlineColorAndroid={"transparent"}
                  autoFocus={true}
                />
                <View style={{ marginTop: 5, marginBottom: 5 }}>
                  <Text>선택항목</Text>
                  <View style={{ flexDirection: "row", marginTop: 5 }}>
                    {selected.map((item, key) => (
                      <TouchableOpacity
                        key={key}
                        onPress={() => {
                          let index = selected.findIndex(loc => {
                            return loc === item;
                          });
                          let currentState = [...selected];
                          currentState.splice(index, 1);
                          this.setState({
                            selected: [...currentState]
                          });
                        }}
                        style={styles.searchSubSelectedItems}
                      >
                        <Text key={key}>
                          {item} <Ionicons name={"md-close"} size={13} />
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
                <ScrollView keyboardShouldPersistTaps={"handled"}>
                  {finded.map((item, key) => (
                    <TouchableOpacity
                      key={key}
                      onPress={event => {
                        event.stopPropagation();
                        if (selected.includes(item.name)) {
                          let index = selected.findIndex(loc => {
                            return loc === item.name;
                          });
                          let currentState = [...selected];
                          currentState.splice(index, 1);
                          this.setState({
                            selected: currentState
                          });
                        } else {
                          this.setState({
                            selected: [...selected, item.name]
                          });
                        }
                        this._textInput.clear();
                      }}
                      style={[
                        styles.searchSubItems,
                        selected.includes(item.name)
                          ? { backgroundColor: "#6dbad8" }
                          : { backgroundColor: "white" }
                      ]}
                    >
                      {selected.includes(item.name) ? (
                        <View style={{ flexDirection: "row" }}>
                          <Text key={key} style={{ color: "white" }}>
                            {item.name}
                          </Text>
                        </View>
                      ) : (
                        <Text key={key}>{item.name}</Text>
                      )}
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <View style={styles.modalButtonsinput}>
                  <TouchableOpacity
                    onPress={() => {
                      _updateState({ selectedItemsPod: selected });
                      this.props.navigation.goBack();
                    }}
                    style={[
                      styles.basicButtons,
                      { backgroundColor: "#266d8c" }
                    ]}
                  >
                    <Text style={{ color: "white" }}>확인</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      _updateState({ selectedItemsPod: temp });
                      this.props.navigation.goBack();
                    }}
                    style={[styles.basicButtons, { backgroundColor: "white" }]}
                  >
                    <Text>취소</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        );
        break;
      case "linermodify":
        return (
          <View style={styles.modal}>
            <View style={styles.searchinput}>
              <View style={styles.searchInsideinput}>
                <TextInput
                  style={styles.searchSubInput}
                  ref={input => (this._textInput = input)}
                  onChangeText={text => this._setItems("liner", text)}
                  placeholder="..."
                  autoCapitalize="none"
                  autoCorrect={false}
                  underlineColorAndroid={"transparent"}
                />
                <View style={{ marginTop: 5, marginBottom: 5 }}>
                  <Text>선택항목</Text>
                  <View style={{ flexDirection: "row", marginTop: 5 }}>
                    {selected.map((item, key) => (
                      <TouchableOpacity
                        key={key}
                        onPress={() => {
                          let index = selected.findIndex(loc => {
                            return loc === item;
                          });
                          let currentState = [...selected];
                          currentState.splice(index, 1);
                          this.setState({
                            selected: [...currentState]
                          });
                        }}
                        style={styles.searchSubSelectedItems}
                      >
                        <Text key={key}>
                          {item} <Ionicons name={"md-close"} size={13} />
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
                <ScrollView keyboardShouldPersistTaps={"handled"}>
                  {finded.map((item, key) => (
                    <TouchableOpacity
                      key={key}
                      onPress={event => {
                        event.stopPropagation();
                        this.setState({
                          selected: [item.name]
                        });
                      }}
                      style={[
                        styles.searchSubItems,
                        selected.includes(item.name)
                          ? { backgroundColor: "#6dbad8" }
                          : { backgroundColor: "white" }
                      ]}
                    >
                      {selected.includes(item.name) ? (
                        <View style={{ flexDirection: "row" }}>
                          <Text key={key} style={{ color: "white" }}>
                            {item.label}
                          </Text>
                        </View>
                      ) : (
                        <Text key={key}>{item.label}</Text>
                      )}
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <View style={styles.modalButtonsinput}>
                  <TouchableOpacity
                    onPress={() => {
                      _updateState({ selectedItemsLiner: selected });
                      this.props.navigation.goBack();
                    }}
                    style={[
                      styles.basicButtons,
                      { backgroundColor: "#266d8c" }
                    ]}
                  >
                    <Text style={{ color: "white" }}>확인</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      _updateState({ selectedItemsLiner: temp });
                      this.props.navigation.goBack();
                    }}
                    style={[styles.basicButtons, { backgroundColor: "white" }]}
                  >
                    <Text>취소</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        );
        break;
      case "polmodify":
        return (
          <View style={styles.modal}>
            <View style={styles.searchinput}>
              <View style={styles.searchInsideinput}>
                <TextInput
                  style={styles.searchSubInput}
                  ref={input => (this._textInput = input)}
                  onChangeText={text =>
                    this._getDistinctValue("/locations/?location=", text)
                  }
                  placeholder="Please Search..."
                  autoCapitalize="none"
                  autoCorrect={false}
                  underlineColorAndroid={"transparent"}
                  autoFocus={true}
                />
                <View style={{ marginTop: 5, marginBottom: 5 }}>
                  <Text>선택항목</Text>
                  <View style={{ flexDirection: "row", marginTop: 5 }}>
                    {selected.map((item, key) => (
                      <TouchableOpacity
                        key={key}
                        onPress={() => {
                          let index = selected.findIndex(loc => {
                            return loc === item;
                          });
                          let currentState = [...selected];
                          currentState.splice(index, 1);
                          this.setState({
                            selected: [...currentState]
                          });
                        }}
                        style={styles.searchSubSelectedItems}
                      >
                        <Text key={key}>
                          {item} <Ionicons name={"md-close"} size={13} />
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
                <ScrollView keyboardShouldPersistTaps={"handled"}>
                  {finded.map((item, key) => (
                    <TouchableOpacity
                      key={key}
                      onPress={event => {
                        event.stopPropagation();
                        this.setState({
                          selected: [item.name]
                        });
                      }}
                      style={[
                        styles.searchSubItems,
                        selected.includes(item.name)
                          ? { backgroundColor: "#6dbad8" }
                          : { backgroundColor: "white" }
                      ]}
                    >
                      {selected.includes(item.name) ? (
                        <View style={{ flexDirection: "row" }}>
                          <Text key={key} style={{ color: "white" }}>
                            {item.name}
                          </Text>
                        </View>
                      ) : (
                        <Text key={key}>{item.name}</Text>
                      )}
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <View style={styles.modalButtonsinput}>
                  <TouchableOpacity
                    onPress={() => {
                      _updateState({ selectedItemsPol: selected });
                      this.props.navigation.goBack();
                    }}
                    style={[
                      styles.basicButtons,
                      { backgroundColor: "#266d8c" }
                    ]}
                  >
                    <Text style={{ color: "white" }}>확인</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      _updateState({ selectedItemsPol: temp });
                      this.props.navigation.goBack();
                    }}
                    style={[styles.basicButtons, { backgroundColor: "white" }]}
                  >
                    <Text>취소</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        );
        break;
      case "podmodify":
        return (
          <View style={styles.modal}>
            <View style={styles.searchinput}>
              <View style={styles.searchInsideinput}>
                <TextInput
                  style={styles.searchSubInput}
                  ref={input => (this._textInput = input)}
                  onChangeText={text =>
                    this._getDistinctValue("/locations/?location=", text)
                  }
                  placeholder="Please Search..."
                  autoCapitalize="none"
                  autoCorrect={false}
                  underlineColorAndroid={"transparent"}
                  autoFocus={true}
                />
                <View style={{ marginTop: 5, marginBottom: 5 }}>
                  <Text>선택항목</Text>
                  <View style={{ flexDirection: "row", marginTop: 5 }}>
                    {selected.map((item, key) => (
                      <TouchableOpacity
                        key={key}
                        onPress={() => {
                          let index = selected.findIndex(loc => {
                            return loc === item;
                          });
                          let currentState = [...selected];
                          currentState.splice(index, 1);
                          this.setState({
                            selected: [...currentState]
                          });
                        }}
                        style={styles.searchSubSelectedItems}
                      >
                        <Text key={key}>
                          {item} <Ionicons name={"md-close"} size={13} />
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
                <ScrollView keyboardShouldPersistTaps={"handled"}>
                  {finded.map((item, key) => (
                    <TouchableOpacity
                      key={key}
                      onPress={event => {
                        event.stopPropagation();
                        this.setState({
                          selected: [item.name]
                        });
                      }}
                      style={[
                        styles.searchSubItems,
                        selected.includes(item.name)
                          ? { backgroundColor: "#6dbad8" }
                          : { backgroundColor: "white" }
                      ]}
                    >
                      {selected.includes(item.name) ? (
                        <View style={{ flexDirection: "row" }}>
                          <Text key={key} style={{ color: "white" }}>
                            {item.name}
                          </Text>
                        </View>
                      ) : (
                        <Text key={key}>{item.name}</Text>
                      )}
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <View style={styles.modalButtonsinput}>
                  <TouchableOpacity
                    onPress={() => {
                      _updateState({ selectedItemsPod: selected });
                      this.props.navigation.goBack();
                    }}
                    style={[
                      styles.basicButtons,
                      { backgroundColor: "#266d8c" }
                    ]}
                  >
                    <Text style={{ color: "white" }}>확인</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      _updateState({ selectedItemsPod: temp });
                      this.props.navigation.goBack();
                    }}
                    style={[styles.basicButtons, { backgroundColor: "white" }]}
                  >
                    <Text>취소</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        );
        break;
    }
  }
  _setItems = (handler, text) => {
    let result;
    switch (handler) {
      case "inputperson":
        result = this.state.items.filter(
          el => el.inputperson.toLowerCase().indexOf(text.toLowerCase()) > -1
        );
        this.setState({
          finded: result
        });
        break;
      case "account":
        result = this.state.items.filter(
          el => el.account.toLowerCase().indexOf(text.toLowerCase()) > -1
        );
        this.setState({
          finded: result
        });
        break;
      case "liner":
        result = this.state.items.filter(
          el => el.label.toLowerCase().indexOf(text.toLowerCase()) > -1
        );
        this.setState({
          finded: result
        });
        break;
      case "pol":
        result = this.state.items.filter(
          el => el.pol.toLowerCase().indexOf(text.toLowerCase()) > -1
        );
        this.setState({
          finded: result
        });
        break;
      case "pod":
        result = this.state.items.filter(
          el => el.pod.toLowerCase().indexOf(text.toLowerCase()) > -1
        );
        this.setState({
          finded: result
        });
        break;
    }
  };
  _getDistinctValue = async (url, text) => {
    const { API_URL, TOKEN } = this.props.navigation.getParam("dataInput");
    await fetch(API_URL + url + text, {
      headers: {
        Authorization: "JWT " + TOKEN
      }
    })
      .then(response => response.json())
      .then(response => {
        this.setState({
          items: response,
          finded: response
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  search: {
    flex: 1,
    width: width,
    paddingTop: 30,
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
  searchInside: {
    flex: 1,
    width: width - 10,
    marginLeft: 5,
    backgroundColor: "#ececec"
  },
  searchinput: {
    flex: 1,
    width: width,
    paddingTop: 5,
    backgroundColor: "#ececec",
    alignItems: "flex-start"
  },
  modalButtonsinput: {
    width: width,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#ececec",
    paddingTop: 10,
    paddingBottom: 10
  },
  searchInsideinput: {
    flex: 1,
    width: width - 10,
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
  searchSubSelectedItems: {
    backgroundColor: "white",
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 7,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "#6dbad8"
  },
  basicButtons: {
    width: 70,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  }
});
