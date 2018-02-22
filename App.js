import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import MainScreen from './components/MainScreen';
import SplashScreen from './components/SplashScreen';

export default class App extends React.Component {
  render() {
    return (
      <AppStackNavigator />
    );
  }
}

const AppStackNavigator = StackNavigator({
  // Splash: {
  //   screen: SplashScreen,
  // },
  Main: {
    screen: MainScreen,
    navigationOptions: {
      header: null,
    }
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
