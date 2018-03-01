import React, { Component } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Animated, StatusBar, TouchableWithoutFeedback } from 'react-native';
import { Asset } from 'expo';
import { StackNavigator, NavigationActions } from 'react-navigation';
import RedditComment from './RedditComment';
import axios from 'axios';
import { Icon } from 'native-base';
import images from '../utils/teamImages';
import { Dimensions, Platform } from 'react-native';

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 80;
const SMALL_HEADER_TRANSLATE_Y = 50;

let d = Dimensions.get('window');
const { height, width } = d;

let isIphoneX = (
  // This has to be iOS duh
  Platform.OS === 'ios' &&

  // Accounting for the height in either orientation
  (height === 812 || width === 812)
);


class Thread extends Component {

  constructor(props) {
    super(props);
    this.scrollY = new Animated.Value(0);
  }

  state = {
    refreshData: false,
    show: false,
    refreshing: false,
    showSmallTitle: false,
  }

  async componentWillMount() {

    const images = [
      require('../assets/images/team-logos/ATL_logo.png'),
      require('../assets/images/team-logos/BOS_logo.png'),
      require('../assets/images/team-logos/BKN_logo.png'),
      require('../assets/images/team-logos/CHA_logo.png'),
      require('../assets/images/team-logos/CHI_logo.png'),
      require('../assets/images/team-logos/CLE_logo.png'),
      require('../assets/images/team-logos/DAL_logo.png'),
      require('../assets/images/team-logos/DEN_logo.png'),
      require('../assets/images/team-logos/DET_logo.png'),
      require('../assets/images/team-logos/GSW_logo.png'),
      require('../assets/images/team-logos/HOU_logo.png'),
      require('../assets/images/team-logos/IND_logo.png'),
      require('../assets/images/team-logos/LAC_logo.png'),
      require('../assets/images/team-logos/LAL_logo.png'),
      require('../assets/images/team-logos/MEM_logo.png'),
      require('../assets/images/team-logos/MIA_logo.png'),
      require('../assets/images/team-logos/MIL_logo.png'),
      require('../assets/images/team-logos/MIN_logo.png'),
      require('../assets/images/team-logos/NOP_logo.png'),
      require('../assets/images/team-logos/NYK_logo.png'),
      require('../assets/images/team-logos/OKC_logo.png'),
      require('../assets/images/team-logos/ORL_logo.png'),
      require('../assets/images/team-logos/PHI_logo.png'),
      require('../assets/images/team-logos/PHX_logo.png'),
      require('../assets/images/team-logos/POR_logo.png'),
      require('../assets/images/team-logos/SAC_logo.png'),
      require('../assets/images/team-logos/SAS_logo.png'),
      require('../assets/images/team-logos/TOR_logo.png'),
      require('../assets/images/team-logos/UTA_logo.png'),
      require('../assets/images/team-logos/WAS_logo.png'),
    ];
    const imageAssets = Asset.loadAsync(images);
    await Promise.all([...imageAssets]);
    await this.refreshData();
    this.props.navigation.setParams({ title: this.state.thread.title });
  }

  refreshData() {
    let id = this.props.navigation.state.params.threadId;
    let type = this.props.navigation.state.params.type;
    return new Promise((resolve, reject) => {
      this.setState({
        refreshData: true,
      }, async () => {
        let data = await axios.get(`http://ec2-18-216-119-191.us-east-2.compute.amazonaws.com/${type}/${id}?includeTopComments=true`);
        this.setState({
          thread: data.data,
          show: true,
        }, () => {
          resolve();
        });
      });
    });
  }

