import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Icon } from 'native-base';
import { TabNavigator, StackNavigator }   from 'react-navigation';
import { Font } from 'expo';

import MatchTab from './AppTabNavigator/MatchTab';
import RedditTab from './AppTabNavigator/RedditTab';
import StreamableTab from './AppTabNavigator/StreamableTab';
import VideoTab from './AppTabNavigator/VideoTab';

import Feed from './Feed';
import MatchList from './MatchList';
import MatchDetail from './MatchDetail';
import VideoList from './VideoList';
import YoutubeVideo from './YoutubeVideo';
import StreamableList from './StreamableList';
import Streamable from './Streamable';
import Player from './Player';
import PlayerSearch from './PlayerSearch';
import DateModal from './DateModal';

class MainScreen extends Component {

  state = {
    fontLoaded: false,
  }

  // static navigationOptions = {
  //   // headerLeft: <Icon name='ios-camera-outline' style={{ paddingLeft: 10}}/>,
  //   headerLeft: null,
  //   headerTintColor: "black",
  //   title: "🔥🏀🔥NBAAAY 🔥🏀🔥",
  //   headerStyle: {
  //     backgroundColor: 'white',
  //     elevation: null,
  //     // color: 'white',
  //     // fontFamily: '',
  //   },
  //   headerTitleStyle: {
  //     color: 'black',
  //     fontSize: 15,
  //   },
  //   headerRight: <Icon name="ios-send-outline" style={{paddingRight: 10}}/>
  // }

  async componentDidMount() {
    // console.log(this.props.navigation.goBack())
    await Font.loadAsync({
      'fugazone-regular': require('../assets/fonts/FugazOne-Regular.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    return (
      <AppTabNavigator screenProps={{appTabNavigator: this.props.navigation}}/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default MainScreen;

const MatchStack = StackNavigator({
  MatchList: {
    screen: MatchList,
  },
  MatchDetail: {
    screen: MatchDetail,
  },
  Video: {
    screen: YoutubeVideo,
    navigationOptions: ({ navigation }) => ({
      title: 'Video 📺'
    })
  }
});

const AppTabNavigator = TabNavigator({
  HomeTab: {
    screen: StackNavigator({
      Feed: {
        screen: Feed,
        navigationOptions: ({ navigation }) => ({
          title: 'My Feed'
        })
      }
    }),
  },
  MatchTab: {
    screen: StackNavigator({
      Main: {
        screen: MatchStack,
      },
      // react-navigation only supports full screen modal at the moment 'https://github.com/react-navigation/react-navigation/issues/3273'
      Modal: {
        screen: DateModal,
      }
    },
    {
      mode: 'modal',
      headerMode: 'none',
    }
  ),
  navigationOptions: {
    tabBarIcon: ({ tintColor }) => (
      <Icon name='calendar' style={{ color: tintColor }} />
    )
  }
  },
  VideoTab: {
    screen: StackNavigator({
      VideoList: {
        screen: VideoList,
        navigationOptions: ({ navigation }) => ({
          title: '📺Youtube Videos📺'
        })
      },
      Video: {
        screen: YoutubeVideo,
        navigationOptions: ({ navigation }) => ({
          title: '📺Youtube Video📺'
        })
      },
      Player: {
        screen: Player,
        navigationOptions: ({ navigation }) => ({
          title: 'Player Details'
        })
      },
      }),
    navigationOptions: {
      tabBarIcon: ({tintColor}) => (
        <Icon name='logo-youtube' style={{color:tintColor}} />
      )
    }
  },
  StreamableTab: {
    screen: StackNavigator({
      StreamableList: {
        screen: StreamableList,
        navigationOptions: ({ navigation }) => ({
          title: 'Streamables'
        })
      },
      Streamable: {
        screen: Streamable,
        navigationOptions: ({ navigation }) => ({
          title: 'Streamable'
        })
      },
    }),
    navigationOptions: {
      tabBarIcon: ({tintColor}) => (
        <Icon name='ios-videocam' style={{color:tintColor}} />
      )
    }
  },
  DataTab: {
    screen: StackNavigator({
      PlayerSearch: {
        screen: PlayerSearch,
        navigationOptions: ({navigation}) => ({
          title: 'Player Search'
        })
      },
      Player: {
        screen: Player,
        navigationOptions: ({ navigation }) => ({
          title: 'Player Details'
        })
      },
      Video: {
        screen: YoutubeVideo,
        navigationOptions: ({ navigation }) => ({
          title: 'Video 📺'
        })
      },
    }),
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name='person' style={{ color: tintColor }} />
      )
    }
  },
  },{
    // animationEnabled: true,
    // swipeEnabled: true,
    tabBarPosition: "bottom",
    tabBarOptions: {
      style: {
        ...Platform.select({
          android:{
            backgroundColor: 'white'
          }
        }),
        backgroundColor: 'white'
      },
      activeTintColor: "black",
      inactiveTintColor: "grey",
      showLabel: false,
      showIcon: true,
      // tabStyle: {
      //   backgroundColor: 'black',
      // }
    }
  });
