import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, WebView  } from 'react-native';
import moment from 'moment';
import { Icon } from 'native-base';

class RedditComment extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <View style={styles.title}>
            <Text style={{ fontWeight: '800' }}>{this.props.text}</Text>
            <Text style={{ fontSize: 12, marginTop: 5, color: '#4c77ce' }}>u/{this.props.author}</Text>
          </View>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.statContainer}>
            <Text>🔥</Text>
            <Text style={{ fontFamily: 'fugazone-regular' }}>{this.props.score.toLocaleString()}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    // marginLeft: 10,
    // marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
    backgroundColor: 'white',
    // borderWidth: 2,
    // borderColor: 'red',
    borderRadius: 5,
    // marginBottom: 5,
  },
  titleContainer: {
    flex: 5,
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
    // alignItems: 'center',
    justifyContent: 'center',
    // marginRight: 20,
  },
  statContainer: {
    // flex: 1,
    flexDirection: 'row',
    // borderWidth: 2,
    // borderColor: 'red',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginRight: 40,
  },
});

export default RedditComment;
