import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage, Picker, Image, Button } from 'react-native';
import { Container, Content, Icon } from 'native-base';
import teams from '../utils/teamId';
import find from 'lodash.find';
import Animation from 'lottie-react-native';
import images from '../utils/teamImages';

class Feed extends Component {

  state = {
    feedElements: [],
    selectedTeam: '1610612737',
    // selectedTeamInfo: find(teams, { id: '1610612737' }),
    favoriteTeamSet: false
  }

  componentDidMount() {
    this.animation.play();
  }

  async componentWillMount() {
    try {
      // await AsyncStorage.removeItem('favoriteTeam');
      let favoriteTeam = await AsyncStorage.getItem('favoriteTeam');
      this.setState({
        favoriteTeamSet: favoriteTeam ? true : false,
        selectedTeamInfo: favoriteTeam ? find(teams, { id: parseInt(favoriteTeam) }) : find(teams, { id: 1610612737})
      }, () => {
      })
    } catch(error) {
      console.log(error);
    }
  }

  async handleSet() {
    try {
      await AsyncStorage.setItem('favoriteTeam', this.state.selectedTeam.toString());
      this.setState({
        favoriteTeamSet: true,
        selectedTeamInfo: find(teams, { id: parseInt(this.state.selectedTeam) }),
      })
    } catch (error) {
      console.log(error);
    }
  }

  async resetFavoriteTeam() {
    this.setState({
      favoriteTeamSet: false,
      selectedTeam: '1610612737',
      selectedTeamInfo: {},
    }, async () => {
      this.animation.play();
      await AsyncStorage.removeItem('favoriteTeam');
    });
  }

  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <Icon name='ios-basketball-outline' style={{color:tintColor}} />
    )
  }

  render() {
    return (
      <View style={styles.container}>
      {
        this.state.favoriteTeamSet ?
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',}}>
            <Text>Your favorite team: {this.state.selectedTeamInfo.name}</Text>
            <Image source={images[this.state.selectedTeamInfo.tri]} style={{ width: 200, height: 200 }} />
            <Button title='Reset favorite team' onPress={this.resetFavoriteTeam.bind(this)} />
          </View>
         :
         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%'}}>
          <View>
            <Animation
              ref={animation => {
                this.animation = animation;
              }}
              style={{
                width: 80,
                height: 80,
              }}
              loop={true}
              source={require('./animation.json')}
            />
          </View>
          <Text>Pick your favorite team!</Text>
          <Picker
            style={{ width: 400 }}
            selectedValue={this.state.selectedTeam}
            onValueChange={(itemValue, itemIndex) => this.setState({ selectedTeam: itemValue })}>
            {
              teams.map(team => {
                return <Picker.Item key={team.id} value={team.id} label={team.name} />
              })
            }
          </Picker>
          <Button title='set' onPress={this.handleSet.bind(this)}></Button>
        </View>
      }
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
