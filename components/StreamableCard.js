import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet, Button, Share  } from 'react-native';
import { Icon } from 'native-base';
import { Font } from 'expo';
import moment  from 'moment';

class StreamableCard extends Component {

  state = {
    fontLoaded: false,
    modalVisible: false,
  }

  async componentDidMount() {
    await Font.loadAsync({
      'fugazone-regular': require('../assets/fonts/FugazOne-Regular.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  handleStreamablePress() {
    this.props.navigation.navigate('Streamable', {url: this.props.streamable.url, id: this.props.streamable.id});
  }

  openModal() {
    this.setState({modalVisible:true});
  }

  closeModal() {
    this.setState({modalVisible:false});
  }

  async shareMessage() {
    try {
      await Share.share({ url: this.props.streamable.url});
    } catch(error) {
      console.log('something went wrong sharing');
      console.log(error);
    } finally {
      console.log('shared successfully!');
    }
  }

  render() {
    return (
      <View style={{ marginTop: 5 }}>
        <TouchableWithoutFeedback onPress={this.handleStreamablePress.bind(this)}>
          <View style={styles.container}>
            <View style={styles.titleContainer}>
              <View style={styles.title}>
                <Text style={{ fontSize: 12, color: 'grey', marginBottom: 5}}>{moment(this.props.streamable.createdISODate).format('YYYY-MM-DD HH:hh')}</Text>
                <Text style={{ fontWeight: '800' }}>{this.props.streamable.title}</Text>
                <Text style={{ fontSize: 12, marginTop: 5, color: '#4c77ce' }}>u/{this.props.streamable.author}</Text>
              </View>
            </View>
            <View style={styles.statsContainer}>
              <View style={styles.statContainer}>
                <Text>🔥</Text>
                {/* <Icon name='md-arrow-round-up' style={{fontSize: 20, color: 'orange' }} /> */}
                <Text style={{ fontFamily: 'fugazone-regular' }}>{this.props.streamable.score.toLocaleString()}</Text>
              </View>
              <View style={styles.statContainer}>
                <Icon name='md-chatboxes' style={{fontSize: 20, color: 'grey', marginRight: 5, marginLeft: 5 }} />
                <Text style={{ fontFamily: 'fugazone-regular'}}>{this.props.streamable.numComments.toLocaleString()}</Text>
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
        </TouchableWithoutFeedback>
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
    padding: 10,
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

export default StreamableCard;