  render() {
    let AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

    const headerY = this.scrollY.interpolate({
      inputRange: [0, 100],
      outputRange: [0, -(HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
      extrapolate: 'clamp'
    });

    const headerYStyle = {
      transform: [
        {translateY: headerY}
      ]
    };

    const headerTitleOpacity = this.scrollY.interpolate({
      inputRange: [0, 100],
      outputRange: [1, 0],
      extrapolate: 'clamp'
    });

    const headerTeamLogoOpacity = this.scrollY.interpolate({
      inputRange: [0, 100],
      outputRange: [0.1, 0],
      extrapolate: 'clamp'
    });

    const headerTeamLogoScale = this.scrollY.interpolate({
      inputRange: [0, 100],
      outputRange: [1, 1.2],
      extrapolate: 'clamp'
    });

    const headerLogoScaleStyle = {
      transform: [
        {scale: headerTeamLogoScale}
      ]
    };

    const headerTeamIconOpacity = this.scrollY.interpolate({
      inputRange: [0, 100, 130, 150],
      outputRange: [0, 0, 0, 1],
      extrapolate: 'clamp'
    });

    const headerTeamIconTranslateY = this.scrollY.interpolate({
      inputRange: [0, 100, 150],
      outputRange: [0, 0, -(SMALL_HEADER_TRANSLATE_Y)],
      extrapolate: 'clamp'
    });

    const backButtonTranslateY = this.scrollY.interpolate({
      inputRange: [0 , 100],
      outputRange: [0, 120],
      extrapolate: 'clamp'
    });

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>
      {
        this.state.show &&
        [
          <Animated.View key='1' style={[{ flex: 1, height: '100%', padding: 5 }]}>
            <AnimatedFlatList
              style={{}}
              contentContainerStyle={{ marginTop: HEADER_MAX_HEIGHT }}
              data={this.state.thread.topComments}
              renderItem={({ item }) => <RedditComment text={item.body} author={item.author} score={item.score} html={item.body_html} />}
              keyExtractor={(item, index) => index}
              onRefresh={this.refreshData.bind(this)}
              refreshing={this.state.refreshing}
              onScrollEndDrag={() => {

              }}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: this.scrollY } } }],
                {
                  useNativeDriver: true,
                  listener: (event) => {
                    // if (event.nativeEvent.contentOffset.y > 99) {
                    //   this.setState({
                    //     showSmallTitle: true,
                    //   })
                    // } else {
                    //   this.setState({
                    //     showSmallTitle: false,
                    //   })
                    // }
                  }
                }
              )}
              scrollEventThrottle={16}
            />
          </Animated.View>
          ,
            <Animated.View key='2' style={[styles.headerStyle, headerYStyle, { backgroundColor: this.props.navigation.state.params.type === 'thread' ? '#7AF0AC': '#5163F0' }]}>
            <Animated.View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'space-around', zIndex: 3 }}>
              <View style={{ position: 'absolute', width: '100%', height: HEADER_MAX_HEIGHT, top: 0, right: -170  }}>
                <Animated.Image source={images[this.props.navigation.state.params.vTeamTri]} style={[{ flex: 1, alignSelf: 'flex-start', width: '100%', height: '100%', opacity: headerTeamLogoOpacity, marginBottom: 5 }, headerLogoScaleStyle]} resizeMode='cover' />
              </View>
              <View style={{ position: 'absolute', width: '100%', height: HEADER_MAX_HEIGHT, top: 0, left: -170 }}>
                <Animated.Image source={images[this.props.navigation.state.params.hTeamTri]} style={[{ flex: 1, alignSelf: 'flex-end', width: '100%', height: '100%', opacity: headerTeamLogoOpacity, marginBottom: 5 }, headerLogoScaleStyle]} resizeMode='cover' />
              </View>
              <TouchableWithoutFeedback onPress={() => this.props.navigation.dispatch(NavigationActions.back())}>
                <Animated.View style={{ position: 'absolute', top: '15%', left: '2%', transform: [{ translateY: backButtonTranslateY }] }}>
                  <Text style={{ color: 'white', fontSize: 30 }}>
                    ←
                  </Text>
                </Animated.View>
              </TouchableWithoutFeedback>
              <Animated.Text style={[styles.headerTitleStyle, { marginTop: '10%', width: '80%', opacity: headerTitleOpacity, }]}>
                {this.state.thread.title}
              </Animated.Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '80%' }}>
                <Animated.Text style={[styles.headerTitleStyle, { fontSize: 12, opacity: headerTitleOpacity, marginTop: 10 }]}>
                  u/{this.state.thread.author}
                </Animated.Text>
                <Animated.Text style={[styles.headerTitleStyle, { fontSize: 12, opacity: headerTitleOpacity, marginTop: 10, alignItems: 'center', justifyContent: 'center' }]}>
                  🔥{this.state.thread.score}
                </Animated.Text>
                <Animated.Text style={[styles.headerTitleStyle, { fontSize: 12, opacity: headerTitleOpacity, marginTop: 10, alignItems: 'center', justifyContent: 'center' }]}>
                  <Icon name='md-chatboxes' style={{ fontSize: 15, color: 'white' }} />{this.state.thread && this.state.thread.numComments}
                </Animated.Text>
              </View>
            </Animated.View>
            <Animated.View style={{ position: 'absolute', top: isIphoneX ? HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + SMALL_HEADER_TRANSLATE_Y + 10: HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + SMALL_HEADER_TRANSLATE_Y, width: '100%', height: HEADER_MIN_HEIGHT, left: 0, justifyContent: 'center', alignItems: 'center', transform: [{ translateY: headerTeamIconTranslateY}]}}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center',}}>
                <Animated.Image source={images[this.props.navigation.state.params.hTeamTri]} style={{ width: 50, height: 50, opacity: headerTeamIconOpacity }} />
                <Animated.Text style={[styles.headerTitleStyle, { opacity: headerTeamIconOpacity }]}>{this.props.navigation.state.params.typeText}</Animated.Text>
                <Animated.Image source={images[this.props.navigation.state.params.vTeamTri]} style={{ width: 50, height: 50, opacity: headerTeamIconOpacity }} />
              </View>
            </Animated.View>
          </Animated.View>,
        ]
      }
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    height: '100%'
  },
  headerStyle: {
    zIndex: 3,
    flex: 1,
    position: 'absolute',
    height: HEADER_MAX_HEIGHT,
    width: '100%',
    left: 0,
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 2
  },
  headerTitleStyle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '800',
    // width: '80%',
    textAlign: 'center',
    // marginTop: 20,
    // borderWidth: 2,
  }
})

export default Thread;
