import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Container, Content, Icon, Button } from 'native-base';

class Feed extends Component {

  state = {
    feedElements: [],
  }

  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <Icon name='ios-basketball-outline' style={{color:tintColor}} />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Developing soon...🤔🤔🤔</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  }
})

export default Feed;
