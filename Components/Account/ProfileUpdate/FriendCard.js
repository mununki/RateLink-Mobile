import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Alert,
  Image
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const { height, width } = Dimensions.get("window");

export default class FriendCard extends React.Component {
  constructor(props) {
    super(props);
    this._checkIfReader = this._checkIfReader.bind(this);
    this._findReaderID = this._findReaderID.bind(this);
  }
  render() {
    const { items, _addReader, showerlist, _deleteReader } = this.props;
    if (items.length < 1) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ color: "#AAA" }}>(친구를 추가할 수 있습니다.)</Text>
        </View>
      );
    } else {
      return (
        <ScrollView style={styles.container}>
          {items.map((item, key) => (
            <View key={key} style={styles.card}>
              <View style={styles.cardr1}>
                <View style={styles.profileborder}>
                  {item.profile.image === null ? (
                    <Image
                      style={styles.profileImage}
                      source={{
                        uri:
                          "https://www.rate-link.com/static/account/profileimages/blank.png"
                      }}
                    />
                  ) : (
                    <Image
                      style={styles.profileImage}
                      source={{
                        uri: item.profile.image
                      }}
                    />
                  )}
                </View>
                <View style={{ justifyContent: "center" }}>
                  <Text style={styles.cardName}>
                    {item.profile.profile_name}
                    {item.profile.company === null ||
                    item.profile.company === ""
                      ? null
                      : " @ " + item.profile.company}
                  </Text>
                  <Text style={styles.cardEmail}>{item.email}</Text>
                </View>
              </View>
              <View>
                {showerlist ? (
                  this._checkIfReader(item) ? null : (
                    <TouchableOpacity
                      onPress={() => {
                        Alert.alert(
                          "알림",
                          "내 운임 정보가 상대에게 보여집니다.",
                          [
                            {
                              text: "취소",
                              onPress: () => console.log("cancelled")
                            },
                            { text: "확인", onPress: () => _addReader(item.id) }
                          ]
                        );
                      }}
                      style={styles.buttons}
                    >
                      <MaterialIcons
                        name={"add-circle"}
                        size={30}
                        style={{ color: "#DDD" }}
                      />
                    </TouchableOpacity>
                  )
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert("알림", "READER 리스트에서 삭제합니다.", [
                        {
                          text: "취소",
                          onPress: () => console.log("cancelled")
                        },
                        {
                          text: "확인",
                          onPress: () => {
                            let index = this._findReaderID(item.who_reads);
                            _deleteReader(item.who_reads[index].id, item.id);
                          }
                        }
                      ]);
                    }}
                    style={styles.buttons}
                  >
                    <MaterialIcons
                      name={"delete"}
                      size={30}
                      style={{ color: "#DDD" }}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        </ScrollView>
      );
    }
  }
  _findReaderID = who_reads => {
    const { ID } = this.props;
    let index = who_reads.findIndex(shower => {
      return shower.shower === ID;
    });
    return index;
  };
  _checkIfReader = item => {
    const { readers } = this.props;
    let index = readers.findIndex(reader => {
      return reader.id === item.id;
    });
    if (index > -1) {
      return true;
    } else {
      return false;
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width
  },
  card: {
    width: width,
    height: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#DDD"
  },
  cardr1: {
    flexDirection: "row"
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  profileborder: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: "#AAA",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10
  },
  cardName: {
    fontSize: 16,
    marginBottom: 5
  },
  cardEmail: {
    color: "#AAA"
  },
  buttons: {
    justifyContent: "center",
    alignItems: "center",
    padding: 15
  }
});
