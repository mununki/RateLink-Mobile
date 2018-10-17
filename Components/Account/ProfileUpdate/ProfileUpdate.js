import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
  ActivityIndicator
} from "react-native";
import { ImagePicker } from "expo";
import Ionicons from "react-native-vector-icons/Ionicons";
import FriendCard from "./FriendCard";

const { height, width } = Dimensions.get("window");

export default class ProfileUpdate extends React.Component {
  state = {
    profile_name: "",
    job_boolean: "",
    company: "",
    image: "https://www.rate-link.com/static/account/profileimages/blank.png",
    newImage: false,
    isSaving: false,
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    showers: [],
    readers: [],
    isDropdownShow: false,
    cameraPermission: true,
    showerTapSelected: false,
    readerTapSelected: true
  };

  componentDidMount() {
    this._getProfile();
    this._checkIfCameraDisabled();
    this._getShowers();
    this._getReaders();
  }

  render() {
    const {
      profile_name,
      job_boolean,
      company,
      image,
      isSaving,
      isDropdownShow,
      width,
      height,
      x,
      y,
      showers,
      readers,
      showerTapSelected,
      readerTapSelected
    } = this.state;
    const items = { "": "---", 1: "선사", 2: "포워더", 3: "기타" };
    return (
      <TouchableWithoutFeedback
        onPress={() =>
          this.setState({
            isDropdownShow: false
          })
        }
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Ionicons
              name={"ios-menu"}
              size={25}
              color={"white"}
              onPress={() => this.props.navigation.toggleDrawer()}
              style={{ paddingLeft: 20, paddingRight: 20 }}
            />
            <Text style={styles.headerTitle}>프로필 관리</Text>
            <View style={{ width: 30 }} />
          </View>
          {/* BODY */}
          <View style={styles.body}>
            <View style={styles.card}>
              <TouchableOpacity onPress={this._pickImage}>
                <View style={styles.profileborder}>
                  <Image
                    style={styles.profileImage}
                    source={{
                      uri: image
                    }}
                  />
                </View>
              </TouchableOpacity>

              <View style={styles.cardr2}>
                <Text style={styles.cardcategory}>별명</Text>
                <Text style={styles.cardcategory}>업종</Text>
                <Text style={styles.cardcategory}>회사명</Text>
              </View>
              <View style={styles.cardr3}>
                <TextInput
                  value={profile_name}
                  onChangeText={text =>
                    this.setState({
                      profile_name: text
                    })
                  }
                  autoCorrect={false}
                  autoCapitalize="none"
                  underlineColorAndroid={"transparent"}
                  style={styles.cardinput}
                />
                <TouchableOpacity
                  onPress={this._toggleDropdown}
                  ref={ref => (this._jobDropdown = ref)}
                  style={[
                    styles.pickerField,
                    isDropdownShow
                      ? { borderWidth: 1, borderColor: "#CCC" }
                      : { borderBottomWidth: 1, borderColor: "#6dbad8" }
                  ]}
                  onLayout={event =>
                    this.setState({
                      width: event.nativeEvent.layout.width,
                      height: event.nativeEvent.layout.height
                    })
                  }
                >
                  <Text>
                    {job_boolean === null ? items[""] : items[job_boolean]}
                  </Text>
                </TouchableOpacity>

                <TextInput
                  value={company}
                  onChangeText={text =>
                    this.setState({
                      company: text
                    })
                  }
                  autoCorrect={false}
                  autoCapitalize="none"
                  underlineColorAndroid={"transparent"}
                  style={styles.cardinput}
                />
              </View>
              <View style={styles.cardr4}>
                {isSaving ? (
                  <View style={styles.saveButton}>
                    <ActivityIndicator color="white" />
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        isSaving: true
                      });
                      this._updateProfileImage();
                    }}
                    style={styles.saveButton}
                  >
                    <Text style={{ color: "white" }}>저장</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <View style={styles.scrollarea}>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      showerTapSelected: true,
                      readerTapSelected: false
                    })
                  }
                  style={styles.showerTap}
                >
                  <Text>TELLER</Text>
                  <Text style={{ color: "#CCC" }}># {showers.length}</Text>
                  {showerTapSelected ? (
                    <View
                      style={{
                        position: "absolute",
                        bottom: 0,
                        width: "100%",
                        height: 5,
                        backgroundColor: "#6dbad8",
                        zIndex: 1
                      }}
                    />
                  ) : null}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      showerTapSelected: false,
                      readerTapSelected: true
                    })
                  }
                  style={styles.readerTap}
                >
                  <Text>READER</Text>
                  <Text style={{ color: "#CCC" }}># {readers.length}</Text>
                  {readerTapSelected ? (
                    <View
                      style={{
                        position: "absolute",
                        bottom: 0,
                        width: "100%",
                        height: 5,
                        backgroundColor: "#6dbad8",
                        zIndex: 1
                      }}
                    />
                  ) : null}
                </TouchableOpacity>
              </View>
              {showerTapSelected ? (
                <FriendCard
                  items={showers}
                  readers={readers}
                  showerlist={showerTapSelected}
                  _addReader={this._addReader}
                />
              ) : null}

              {readerTapSelected ? (
                <FriendCard
                  items={readers}
                  readers={readers}
                  showerlist={showerTapSelected}
                  _addReader={this._addReader}
                  _deleteReader={this._deleteReader}
                  ID={this.props.ID}
                />
              ) : null}
            </View>
          </View>
          {/* 업종 Dropdown 메뉴 */}
          {isDropdownShow ? (
            <View
              style={{
                position: "absolute",
                width: width,
                top: y + height,
                left: x,
                borderWidth: 1,
                backgroundColor: "white"
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    job_boolean: "",
                    isDropdownShow: false
                  });
                }}
                style={[styles.pickerItem, { height: height }]}
              >
                <Text>{items[""]}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    job_boolean: 1,
                    isDropdownShow: false
                  });
                }}
                style={[styles.pickerItem, { height: height }]}
              >
                <Text>{items[1]}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    job_boolean: 2,
                    isDropdownShow: false
                  });
                }}
                style={[styles.pickerItem, { height: height }]}
              >
                <Text>{items[2]}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    job_boolean: 3,
                    isDropdownShow: false
                  });
                }}
                style={[styles.pickerItem, { height: height }]}
              >
                <Text>{items[3]}</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </TouchableWithoutFeedback>
    );
  }
  _deleteReader = async (readerid, userid) => {
    const { API_URL, TOKEN } = this.props;
    await fetch(API_URL + "/ratereader/" + readerid + "/", {
      method: "DELETE",
      headers: {
        Authorization: "JWT " + TOKEN
      }
    })
      .then(response => {
        this._getReaders();
      })
      .catch(error => console.log(error));
  };
  _addReader = async userid => {
    const { API_URL, TOKEN, ID } = this.props;
    let data = {
      shower: ID,
      reader: userid
    };
    await fetch(API_URL + "/ratereader/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " + TOKEN
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(response => {
        this._getReaders();
      })
      .catch(error => console.log(error));
  };
  _getShowers = async () => {
    const { API_URL, ID, TOKEN } = this.props;
    await fetch(API_URL + "/rateshoweruser/", {
      headers: {
        Authorization: "JWT " + TOKEN
      }
    })
      .then(response => response.json())
      .then(response => {
        this.setState({
          showers: response
        });
      })
      .catch(error => console.log(error));
  };
  _getReaders = async () => {
    const { API_URL, TOKEN } = this.props;
    await fetch(API_URL + "/ratereaderuser/", {
      headers: {
        Authorization: "JWT " + TOKEN
      }
    })
      .then(response => response.json())
      .then(response => {
        this.setState({
          readers: response
        });
        console.log(response);
      })
      .catch(error => console.log(error));
  };
  _checkIfCameraDisabled = async () => {
    const { Permissions } = Expo;
    const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);

    if (status === "granted") {
      this.setState({
        cameraPermission: true
      });
    } else {
      this.setState({
        cameraPermission: false
      });
    }
  };
  _getCameraRollPermission = async () => {
    const { Permissions } = Expo;
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === "granted") {
      this.setState({
        cameraPermission: true
      });
    } else {
      Alert.alert("알림", "카메라/앨범 사용 권한이 거절 되었습니다.", [
        {
          text: "확인",
          onPress: () => this.setState({ cameraPermission: false })
        }
      ]);
    }
  };
  _pickImage = async () => {
    const { cameraPermission } = this.state;
    if (!cameraPermission) {
      this._getCameraRollPermission();
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Images",
      allowsEditing: true,
      aspect: [4, 3]
    });
    if (!result.cancelled) {
      this.setState({ image: result.uri, newImage: true });
    }
  };
  _toggleDropdown = () => {
    this._jobDropdown.measure((x, y, width, height, px, py) => {
      this.setState({
        x: px,
        y: py,
        isDropdownShow: !this.state.isDropdownShow
      });
    });
  };
  _updateState = newState => {
    this.setState(newState);
  };
  _updateProfileImage = async () => {
    if (this.state.newImage) {
      const { API_URL, ID, TOKEN, _checkAuth } = this.props;
      let filename = this.state.image.split("/").pop();
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      let formData = new FormData();
      formData.append("new_profile_image", {
        uri: this.state.image,
        name: filename,
        type: type
      });
      await fetch(API_URL + "/changeprofileimage/", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "JWT " + TOKEN
        },
        body: formData
      }).then(response => {
        this._saveProfile();
      });
    } else {
      this._saveProfile();
    }
  };
  _saveProfile = async () => {
    const { API_URL, ID, TOKEN, _checkAuth } = this.props;

    let data = {
      profile: {
        profile_name: this.state.profile_name,
        job_boolean: this.state.job_boolean,
        company: this.state.company
      }
    };
    await fetch(API_URL + "/userupdate/" + ID + "/", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " + TOKEN
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(response => {
        this.setState({
          isSaving: false
        });
        _checkAuth(
          true,
          TOKEN,
          ID,
          response.profile.profile_name,
          response.profile.image
        );
      })
      .catch(error => console.log(error));
  };
  _getProfile = async () => {
    const { API_URL, ID, TOKEN } = this.props;
    await fetch(API_URL + "/userupdate/" + ID + "/", {
      headers: {
        Authorization: "JWT " + TOKEN
      }
    })
      .then(response => response.json())
      .then(response => {
        this.setState({
          profile_name: response.profile.profile_name,
          job_boolean: response.profile.job_boolean,
          company: response.profile.company,
          image: response.profile.image
        });
      })
      .catch(error => console.log(error));
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  header: {
    width: width,
    ...Platform.select({
      ios: {
        paddingTop: 20,
        height: 63,
        shadowColor: "rgb(50,50,50)",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 1
        }
      },
      android: {
        paddingTop: 24,
        height: 81,
        elevation: 3
      }
    }),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#6dbad8",
    paddingRight: 20
  },
  headerTitle: {
    fontSize: 20,
    color: "white"
  },
  body: {
    flex: 1,
    width: width,
    paddingTop: 3,
    alignItems: "center"
  },
  card: {
    height: 110,
    width: width,
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#DDD"
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  profileborder: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "#AAA",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10
  },
  cardr2: {
    paddingTop: 7,
    paddingLeft: 10,
    paddingRight: 10
  },
  cardr3: {
    paddingLeft: 10,
    paddingRight: 10
  },
  cardr4: {
    width: width / 4,
    alignItems: "flex-end"
  },
  cardcategory: {
    color: "#AAA",
    height: 30,
    paddingTop: 1
  },
  cardinput: {
    width: 100,
    height: 30,
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderColor: "#6dbad8"
  },
  pickerField: {
    width: 100,
    height: 30,
    justifyContent: "center",
    alignItems: "center"
  },
  pickerItem: {
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#CCC"
  },
  saveButton: {
    width: 40,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#6dbad8"
  },
  scrollarea: {
    flex: 1,
    width: width,
    backgroundColor: "white"
  },
  showerTap: {
    height: 55,
    width: width / 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#CCC"
  },
  readerTap: {
    height: 55,
    width: width / 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderLeftWidth: 1,
    borderLeftColor: "#DDD",
    borderBottomWidth: 1,
    borderBottomColor: "#CCC"
  }
});
