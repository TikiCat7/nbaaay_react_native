import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage, Picker, Image } from 'react-native';
import { Container, Content, Icon, Button } from 'native-base';
import teams from '../utils/teamId';

import Animation from 'lottie-react-native';

class Feed extends Component {

  state = {
    feedElements: [],
    language: ''
  }

  componentDidMount() {
    // console.log(teams);
    this.animation.play();
  }

  async componentWillMount() {
    try {
      await AsyncStorage.removeItem('favoriteTeam');
      let favoriteTeam = await AsyncStorage.getItem('favoriteTeam');
      // let favoritePlayers = await AsyncStorage.getItem('favoritePlayers');
      if(favoriteTeam) {
        console.log(favoriteTeam);
      } else {
        await this.setFavorite();
        console.log('set');
        console.log(await AsyncStorage.getItem('favoriteTeam'));
      }
    } catch(error) {
      console.log(error);
    }
  }

  async setFavorite() {
    try {
      await AsyncStorage.setItem('favoriteTeam', 'Golden State Warriors')
    } catch(error) {
      console.log(error);
    }
  }

  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <Icon name='ios-basketball-outline' style={{color:tintColor}} />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Animation
            ref={animation => {
              this.animation = animation;
            }}
            style={{
              width: 80,
              height: 80
            }}
            loop={true}
            source={require('./animation.json')}
          />
        </View>
        <Text>Pick your favorite team!</Text>
        <Picker
          style={{ width: 400 }}
          selectedValue={this.state.language}
          onValueChange={(itemValue, itemIndex) => this.setState({ language: itemValue })}>
          {
            teams.map(team => {
              return <Picker.Item key={team.id} value={team.id} label={team.name} />
            })
          }
        </Picker>
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
