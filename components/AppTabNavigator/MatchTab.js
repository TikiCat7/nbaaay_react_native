import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { StackNavigator } from 'react-navigation'
import { Icon } from 'native-base';
import axios from 'axios';
import MatchList from '../MatchList';
import MatchDetail from '../MatchDetail';

class MatchTab extends Component {
  constructor(props) {
    super();
  }

  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <Icon name='calendar' style={{color:tintColor}} />
    )
  }

  componentDidMount() {
    this.props.navigation.navigate('MatchDetail')
  }

  render() {
    return (
      <MatchStack screenProps={{rootNavigation: this.props.navigation}} />
    );
  }
}

const MatchStack = StackNavigator({
  MatchList: {
    screen: MatchList,
    // navigationOptions: ({ navigation }) => ({
    //   title: '🔥Match List🔥'
    // })
  },
  MatchDetail: {
    screen: MatchDetail,
    // navigationOptions: ({ navigation }) => ({
    //   title: '🔥Match Details🔥'
    // })
  },
  });

export default MatchTab;
