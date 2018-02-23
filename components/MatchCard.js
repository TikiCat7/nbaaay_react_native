import React, { Component } from 'react';
import { Font, Asset } from 'expo';
import { View, Text, Dimensions, Image, TouchableWithoutFeedback, StyleSheet, Animated} from 'react-native';
import TRI_CODE_TO_TEAM_NAME from '../utils/triToTeam';
import images from '../utils/teamImages';
import Animation from 'lottie-react-native';
import anim from './muzli.json';

const { width } = Dimensions.get('window');

class MatchCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
    }
  }

  async componentWillMount() {
    const images = [
      require('../assets/images/team-logos/ATL_logo.png'),
      require('../assets/images/team-logos/BOS_logo.png'),
      require('../assets/images/team-logos/BKN_logo.png'),
      require('../assets/images/team-logos/CHA_logo.png'),
      require('../assets/images/team-logos/CHI_logo.png'),
      require('../assets/images/team-logos/CLE_logo.png'),
      require('../assets/images/team-logos/DAL_logo.png'),
      require('../assets/images/team-logos/DEN_logo.png'),
      require('../assets/images/team-logos/DET_logo.png'),
      require('../assets/images/team-logos/GSW_logo.png'),
      require('../assets/images/team-logos/HOU_logo.png'),
      require('../assets/images/team-logos/IND_logo.png'),
      require('../assets/images/team-logos/LAC_logo.png'),
      require('../assets/images/team-logos/LAL_logo.png'),
      require('../assets/images/team-logos/MEM_logo.png'),
      require('../assets/images/team-logos/MIA_logo.png'),
      require('../assets/images/team-logos/MIL_logo.png'),
      require('../assets/images/team-logos/MIN_logo.png'),
      require('../assets/images/team-logos/NOP_logo.png'),
      require('../assets/images/team-logos/NYK_logo.png'),
      require('../assets/images/team-logos/OKC_logo.png'),
      require('../assets/images/team-logos/ORL_logo.png'),
      require('../assets/images/team-logos/PHI_logo.png'),
      require('../assets/images/team-logos/PHX_logo.png'),
      require('../assets/images/team-logos/POR_logo.png'),
      require('../assets/images/team-logos/SAC_logo.png'),
      require('../assets/images/team-logos/SAS_logo.png'),
      require('../assets/images/team-logos/TOR_logo.png'),
      require('../assets/images/team-logos/UTA_logo.png'),
      require('../assets/images/team-logos/WAS_logo.png'),
    ];
    // const imageAssets = this.cacheImages(images);
    const imageAssets = Asset.loadAsync(images);
    await Promise.all([...imageAssets]);
  }

  async componentDidMount() {
    await Font.loadAsync({
      'fugazone-regular': require('../assets/fonts/FugazOne-Regular.ttf'),
    });

    this.setState({ fontLoaded: true }, () => {
      this.animation && this.animation.play();
    });
  }

  render() {
    const vteam = this.props.match.vTeamTriCode;
    const hteam = this.props.match.hTeamTriCode;
    const matchStatus = {
      1: 'Not Started',
      2: 'Live',
      3: 'Final'
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
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',}}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flex: 1, height: 50, width: '100%' }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',}}>
              <Text style={{ color: hwin ? 'black' : 'black', fontFamily: 'fugazone-regular', fontSize: hwin ? 30 : 30 }}>{this.props.match.hTeamScore}</Text>
              <Text style={{ fontFamily: 'fugazone-regular', color: 'grey' }}>{this.props.match.hTeamWins}-{this.props.match.hTeamLosses}</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
              <Text style={{ color: hwin ? 'black' : 'black', fontFamily: 'fugazone-regular', fontSize: hwin ? 30 : 30 }}>-</Text>
              <Text></Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
              <Text style={{ color: awin ? 'black' : 'black', fontFamily: 'fugazone-regular', fontSize: awin ? 30 : 30 }}>{this.props.match.vTeamScore}</Text>
              <Text style={{ fontFamily: 'fugazone-regular', color: 'grey' }}>{this.props.match.vTeamWins}-{this.props.match.vTeamLosses}</Text>
            </View>
          </View>
        </View>
      )
    }

    return (
    <TouchableWithoutFeedback onPress={() => {
      this.props.navigation.navigate('MatchDetail', {matchId: this.props.match.matchId})
    }}>
      <View style={{ flex: 1, width: width}}>
        {
          this.state.fontLoaded &&
          <View style={styles.container}>
            <View style={styles.statContainer}>
            {
              this.props.match.statusNum === 2 ?
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center',}}>
                <Animation
                  ref={animation => {
                    this.animation = animation;
                  }}
                  style={{
                    width: 30,
                    height: 30
                  }}
                  loop={true}
                  source={require('./muzli.json')}
                />
                <Text>{matchStatus[this.props.match.statusNum]}</Text>
              </View> :
              <Text>{matchStatus[this.props.match.statusNum]}</Text>
            }
            </View>
            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-around', width: '100%' }}>
              <Image source={images[this.props.match.hTeamTriCode]} style={{ width: 80, height: 80 }} />
                {scores()}
              <Image source={images[this.props.match.vTeamTriCode]} style={{ width: 80, height: 80 }} />
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
    height: '100%',
    margin: 10,
    borderRadius: 5,
    padding: 10
  },
  statContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 2,
    // borderColor: 'red'
  }
});

export default MatchCard;
