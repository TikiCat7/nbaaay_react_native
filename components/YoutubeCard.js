import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight, Dimensions  } from 'react-native';
import { Font } from 'expo';
import { NavigationActions } from 'react-navigation';

const { width } = Dimensions.get('window');

class YoutubeCard extends Component {

  state = {
    fontLoaded: false,
  }

  static navigationOptions = {
    // header: null,
  }

  async componentDidMount() {
    await Font.loadAsync({
      'fugazone-regular': require('../assets/fonts/FugazOne-Regular.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  handleVideoPress() {
    this.props.navigation.navigate('Video', {videoId: this.props.video.videoId});
  }

  handleMatchPress() {
    // wow this library is nutty
    const navigateAction = NavigationActions.navigate({
      routeName: 'MatchTab',
      params: {},
      action: this.props.navigation.navigate('MatchDetail', {matchId: this.props.video.match.matchId})
    });
    this.props.navigation.dispatch(navigateAction);
  }

  handlePlayerPress(player) {
    this.props.navigation.navigate('Player', { playerId: player.id, teamId: player.teamId, playerImageId: player.playerId, navigation: this.props.navigation })
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
        <View style={{ flex: 1 }}>
          <Text style={{ position: 'relative', backgroundColor: 'black', color: 'white', fontFamily: 'fugazone-regular', padding: 2}}>
            {this.props.video.videoType.toUpperCase()}
          </Text>
          <TouchableHighlight onPress={this.handleVideoPress.bind(this)}>
            <Image style={{ flex: 1, width, height: 180}}
              source={{uri: this.props.video.thumbnailUrlLarge}}
              resizeMode='cover'
            />
          </TouchableHighlight>
        </View>
        {
          this.state.fontLoaded && [
            <View key='1' style={{flex: 1, flexDirection: 'row', paddingTop: 30}}>
              <View style={{ flex: 1, backgroundColor: 'white'  }}>
                <Text numberOfLines={2} style={{ fontWeight: "800"}}>{this.props.video.title}</Text>
              </View>
            </View>,
            <View key='2' style={{flex: 1, flexDirection: 'row', padding: 10}}>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around',}}>
              <TouchableHighlight onPress={this.handleMatchPress.bind(this)}>
                <View style={{ justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: 'black', padding: 10, backgroundColor: 'white'}}>
                  <Text style={{fontFamily: 'fugazone-regular'}}>{this.props.video.match.hTeamTriCode} (H) vs {this.props.video.match.vTeamTriCode} (A)</Text>
                  <Text>{this.props.video.match.hTeamScore} : {this.props.video.match.vTeamScore}</Text>
                </View>
              </TouchableHighlight>
                {
                  this.props.video.player.length === 1 &&
                  <View style={{ justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: 'black', padding: 10, backgroundColor: 'white'}}>
                    <TouchableHighlight onPress={() => this.handlePlayerPress(this.props.video.player[0])}>
                      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image style={{ width: 50, height: 50, borderRadius: 25.5 }}
                          source={{ uri: `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/${this.props.video.player[0].teamId}/2017/260x190/${this.props.video.player[0].playerId}.png` }}
                          resizeMode='cover'
                        />
                        <Text style={{ fontFamily: 'fugazone-regular', }}>{this.props.video.player[0].name.toUpperCase()}</Text>
                      </View>
                    </TouchableHighlight>
                  </View>
                }

                {
                  this.props.video.player.length >= 2 &&
                  <View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: 'black', padding: 10, backgroundColor: 'white', marginBottom: 10}}>
                      <TouchableHighlight onPress={() => this.handlePlayerPress(this.props.video.player[0])}>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Image style={{ width: 50, height: 50, borderRadius: 25.5 }}
                            source={{ uri: `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/${this.props.video.player[0].teamId}/2017/260x190/${this.props.video.player[0].playerId}.png` }}
                              resizeMode='cover'
                            />
                            <Text style={{ fontFamily: 'fugazone-regular', }}>{this.props.video.player[0].name.toUpperCase()}</Text>
                        </View>
                      </TouchableHighlight>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: 'black', padding: 10, backgroundColor: 'white'}}>
                      <TouchableHighlight onPress={() => this.handlePlayerPress(this.props.video.player[1])}>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Image style={{ width: 50, height: 50, borderRadius: 25.5 }}
                            source={{ uri: `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/${this.props.video.player[1].teamId}/2017/260x190/${this.props.video.player[1].playerId}.png` }}
                              resizeMode='cover'
                            />
                            <Text style={{ fontFamily: 'fugazone-regular', }}>{this.props.video.player[1].name.toUpperCase()}</Text>
                        </View>
                      </TouchableHighlight>
                    </View>
                  </View>
                }
              </View>
            </View>,
          ]
        }
      </View>
    );
  }
}

export default YoutubeCard;
