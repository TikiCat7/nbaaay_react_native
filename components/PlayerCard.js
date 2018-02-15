import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Image } from 'react-native';

class PlayerCard extends Component {

  handlePress() {
    this.props.navigation.navigate('Player', { teamId: this.props.player.teamId, playerImageId: this.props.player.playerId, playerId: this.props.player.id, navigation: this.props.navigation });
  }

  render() {
    const { player } = this.props;
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.handlePress.bind(this)}>
          <View style={styles.playerCard}>
            <Image style={{ width: 70, height: 70, borderRadius: 33.5, flex: 1 }}
              source={{ uri: `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/${this.props.player.teamId}/2017/260x190/${this.props.player.playerId}.png` }}
              resizeMode='cover'
            />
            <View style={{ flex: 3, alignItems: 'center'}}>
              <Text>{player.name}</Text>
              <Text>#{player.number}</Text>
              <Text>{player.teamName}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
    borderRadius: 5,
  },
  playerCard: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  }
})

export default PlayerCard;
