import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native';

const { width } = Dimensions.get('window');

class CompactYoutubeCard extends Component {
  render() {
    const video = this.props.video;
    return (
      <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Video', { videoId: video.videoId })}>
        <View style={[ styles.compactYoutubeCard ]}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image style={{ width: 50, height: 50, borderRadius: 25.5, }}
              source={{uri: video.thumbnailUrlLarge}}
              resizeMode='cover'
            />
          </View>
          <View style={{ flex: 3 }}>
            <Text numberOfLines={2}>{video.title}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  compactYoutubeCard: {
    flex: 1,
    flexDirection: 'row',
    // borderWidth: 2,
    // borderColor: 'black',
    // height: 80,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
    // marginLeft: 10,
    // marginRight: 10,
    width: width - 30,
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
});

export default CompactYoutubeCard;
