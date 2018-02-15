import React, { Component } from 'react';
import { View, Text, AsyncStorage, TextInput, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import PlayerCard from './PlayerCard';

class PlayerSearch extends Component {

  state = {
    searchText: '',
    loaded: false,
    playerList: [],
    playerListOriginal: [],
    count: 0,
  }
  // scrap this idea for for now

  async componentDidMount() {
   try {
     let data = await axios.get('http://ec2-18-216-119-191.us-east-2.compute.amazonaws.com/playerlist');
     this.setState({
       playerList: data.data,
       playerListOriginal: data.data,
       loaded: true,
     })
   } catch(error) {
    console.log(error);
    console.log('failed to get player list');
   }
  }

  setSearchText(event) {
    let searchText = event.nativeEvent.text;
    this.setState({ searchText }, () => {
      this.filterPlayers();
    });
  }

  filterPlayers() {
    let text = this.state.searchText.toLowerCase();
    let filteredList = this.state.playerListOriginal.filter((player) => {
      return player.name.toLowerCase().search(text) !== -1;
    })

    this.setState({
      playerList: filteredList,
      count: filteredList.length,
    })
  }

  render() {
    const renderList = () => {
      if (this.state.playerList.length === 0) {
        return (
          <View style={{ flex: 3 }} />
        )
      } else if(this.state.searchText === '') {
        return (
          <View style={{ flex: 3 }} />
        )
      } else {
        return (
          <View style={styles.playerListContainer}>
            <FlatList
              data={this.state.playerList}
              renderItem={({ item }) => <PlayerCard player={item} navigation={this.props.navigation} />}
              keyExtractor={(item, index) => index}
            />
          </View>
        )
      }
    }
    return (
      <View style={styles.container}>
        <View style={{ flex:1, alignItems: 'center' }}>
          <TextInput
            style={styles.searchBar}
            value={this.state.searchText}
            onChange={this.setSearchText.bind(this)}
            placeholder="Search player name"
          />
          {
            this.state.searchText !== '' &&
            <Text>Matches found: {this.state.count}</Text>
          }
        </View>
        { renderList() }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderWidth: 2,
    // borderColor: 'green',
  },
  playerListContainer: {
    flex: 3,
    // borderWidth: 2,
    // borderColor: 'purple'
  },
  searchBar: {
    // position: 'absolute',
    fontSize: 30,
    height: 100
  }
})

export default PlayerSearch;
