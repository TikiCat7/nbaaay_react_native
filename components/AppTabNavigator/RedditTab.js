import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Icon } from 'native-base';

class RedditTab extends Component {

  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <Icon name='logo-reddit' style={{color:tintColor}} />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>RedditTab</Text>
      </View>
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

export default RedditTab;
