import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { StackNavigator } from 'react-navigation'
import { Icon } from 'native-base';
import axios from 'axios';
import YoutubeCard from '../YoutubeCard';
import VideoList from '../VideoList';
import YoutubeVideo from '../YoutubeVideo';

class VideoTab extends Component {
  constructor(props) {
    super();
  }
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <Icon name='logo-youtube' style={{color:tintColor}} />
    )
  }

  render() {
    return (
      <VideoStack screenProps={{appTabNavigation: this.props.screenProps.appTabNavigator,rootNavigation: this.props.navigation}} />
    );
  }
}

const VideoStack = StackNavigator({
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
  });

export default VideoTab;
