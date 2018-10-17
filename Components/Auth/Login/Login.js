import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  AsyncStorage,
  TouchableOpacity,
  Dimensions,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import PropTypes from "prop-types";

const { height, width } = Dimensions.get("window");

export default class Login extends React.Component {
  state = {
    email: "",
    nickname: "",
    password: "",
    password1: "",
    password2: "",
    profile_name: "",
    isSignup: false,
    isSuccessSignup: false,
    isSuccessLogin: false
  };
  render() {
    const {
      email,
      nickname,
      password,
      password1,
      password2,
      profile_name
    } = this.state;
    if (this.state.isSignup) {
      return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
            enabled
          >
            <Text style={{ color: "white", fontSize: 25, marginBottom: 20 }}>
              회원가입
            </Text>
            <TextInput
              style={styles.textInput}
              name="email"
              value={email}
              autoCapitalize="none"
              onChangeText={text => {
                this.setState({ email: text });
              }}
              placeholder="Email"
              textAlign="center"
              autoCorrect={false}
              autoCapitalize="none"
              underlineColorAndroid={"transparent"}
            />
            <TextInput
              style={styles.textInput}
              name="nickname"
              value={nickname}
              autoCapitalize="none"
              onChangeText={text => {
                this.setState({ nickname: text, profile_name: text });
              }}
              placeholder="이름"
              textAlign="center"
              autoCorrect={false}
              autoCapitalize="none"
              underlineColorAndroid={"transparent"}
            />
            <TextInput
              style={styles.textInput}
              name="profile_name"
              value={profile_name}
              autoCapitalize="none"
              onChangeText={text => {
                this.setState({ profile_name: text });
              }}
              placeholder="닉네임"
              textAlign="center"
              autoCorrect={false}
              autoCapitalize="none"
              underlineColorAndroid={"transparent"}
            />
            <TextInput
              style={styles.textInput}
              name="password1"
              autoCapitalize="none"
              value={password1}
              onChangeText={text => {
                this.setState({ password1: text });
              }}
              placeholder="PASSWORD"
              textAlign="center"
              autoCorrect={false}
              autoCapitalize="none"
              secureTextEntry={true}
              underlineColorAndroid={"transparent"}
            />
            <TextInput
              style={styles.textInput}
              name="password2"
              autoCapitalize="none"
              value={password2}
              onChangeText={text => {
                this.setState({ password2: text });
              }}
              placeholder="PASSWORD(확인)"
              textAlign="center"
              autoCorrect={false}
              autoCapitalize="none"
              secureTextEntry={true}
              underlineColorAndroid={"transparent"}
            />
            <TouchableOpacity
              onPressOut={this._signupSubmit}
              style={styles.loginButton}
            >
              {this.state.isSuccessSignup ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={{ color: "white", fontSize: 15 }}>회원가입</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPressOut={() => {
                this.setState({ isSignup: false });
              }}
              style={styles.signupCancleButton}
            >
              <Text style={{ color: "white", fontSize: 15 }}>취소</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      );
    } else {
      return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.container}>
            <Text style={{ color: "white", fontSize: 25, marginBottom: 20 }}>
              로그인
            </Text>
            <TextInput
              style={styles.textInput}
              name="email"
              value={email}
              autoCapitalize="none"
              onChangeText={text => {
                this.setState({ email: text });
              }}
              placeholder="Email"
              textAlign="center"
              autoCorrect={false}
              autoCapitalize="none"
              underlineColorAndroid={"transparent"}
            />
            <TextInput
              style={styles.textInput}
              name="password"
              autoCapitalize="none"
              value={password}
              onChangeText={text => {
                this.setState({ password: text });
              }}
              placeholder="PASSWORD"
              textAlign="center"
              autoCorrect={false}
              autoCapitalize="none"
              secureTextEntry={true}
              underlineColorAndroid={"transparent"}
              onSubmitEditing={() => {
                this._loginSubmit();
              }}
            />
            <TouchableOpacity
              onPressOut={() => this._loginSubmit()}
              style={styles.loginButton}
            >
              {this.state.isSuccessLogin ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={{ color: "white", fontSize: 15 }}>로그인</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPressOut={() => this.setState({ isSignup: true })}
              style={styles.signupButton}
            >
              <Text style={{ color: "white", fontSize: 15 }}>회원가입</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      );
    }
  }
  _signupSubmit = async () => {
    const { API_URL } = this.props;
    const data = {
      email: this.state.email,
      nickname: this.state.nickname,
      password: this.state.password1,
      profile: { profile_name: this.state.profile_name }
    };
    await fetch(API_URL + "/signup/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(response => {
        if (response.id) {
          this.setState({
            password: this.state.password1,
            isSuccessSignup: true
          });
          Alert.alert("성공", "회원가입이 성공하였습니다.", [
            { text: "확인", onPress: () => this._loginSubmit() }
          ]);
        } else {
          const errormsg =
            response.email || response.password || response.detail;
          Alert.alert("알림", errormsg[0], [
            { text: "확인", onPress: () => console.log("OK Pressed") }
          ]);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  _loginSubmit = async () => {
    const { API_URL } = this.props;
    const data = {
      email: this.state.email,
      password: this.state.password
    };
    await fetch(API_URL + "-token-auth/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(response => {
        if (response.token) {
          this.setState({
            isSuccessLogin: true
          });
          this._saveToken(
            response.token,
            response.user.id,
            response.user.profile.profile_name,
            response.user.profile.image
          );
        } else {
          Alert.alert("알림", "ID 혹은 PASSWORD가 정확하지 않습니다.", [
            { text: "확인", onPress: () => console.log("OK Pressed") }
          ]);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  _saveToken = async (token, id, profile_name, image) => {
    const { _checkAuth } = this.props;
    const userData = {
      token: token,
      id: id,
      profile_name: profile_name,
      image: image
    };
    await AsyncStorage.setItem("userToken@ratelink", JSON.stringify(userData))
      .then(response => {
        const istoken = true;
        _checkAuth(
          istoken,
          userData.token,
          userData.id,
          userData.profile_name,
          userData.image
        );
        this.props.navigation.navigate("Rates");
      })
      .catch(error => {
        console.log(error);
      });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6dbad8"
  },
  textInput: {
    width: 300,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 5
  },
  loginButton: {
    padding: 10,
    width: 300,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10
  },
  signupButton: {
    padding: 10,
    width: 300,
    borderWidth: 2,
    borderColor: "#266d8c",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#266d8c"
  },
  signupCancleButton: {
    padding: 10,
    width: 300,
    borderWidth: 2,
    borderColor: "#6dbad8",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#6dbad8"
  }
});
