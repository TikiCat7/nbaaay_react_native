import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { StackNavigator } from 'react-navigation'
import axios from 'axios';
import moment from 'moment';
import { Icon } from 'native-base';
import YoutubeCard from './YoutubeCard';


class VideoList extends Component {
  constructor(props) {
    super();
    this.state =  {
      videos: [],
      scroll: false,
      refreshing: false,
    }
  }
  static navigationOptions = {
    // header: null,
  }

  async componentDidMount() {
    // temporary, grab video for current day based on users location
    this.refreshData();
  }

  async refreshData() {
    this.setState({
      refreshing: true,
    }, async () => {
      try {
        let date = moment().format('YYYYMMDD');
        let data = await axios.get(`http://ec2-18-216-119-191.us-east-2.compute.amazonaws.com/youtubevideos/${date}`);
        this.setState({
          videos: data.data,
          refreshing: false,
        });
      } catch(error) {
        console.log(error);
        this.setState({
          videos: [],
          refreshing: false,
        })
      }
    });
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

  renderHeader = () => {
    return (
      <View style={{ height: 50, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: 'black', marginBottom: 5, backgroundColor: 'white' }}>
        <Text>Search Bar Thing</Text>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
      {
        this.state.videos.length > 0 &&
        <FlatList
          data={this.state.videos}
          // iframe of youtube
          // renderItem={({item}) => <Streamable key={item.videoId} video={item} /> }
          // ListHeaderComponent={this.renderHeader}
          renderItem={({item}) => <YoutubeCard navigation={this.props.navigation} key={item.videoId} video={item} />}
          keyExtractor={(item, index) => index}
          ItemSeparatorComponent={this.renderSeparator}
          onRefresh={this.refreshData.bind(this)}
          refreshing={this.state.refreshing}
          // onScroll={() => console.log('hi')}
        />
      }
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

export default VideoList;
