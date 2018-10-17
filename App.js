import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity
} from "react-native";
import reducer from "./Reducer/reducer";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { AppLoading, Asset, Font } from "expo";
import {
  createSwitchNavigator,
  createDrawerNavigator,
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import CheckAuth from "./Components/Auth";
import Login from "./Components/Auth/Login";
import RateList from "./Components/Rate";
import RateInput from "./Components/Rate/RateInput";
import RateModify from "./Components/Rate/RateModify";
import RateSearchMain from "./Components/Rate/RateSearchMain";
import RateSearch from "./Components/Rate/RateSearch";
import DrawerContainer from "./Components/Drawer";
import ProfileUpdate from "./Components/Account/ProfileUpdate";
import FriendsUpdate from "./Components/Account/FriendsUpdate";
import LogoutScreen from "./Components/Auth/Logout";
import linerimages from "./Components/images/index";
import Ionicons from "react-native-vector-icons/Ionicons";

const AccountTab = createBottomTabNavigator(
  {
    Profile: { screen: ProfileUpdate },
    Friends: { screen: FriendsUpdate }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Profile") {
          iconName = `ios-folder-open${focused ? "" : "-outline"}`;
        } else if (routeName === "Friends") {
          iconName = `ios-search${focused ? "" : "-outline"}`;
        }

        return <Ionicons name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: "#6dbad8",
      inactiveTintColor: "grey"
    }
  }
);

const RateScreen = createStackNavigator({
  Rates: { screen: RateList },
  Modify: { screen: RateModify },
  Input: { screen: RateInput },
  SearchMain: { screen: RateSearchMain },
  Search: { screen: RateSearch }
});

const HomeScreen = createSwitchNavigator(
  {
    CheckAuth: { screen: CheckAuth },
    Auth: { screen: Login },
    Rates: { screen: RateScreen }
  },
  {
    initialRouteName: "CheckAuth"
  }
);

const AppDrawer = createDrawerNavigator(
  {
    RateListDrawer: { screen: HomeScreen },
    ProfileDrawer: { screen: AccountTab },
    Logout: { screen: LogoutScreen }
  },
  {
    contentComponent: DrawerContainer
  }
);

let store = createStore(reducer);

export default class App extends React.Component {
  state = {
    isLoadingComplete: false
  };
  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Provider store={store}>
          <AppDrawer />
        </Provider>
      );
    }
  }
  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require("./Components/images/liners_image/APL.png"),
        require("./Components/images/liners_image/CK.png"),
        require("./Components/images/liners_image/CMA-CGM.png"),
        require("./Components/images/liners_image/COSCO.png"),
        require("./Components/images/liners_image/EMI.png"),
        require("./Components/images/liners_image/EVER.png"),
        require("./Components/images/liners_image/FESCO.png"),
        require("./Components/images/liners_image/HEUNGA.png"),
        require("./Components/images/liners_image/HMM.png"),
        require("./Components/images/liners_image/HSUD.png"),
        require("./Components/images/liners_image/KMTC.png"),
        require("./Components/images/liners_image/MCC.png"),
        require("./Components/images/liners_image/MSC.png"),
        require("./Components/images/liners_image/MSK.png"),
        require("./Components/images/liners_image/NS.png"),
        require("./Components/images/liners_image/ONE.png"),
        require("./Components/images/liners_image/OOCL.png"),
        require("./Components/images/liners_image/PIL.png"),
        require("./Components/images/liners_image/RCL.png"),
        require("./Components/images/liners_image/SAF.png"),
        require("./Components/images/liners_image/SINOKOR.png"),
        require("./Components/images/liners_image/TS.png"),
        require("./Components/images/liners_image/WANHAI.png"),
        require("./Components/images/liners_image/YML.png")
      ])
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ececec",
    justifyContent: "center",
    alignItems: "center"
  }
});
