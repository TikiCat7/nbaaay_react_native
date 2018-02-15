import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Font } from 'expo';
import CompactYoutubeCard from './CompactYoutubeCard';
import {Icon} from 'native-base'
import axios from 'axios';

class MatchDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      match: {},
      youtubevideos: [],
      show: false,
      fontLoaded: false,
    }
  }

  static navigationOptions = {
    title: `Match Detail`,
  }

  async componentDidMount() {
    const matchId = this.props.navigation.state.params.matchId;
    let data = await axios.get(`http://ec2-18-216-119-191.us-east-2.compute.amazonaws.com/match/${matchId}`);
    await Font.loadAsync({
      'fugazone-regular': require('../assets/fonts/FugazOne-Regular.ttf'),
    });
    this.setState({
      match: data.data,
      youtubevideos: this.sortVideosById(data.data.youtubevideos),
      show: true,
      fontLoaded: true,
    });
  }

  sortVideosById(videos) {
    return videos.sort((a,b) => a.id > b.id ? -1 : 1);
  }

  render() {
    return (

      <View style={{ flex: 1 }}>
        {
          this.state.show && this.state.fontLoaded &&
         [
           <View key='1' style={{ backgroundColor: 'white', marginBottom: 20, padding: 20 }}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text>Match Detail</Text>
                <Text>MatchID: {this.state.match.matchId}</Text>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text>Match Thread: {this.state.match.thread ? 'Exists' : 'Not Found'}</Text>
                <Text>Post Game Thread: {this.state.match.postGameThread ? 'Exists' : 'Not Found'}</Text>
              </View>
           </View>,
          <View key='2' style={[{flex: 1, justifyContent: 'center', alignItems: 'center'}, styles.youtubeCardList]}>
            <Text>Match Youtube Videos</Text>
            <Text>Video's Found: {this.state.youtubevideos.length}</Text>
            <FlatList
              data={this.state.youtubevideos}
              renderItem={({item}) => <CompactYoutubeCard navigation={this.props.navigation} key={item.videoId} video={item} />}
              keyExtractor={(item, index) => index}
            />
          </View>,
          ]
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  youtubeCardList: {
    // flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',

  },
});

export default MatchDetail;
