import React, { Component } from 'react';
import { Font } from 'expo';
import { View, Text, Dimensions, Image,TouchableWithoutFeedback, StyleSheet  } from 'react-native';
import TRI_CODE_TO_TEAM_NAME from '../utils/triToTeam';

const { width } = Dimensions.get('window');

class MatchCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      'fugazone-regular': require('../assets/fonts/FugazOne-Regular.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    const vteam = this.props.match.vTeamTriCode;
    const hteam = this.props.match.hTeamTriCode;
    const matchStatus = {
      1: 'Not Started',
      2: 'Active Game',
      3: 'Game Finished'
    }

    const scores = () => {
      let hwin = false;
      let awin = false;

      if (parseInt(this.props.match.hTeamScore) > parseInt(this.props.match.vTeamScore)) {
        hwin = true;
      } else if (parseInt(this.props.match.hTeamScore) < parseInt(this.props.match.vTeamScore)) {
        awin = true;
      }
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center',}}>
          <Text style={{ color: hwin ? 'black' : 'black', fontFamily: 'fugazone-regular', fontSize: hwin ? 35 : 30}}>{this.props.match.hTeamScore}</Text>
          <Text style={{ fontFamily: 'fugazone-regular', fontSize: 30 }}> - </Text>
          <Text style={{ color: awin ? 'black' : 'black', fontFamily: 'fugazone-regular',fontSize: awin ? 35 : 30 }}>{this.props.match.vTeamScore}</Text>
        </View>
      )
    }

    return (
    <TouchableWithoutFeedback onPress={() => {
      this.props.navigation.navigate('MatchDetail', {matchId: this.props.match.matchId})
    }}>
      <View style={{ flex: 1, width: width }}>
        {
          this.state.fontLoaded &&
          <View style={styles.container}>
            <View style={styles.statContainer}>
              <Text>Matsh Status: {matchStatus[this.props.match.statusNum]}</Text>
            </View>
            <View style={styles.statContainer}>
                <Text style={{}}>{this.props.match.hTeamTriCode} (h) vs {this.props.match.vTeamTriCode} (v)</Text>
              {scores()}
            </View>
            <View style={styles.statContainer}>
              <Text>{this.props.match.hTeamWins}-{this.props.match.hTeamLosses} / {this.props.match.vTeamWins}-{this.props.match.vTeamLosses}</Text>
            </View>
          </View>
        }
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    margin: 10,
    borderRadius: 5,
  },
  statContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default MatchCard;
