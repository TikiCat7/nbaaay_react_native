import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import moment from 'moment';
import axios from 'axios';

import StreamableCard from './StreamableCard';

class StreamableList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      streamables: [],
      show: false,
      refreshing: false,
    }
  }

  async componentDidMount() {
    this.refreshData();
  }

  refreshData() {
    let date = moment().format('YYYYMMDD');
    this.setState({
      refreshData: true,
    }, async () => {
      let data = await axios.get(`http://ec2-18-216-119-191.us-east-2.compute.amazonaws.com/streamablesrecent`);
      this.setState({
        streamables: data.data.sort((a,b) => a.score > b.score ? -1 : 1),
        show: true,
      });
    });
  }

  render() {
    return (
      <View>
        {
          this.state.show &&
          <FlatList
            data={this.state.streamables}
            // iframe of youtube
            // renderItem={({item}) => <Streamable key={item.videoId} video={item} /> }
            // ListHeaderComponent={this.renderHeader}
            renderItem={({item}) => <StreamableCard navigation={this.props.navigation} key={item.id} streamable={item} />}
            keyExtractor={(item, index) => index}
            // ItemSeparatorComponent={this.renderSeparator}
            onRefresh={this.refreshData.bind(this)}
            refreshing={this.state.refreshing}
          />
        }
      </View>
    );
  }
}

export default StreamableList;
