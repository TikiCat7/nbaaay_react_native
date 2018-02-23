import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, Animated, DatePickerIOS, TouchableWithoutFeedback, Button, Platform, DatePickerAndroid } from 'react-native';
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
      dateChanged: false,
      datePickerAnimation: new Animated.Value(0),
      allowDateToggle: true,
    }
  }

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      tabBarIcon: ({ tintColor }) => (
        <Icon name='calendar' style={{ color: tintColor }} />
      ),
      title: `Matches for: ${moment(params.chosenDate).format('YYYY-MM-DD')}`,
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
    this.props.navigation.setParams({ displayDatePicker: this.displayDatePicker.bind(this), chosenDate: this.state.chosenDate });
  }

  async displayDatePicker() {
    Platform.OS === 'ios' ?
    this.state.allowDateToggle &&
    this.setState({
      datePickerOpen: !this.state.datePickerOpen,
      allowDateToggle: false,
    }, () => {
      Animated.timing(
        this.state.datePickerAnimation,
        {
          toValue: this.state.datePickerOpen ? 0 : 1,
          duration: 300
        }
      ).start(() => {
        this.setState({
          allowDateToggle: true
        })
      });
    }) : DatePickerAndroid.open({
      date: new Date(2020, 4,  25)
    });
  }

  sortMatchesByStatus(matches) {
    return matches.sort((a, b) => parseInt(a.statusNum) === 2 ? -1 : 1);
  }

  setDate(newDate) {
    this.setState({
      chosenDate: newDate,
      dateChanged: true
    });
  }

  async componentDidMount() {
    let data = await axios.get(`http://ec2-18-216-119-191.us-east-2.compute.amazonaws.com/todayMatches`);
    this.setState({
      matches: this.sortMatchesByStatus(data.data),
      show: true
    })
  }

  // if date is specified, it should respect that when refreshing & title should update the date
  async refreshData() {
    this.setState({
      refreshing: true,
    }, async () => {
      let url = this.state.dateChanged ? `http://ec2-18-216-119-191.us-east-2.compute.amazonaws.com/matches/${moment(this.state.chosenDate).format('YYYYMMDD')}` : `http://ec2-18-216-119-191.us-east-2.compute.amazonaws.com/todayMatches`
      let data = await axios.get(url);
      this.setState({
        matches: this.sortMatchesByStatus(data.data),
        refreshing: false,
      });
    });
  }

  handleSearch() {
    this.displayDatePicker();
    try {
      this.setState({
        refreshing: true,
      }, async () => {
        let data = await axios.get(`http://ec2-18-216-119-191.us-east-2.compute.amazonaws.com/matches/${moment(this.state.chosenDate).format('YYYYMMDD')}`);
        this.setState({
          matches: this.sortMatchesByStatus(data.data),
          refreshing: false,
        }, () => {
          if (this.state.matches.length > 0) {
            this.listRef.scrollToIndex({ animated: false, index: 0 });
          }
          this.props.navigation.setParams({ chosenDate: this.state.chosenDate });
        });
      });
    } catch(error) {
      console.log(error);
    }
  }

  render() {
    const datePickerStyle = {
      top: this.state.datePickerAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [-height-200, 0],
      }),
      opacity: this.state.datePickerAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      })
    }

    const modalOpacity = {
      opacity: this.state.datePickerAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.3]
      })
    }

    const modalzIndex = {
      zIndex: this.state.datePickerAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [-1, 0]
      })
    }

    return (
      <View style={styles.container}>
        {
          this.state.show && this.state.matches.length > 0 ?
          <FlatList
            data={this.state.matches}
            renderItem={({item}) => <MatchCard match={item} navigation={this.props.navigation} />}
            keyExtractor={(item, index) => index}
            onRefresh={this.refreshData.bind(this)}
            refreshing={this.state.refreshing}
              ref={(ref) => { this.listRef = ref; }}
          /> :
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <Text>No matches for this day :(</Text>
          </View>
        }
        {
          Platform.OS === 'ios' ?
            [
              <Animated.View key='1' style={[styles.datePickerModal, datePickerStyle]}>
                <View style={{ width: width, flex: 1, justifyContent: 'center' }}>
                  <DatePickerIOS
                    date={this.state.chosenDate}
                    onDateChange={this.setDate.bind(this)}
                    mode='date'
                  />
                  <TouchableWithoutFeedback>
                    <Button onPress={this.handleSearch.bind(this)} title={'Search'}></Button>
                  </TouchableWithoutFeedback>
                </View>
              </Animated.View>,
              <TouchableWithoutFeedback key='2' onPress={this.displayDatePicker.bind(this)}>
                <Animated.View style={[{ position: 'absolute', flex: 1, width, height, backgroundColor: 'black', top: 0 }, modalOpacity, modalzIndex]} />
              </TouchableWithoutFeedback>
          ]
           : null
        }
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
    height: 250,
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    zIndex: 1,
  },
})

export default MatchList;
