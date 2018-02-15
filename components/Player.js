import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, FlatList, StyleSheet, Image } from 'react-native';
import axios from 'axios';

import CompactYoutubeCard from './CompactYoutubeCard';

class Player extends Component {

  state = {
    fetched: false,
  }

  async componentDidMount() {
    let data = await axios.get(`http://ec2-18-216-119-191.us-east-2.compute.amazonaws.com/player/${this.props.navigation.state.params.playerId}`);
    this.setState({
      playerData: data.data,
      youtubeVideos: this.sortVideosById(data.data.youtubevideos),
      fetched: true,
    });
  }

  sortVideosById(videos) {
    return videos.sort((a, b) => a.id > b.id ? -1 : 1);
  }

  render() {
    const { playerData, youtubeVideos } = this.state;

    return (
      <View style={styles.container}>
      {
        this.state.fetched &&
        <View style={styles.playerProfile}>
          <View style={styles.playerDetail}>
            <Image style={{ width: 50, height: 50, borderRadius: 25.5 }}
              source={{ uri: `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/${this.props.navigation.state.params.teamId}/2017/260x190/${this.props.navigation.state.params.playerImageId}.png` }}
              resizeMode='cover'
            />
            <Text>{playerData.name}</Text>
            <Text>#{playerData.number}</Text>
            <Text>{playerData.teamName}</Text>
          </View>
            {
              youtubeVideos.length > 0 ?
                <View style={styles.videoList}>
                  <Text>Youtube Videos for {playerData.name}</Text>
                  <FlatList
                    data={youtubeVideos}
                     // reusing components :)
                    renderItem={({ item }) => <CompactYoutubeCard Card navigation={this.props.navigation.state.params.navigation} key={item.videoId} video={item} />}
                    keyExtractor={(item, index) => index}
                  />
                </View> :
                <View style={styles.videoList}>
                  <Text>No Videos Found :(</Text>
                </View>
            }
        </View>
      }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  playerProfile: {
    flex: 1,
    // borderWidth: 2,
    // borderColor: 'green',
  },
  playerDetail: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 10,
  },
  videoList: {
    flex: 3,
    // borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    // borderColor: 'blue',
  }
})

export default Player;
