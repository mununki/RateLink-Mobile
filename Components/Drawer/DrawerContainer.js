import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default class DrawerContainer extends React.Component {
  state = {
    x: 0,
    y: 0
  };
  render() {
    const { isToken, API_URL, TOKEN, PROFILE_NAME, IMAGE } = this.props;
    const { x, y } = this.state;
    if (isToken) {
      return (
        <View style={styles.container}>
          <View style={styles.profile}>
            <View style={styles.profileImageArea}>
              <View
                style={styles.profileborder}
                onLayout={event =>
                  this.setState({
                    x: event.nativeEvent.layout.x,
                    y: event.nativeEvent.layout.y
                  })
                }
              >
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("Profile")}
                >
                  {IMAGE === null || IMAGE === "" ? (
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
                        uri: IMAGE
                      }}
                    />
                  )}
                </TouchableOpacity>
              </View>
              <MaterialIcons
                name={"add-circle"}
                size={20}
                style={{
                  position: "relative",
                  right: 8,
                  color: "white"
                }}
              />
            </View>
            <Text style={styles.profileName}>{PROFILE_NAME}</Text>
          </View>
          <View style={styles.body}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Rates")}
            >
              <View style={styles.menuItem}>
                <MaterialIcons name={"inbox"} size={20} />
                <Text style={styles.menuItemFont}>운임검색</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Logout")}
            >
              <View style={styles.menuItem}>
                <MaterialCommunityIcons name={"logout"} size={20} />
                <Text style={styles.menuItemFont}>로그아웃</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.profile}>
            <View style={styles.profileborder}>
              <Image
                style={styles.profileImage}
                source={{
                  uri:
                    "https://www.rate-link.com/static/account/profileimages/blank.png"
                }}
              />
            </View>
            <Text style={styles.profileName}>로그인 하세요.</Text>
          </View>
          <View style={styles.body}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Auth")}
            >
              <View style={styles.menuItem}>
                <MaterialCommunityIcons name={"login"} size={20} />
                <Text style={styles.menuItemFont}>로그인</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  profile: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#6dbad8",
    paddingTop: 30,
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#6dbad8"
  },
  body: {
    flex: 6
  },
  profileImageArea: {
    flexDirection: "row",
    alignItems: "flex-end"
  },
  profileName: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold"
  },
  profileborder: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 3,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 30,
    paddingTop: 20,
    paddingBottom: 20
  },
  menuItemFont: {
    fontSize: 18,
    marginLeft: 10
  }
});
