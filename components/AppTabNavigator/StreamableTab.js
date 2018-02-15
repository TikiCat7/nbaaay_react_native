import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import YoutubeVideo from '../YoutubeVideo';
import { Icon } from 'native-base';
import axios from 'axios';
import YoutubeCard from '../YoutubeCard';

class StreamableTab extends Component {
  constructor(props) {
    super();
    this.state =  {
      videos: [],
    }
  }
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <Icon name='ios-home' style={{color:tintColor}} />
    )
  }

  async componentDidMount() {
    let data = await axios.get('http://ec2-18-216-119-191.us-east-2.compute.amazonaws.com/youtubevideos/20180204');
    this.setState({
      videos: data.data
    })
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          backgroundColor: "#CED0CE",
          marginBottom: 20
          // marginLeft: "14%"
        }}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ height: 50, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: 'black', marginBottom: 5, backgroundColor: 'white' }}>
          <Text>Search Bar Thing</Text>
        </View>
        <FlatList
          data={this.state.videos}
          // iframe of youtube
          // renderItem={({item}) => <Streamable key={item.videoId} video={item} /> }
          renderItem={({item}) => <YoutubeCard key={item.videoId} video={item}/>}
          keyExtractor={(item, index) => index}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // justifyContent: 'center',
    // alignItems: 'center'
  }
})

export default StreamableTab;
