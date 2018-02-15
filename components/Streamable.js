import React, { Component } from 'react';
import { View, Text, WebView, TouchableWithoutFeedback, Share, StyleSheet, FlatList  } from 'react-native';
import { Font } from 'expo';
import axios from 'axios';
import { Icon } from 'native-base';
import moment from 'moment';
import RedditComment from './RedditComment';

class Streamable extends Component {

  state = {
    streamable: {},
    show: false,
  }

  async componentDidMount() {
    const id = this.props.navigation.state.params.id;
    let data = await axios.get(`http://ec2-18-216-119-191.us-east-2.compute.amazonaws.com/streamable/${id}?includeComments=true`);
    this.setState({
      streamable: data.data,
      show: true,
    })
  }

  async shareMessage() {
    try {
      let result = await Share.share({ url: this.props.navigation.state.params.url});
    } catch(error) {
      console.log('something went wrong sharing');
      console.log(error);
    } finally {
      console.log('done');
    }
  }

  render() {
    const uri = this.props.navigation.state.params.url;

    return (
      <View style={{ flex:1 }}>
        <View style={{ flex: 1, marginBottom: 5 }}>
          <WebView
            ref={webview => { this.myWebView = webview; }}
            injectedJavaScript={jsCode}
            style={{}}
            source={{ html: `<iframe src="${uri}" frameborder="0" style="width: 100%; height: 100%;"></iframe>`}}
          />
        </View>
        {
          this.state.show &&
          <View style={{ flex: 1.7 }}>
            <View style={styles.container}>
              <View style={styles.titleContainer}>
                <View style={styles.title}>
                  <Text style={{ fontSize: 12, color: 'grey' }}>{moment(this.state.streamable.createdISODate).format('YYYY-MM-DD HH:hh')}</Text>
                  <Text numberOfLines={3} style={{ fontWeight: '800' }}>{this.state.streamable.title}</Text>
                  <Text style={{ fontSize: 12, color: '#4c77ce' }}>u/{this.state.streamable.author}</Text>
                </View>
              </View>
              <View style={styles.statsContainer}>
                <View style={styles.statContainer}>
                  <Text>🔥</Text>
                  {/* <Icon name='md-arrow-round-up' style={{fontSize: 20, color: 'orange' }} /> */}
                  <Text style={{ fontFamily: 'fugazone-regular' }}>{this.state.streamable.score.toLocaleString()}</Text>
                </View>
                <View style={styles.statContainer}>
                  <Icon name='md-chatboxes' style={{fontSize: 20, color: 'grey', marginRight: 5, marginLeft: 5 }} />
                  <Text style={{ fontFamily: 'fugazone-regular'}}>{this.state.streamable.numComments.toLocaleString()}</Text>
                </View>
              </View>
              <View style={{ position: 'absolute', left: '100%', top: '0%'}}>
                <TouchableWithoutFeedback onPress={() => this.shareMessage()}>
                  <View style={{ padding: 10, height: 80, marginLeft: -20 }}>
                    <Icon name='md-share' style={{ fontSize: 20, color: 'grey' }}/>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
            <View style={{ flex: 4, margin: 10, backgroundColor: '#E9E9EE', borderRadius: 5}}>
                <FlatList
                  data={this.state.streamable.topComments}
                  // stickyHeaderIndices={[0]}
                  // iframe of youtube
                  // renderItem={({item}) => <Streamable key={item.videoId} video={item} /> }
                  // ListHeaderComponent={this.renderHeader}
                  renderItem={({item}) => <RedditComment text={item.body} author={item.author} score={item.score} html={item.body_html} />}
                  keyExtractor={(item, index) => index}
                  // ItemSeparatorComponent={this.renderSeparator}
                  // onRefresh={this.refreshData.bind(this)}
                  // refreshing={this.state.refreshing}
                />
            </View>
          </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    padding: 15,
    backgroundColor: 'white',
    // borderWidth: 2,
    // borderColor: 'red',
    borderRadius: 5,
  },
  titleContainer: {
    flex: 2,
    // borderWidth: 2,
    // borderColor: 'blue',
  },
  title: {
    flex: 1,
    // borderWidth: 2,
    // borderColor: 'green',
    justifyContent: 'center',
    alignContent: 'center',
  },
  statsContainer: {
    flex: 1,
    // borderWidth: 2,
    // borderColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
    // marginRight: 20,
  },
  statContainer: {
    width: '50%',
    flexDirection: 'row',
    // borderWidth: 2,
    // borderColor: 'red',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 40,
  },
});

const jsCode = `
    document.querySelector('.bottombanner').remove();
    document.querySelector('.container-fluid').remove();
    `;

 const jsScript = `alert('hi!!!')`;


export default Streamable;
