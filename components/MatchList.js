import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, Animated, DatePickerIOS, } from 'react-native';
import MatchCard from './MatchCard';
import axios from 'axios';
import moment from 'moment';
import { Icon } from 'native-base';

const { width, height } = Dimensions.get('window');

class MatchList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      matches: [],
      show: false,
      refreshing: false,
      datePickerOpen: true,
      chosenDate: new Date(),
      datePickerAnimation: new Animated.Value(0),
    }
  }

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      tabBarIcon: ({ tintColor }) => (
        <Icon name='calendar' style={{ color: tintColor }} />
      ),
      title: `Matches for: ${moment().format('YYYY-MM-DD')}`,
      headerRight: (
        <Icon
          onPress={() => params.displayDatePicker()}
          name='calendar'
          style={{ padding:10, color: 'black', marginRight: 10 }}
        />
      )
    }
  }

  // need to set navigation params inorder to access it inside header button components (https://reactnavigation.org/docs/header-buttons.html#header-interaction-with-its-screen-component)
  componentWillMount() {
    this.props.navigation.setParams({ displayDatePicker: this.displayDatePicker.bind(this) });
  }

  displayDatePicker() {
    this.setState({
      datePickerOpen: !this.state.datePickerOpen,
    }, () => {
      Animated.timing(
        this.state.datePickerAnimation,
        {
          toValue: this.state.datePickerOpen ? 0 : 1,
          duration: 300
        }
      ).start();
    });
  }

  sortMatchesByStatus(matches) {
    return matches.sort((a, b) => parseInt(a.statusNum) === 2 ? -1 : 1);
  }

  setDate(newDate) {
    this.setState({ chosenDate: newDate })
  }

  async componentDidMount() {
    let data = await axios.get('http://ec2-18-216-119-191.us-east-2.compute.amazonaws.com/todayMatches');
    this.setState({
      matches: this.sortMatchesByStatus(data.data),
      show: true
    })
  }

  async refreshData() {
    this.setState({
      refreshing: true,
    }, async () => {
      let data = await axios.get(`http://ec2-18-216-119-191.us-east-2.compute.amazonaws.com/todayMatches`);
      this.setState({
        matches: this.sortMatchesByStatus(data.data),
        refreshing: false,
      });
    });
  }

  render() {
    const datePickerStyle = {
      top: this.state.datePickerAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [-height, 0],
      }),
      opacity: this.state.datePickerAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      })
    }

    return (
      <View style={styles.container}>
        {
          this.state.show &&
          <FlatList
            data={this.state.matches}
            renderItem={({item}) => <MatchCard match={item} navigation={this.props.navigation} />}
            keyExtractor={(item, index) => index}
            onRefresh={this.refreshData.bind(this)}
            refreshing={this.state.refreshing}
          />
        }
        <Animated.View style={[styles.datePickerModal, datePickerStyle]}>
          <View style={{ width: width, flex: 1, justifyContent: 'center' }}>
            <DatePickerIOS
              date={this.state.chosenDate}
              onDateChange={this.setDate.bind(this)}
              mode='date'
            />
          </View>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  datePickerModal: {
    position: 'absolute',
    width,
    height: 200,
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
})

export default MatchList;
