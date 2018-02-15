import React, { Component } from 'react';
import { View, Text, StyleSheet, WebView, Animated, Dimensions } from 'react-native';

class YoutubeVideo extends Component {
  constructor(props) {
    super(props);
      this.state = {
        videoAnimation: new Animated.Value(0)
      }
  }

  static navigationOptions = {
    // header: null,
  }

  componentDidMount() {
    Animated.timing(this.state.videoAnimation, {
      toValue: 1,
      duration: 2000,
    }).start(0)
  }

  render() {
    // video id passed in from navigation.navigate
    const videoId = this.props.navigation.state.params.videoId;
    const createYoutubeAnimation = (animation) => {
      const translateY = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 200]
      });
      return {
        opacity: animation,
        transform: [{
          translateY
        }]
      }
    }
    const youtubeStyle = createYoutubeAnimation(this.state.videoAnimation);

    return (
      <Animated.View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
        <Animated.View style={{width: 350, height: 200}}>
        <Text>{this.props.videoId}</Text>
          <WebView
            style={[]}
            ref={(ref) => { this.videoPlayer = ref;}}
            scalesPageToFit
            source={{ html: '<html><meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" /><iframe src="https://www.youtube.com/embed/' + videoId + '?modestbranding=1&playsinline=1&showinfo=0&rel=0&autoplay=1" frameborder="0" style="overflow:hidden;overflow-x:hidden;overflow-y:hidden;height:100%;width:100%;position:absolute;top:0px;left:0px;right:0px;bottom:0px" height="100%" width="100%"></iframe></html>'}}
          />
        </Animated.View>
      </Animated.View>
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

export default YoutubeVideo;

// streamable stuff
const streamable =  (
  <WebView
    ref={ref => this.video = ref}
    style={[{ width: 100, height: 50}]}
    source={{uri: 'aaa' }}
    injectedJavaScript={jsCode}
    mediaPlaybackRequiresUserAction={true}
    javaScriptEnabled
    scalesPageToFit
  />
)

const jsCode = `
document.querySelector('.bottombanner').remove()
`;
