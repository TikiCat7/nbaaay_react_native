import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Animated, Image } from 'react-native';
import { Font } from 'expo';
import CompactYoutubeCard from './CompactYoutubeCard';
import {Icon} from 'native-base'
import axios from 'axios';
import images from '../utils/teamImages';

class MatchDetail extends Component {

  constructor(props) {
    super(props);
    this._animatedValue = new Animated.Value(0);
    this.state = {
      match: {},
      youtubevideos: [],
      show: false,
      fontLoaded: false,
    }
  }

  static navigationOptions = {
    title: `Match Detail!`,
    // header: ({ state }) => {
    //   return {
    //     style: {
    //       position: 'absolute',
    //       backgroundColor: 'red',
    //       top: (!state.params ? 0 : state.params.animatedValue),
    //       left: 0,
    //       right: 0,
    //       overflow: 'hidden',
    //     }
    //   };
    // }
  }

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params
    // console.log(params)

    return {
      title: `Match Detail`,
      headerStyle: {
        transform: [
          {
            translateY: params.animatedValue ? params.animatedValue : 0,
          }
        ],
        // height: 50,
      },
    }
  }

  componentWillMount() {
    this.props.navigation.setParams({
      animatedValue: this._animatedValue.interpolate({
        inputRange: [0, 50],
        outputRange: [0, -100],
        extrapolate: 'clamp'
      })
    });
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

  resetHeaderPos() {
    console.log('called');
    Animated.timing(
      this._animatedValue,
      {
        toValue: 0,
        duration: 1000,
      }
    ).start();
  }

  render() {

    const translateY = this._animatedValue.interpolate({
        inputRange: [0, 50],
        outputRange: [0, -100],
        extrapolate: 'clamp'
      });

    const width = this._animatedValue.interpolate({
      inputRange: [0, 50],
      outputRange: ['75%', '100%'],
      extrapolate: 'clamp'
    });

    const fadeOutStyle = this._animatedValue.interpolate({
      inputRange: [0, 50],
      outputRange: [1, 0],
      extrapolate: 'clamp'
    });

    const maxHeight = this._animatedValue.interpolate({
      inputRange: [0, 50],
      outputRange: [200, 100],
      extrapolate: 'clamp',
    })

    const translateStyle = (translateY) => {
      return {
        transform: [{
          translateY
        }]
      }
    }

    return (

    <Animated.View style={[{ flex: 1 }, translateStyle(translateY)]}>
      {
        this.state.show && this.state.fontLoaded &&
        [
        <Animated.View key='1' style={{ flex: 1, maxHeight: maxHeight, alignItems: 'center', justifyContent: 'center' ,backgroundColor: 'lightgrey', borderWidth: 2, borderColor: 'red'}}>
          <Animated.View style={{ flex: 1, height: 50, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: 'blue', width: width}}>
            <View style={{ alignItems: 'center', justifyContent: 'center',  flex: 1, borderWidth: 2, borderColor: 'green' }}>
              <View style={{ flexDirection: 'row' }}>
                <Image source={images[this.state.match.hTeamTriCode]} style={{ width: 100, height: 100 }} />
                <Image source={images[this.state.match.vTeamTriCode]} style={{ width: 100, height: 100 }} />
              </View>
              <Text>Match Thread: {this.state.match.thread ? 'Exists' : 'Not Found'}</Text>
              <Text>Post Game Thread: {this.state.match.postGameThread ? 'Exists' : 'Not Found'}</Text>
            </View>
          </Animated.View>
        </Animated.View>,
        <View key='2' style={[{flex: 1, justifyContent: 'center', alignItems: 'center'}, styles.youtubeCardList]}>
          <Text>Match Youtube Videos</Text>
          <Text>Video's Found: {this.state.youtubevideos.length}</Text>
          <FlatList
            onScroll={
              Animated.event(
                [{ nativeEvent: { contentOffset: { y: this._animatedValue } } }],
                {
                  listener: (event) => {
                    if (event.nativeEvent.contentOffset.y > 99) {
                      // console.log('more than 99 scrolled')

                    } else {
                      // console.log('scrolling < 99')

                    }
                  }
                },
              )
            }
            scrollEventThrottle={16}
            data={this.state.youtubevideos}
            onScrollEndDrag={this.resetHeaderPos.bind(this)}
            renderItem={({item}) => <CompactYoutubeCard navigation={this.props.navigation} key={item.videoId} video={item} />}
            keyExtractor={(item, index) => index}
          />
        </View>,
      ]
      }
     </Animated.View>
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
