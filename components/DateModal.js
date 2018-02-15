import React, { Component } from 'react';
import { View, Text, Button  } from 'react-native';

class DateModal extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center', borderWidth: 2, borderColor: 'red'}}>
        <Text> Date Modal!</Text>
        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Back"
        />
      </View>
    );
  }
}

export default DateModal;
