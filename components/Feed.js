import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage, Picker, Image, Button } from 'react-native';
import { Container, Content, Icon } from 'native-base';
import teams from '../utils/teamId';
import find from 'lodash.find';

import Animation from 'lottie-react-native';

const images = {
  'ATL': require('../assets/images/team-logos/ATL_logo.png'),
  'BOS': require('../assets/images/team-logos/BOS_logo.png'),
  'BKN': require('../assets/images/team-logos/BKN_logo.png'),
  'CHA': require('../assets/images/team-logos/CHA_logo.png'),
  'CHI': require('../assets/images/team-logos/CHI_logo.png'),
  'CLE': require('../assets/images/team-logos/CLE_logo.png'),
  'DAL': require('../assets/images/team-logos/DAL_logo.png'),
  'DEN': require('../assets/images/team-logos/DEN_logo.png'),
  'DET': require('../assets/images/team-logos/DET_logo.png'),
  'GSW': require('../assets/images/team-logos/GSW_logo.png'),
  'HOU': require('../assets/images/team-logos/HOU_logo.png'),
  'IND': require('../assets/images/team-logos/IND_logo.png'),
  'LAC': require('../assets/images/team-logos/LAC_logo.png'),
  'LAL': require('../assets/images/team-logos/LAL_logo.png'),
  'MEM': require('../assets/images/team-logos/MEM_logo.png'),
  'MIA': require('../assets/images/team-logos/MIA_logo.png'),
  'MIL': require('../assets/images/team-logos/MIL_logo.png'),
  'MIN': require('../assets/images/team-logos/MIN_logo.png'),
  'NOP': require('../assets/images/team-logos/NOP_logo.png'),
  'NYK': require('../assets/images/team-logos/NYK_logo.png'),
  'OKC': require('../assets/images/team-logos/OKC_logo.png'),
  'ORL': require('../assets/images/team-logos/ORL_logo.png'),
  'PHI': require('../assets/images/team-logos/PHI_logo.png'),
  'PHX': require('../assets/images/team-logos/PHX_logo.png'),
  'POR': require('../assets/images/team-logos/POR_logo.png'),
  'SAC': require('../assets/images/team-logos/SAC_logo.png'),
  'SAS': require('../assets/images/team-logos/SAS_logo.png'),
  'TOR': require('../assets/images/team-logos/TOR_logo.png'),
  'UTA': require('../assets/images/team-logos/UTA_logo.png'),
  'WAS': require('../assets/images/team-logos/WAS_logo.png')
};

class Feed extends Component {

  state = {
    feedElements: [],
    selectedTeam: '1610612737',
    favoriteTeamSet: false
  }

  componentDidMount() {
    this.animation.play();
  }

  async componentWillMount() {
    try {
      // await AsyncStorage.removeItem('favoriteTeam');
      let favoriteTeam = await AsyncStorage.getItem('favoriteTeam');
      console.log(favoriteTeam);
      this.setState({
        favoriteTeamSet: favoriteTeam ? true : false,
        selectedTeamInfo: find(teams, { id: parseInt(favoriteTeam) }),
      }, () => {
        console.log(this.state.selectedTeamInfo)
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
        selectedTeamInfo: find(teams, { id: this.state.selectedTeam }),
      })
      console.log(this.state);
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
