import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, Animated, TouchableWithoutFeedback  } from 'react-native';
import { LinearGradient, Font, AuthSession, Facebook } from 'expo';

const FB_APP_ID = '395858194191149';

class SplashScreen extends Component {

  constructor() {
    super();
    this.state = {
      fontLoaded: false,
      titleAnimation: new Animated.Value(0),
      titleUnderlineAnimation: new Animated.Value(0),
      facebookAnimation: new Animated.Value(0),
      emailAnimation: new Animated.Value(0),
      signupAnimation: new Animated.Value(0),
      nosigninAnimation: new Animated.Value(0)
    }
  }

  static navigationOptions = {
    title: "NBAAAAY!",
    header: null,
    result: null,
  }

  async componentDidMount() {
    await Font.loadAsync({
      'fugazone-regular': require('../assets/fonts/FugazOne-Regular.ttf'),
    });

    this.setState({ fontLoaded: true });

    Animated.stagger(200, [
      Animated.timing(
        this.state.titleAnimation,
        {
          toValue: 1,
          duration: 1200,
        }
      ),
      Animated.timing(
        this.state.titleUnderlineAnimation,
        {
         toValue: 1,
         duration: 1000
        }
      ),
    ]).start();

    Animated.stagger(200, [
      Animated.spring(
        this.state.facebookAnimation,
        {
          toValue: 1,
          friction: 5,
          tension: 140,
          duration: 1000
        }
      ),
      Animated.spring(
        this.state.emailAnimation,
        {
          toValue: 1,
          friction: 5,
          tension: 140,
          duration: 1000
        }
      ),
      Animated.spring(
        this.state.signupAnimation,
        {
          toValue: 1,
          friction: 5,
          tension: 140,
          duration: 1000
        }
      ),Animated.spring(
        this.state.nosigninAnimation,
        {
          toValue: 1,
          friction: 5,
          tension: 140,
          duration: 1000
        }
      )
    ]).start()
  }

  _handlePressAsync2 = async () => {
    let redirectUrl = AuthSession.getRedirectUrl();
    let result = await AuthSession.startAsync({
      authUrl:
        `https://www.facebook.com/v2.8/dialog/oauth?response_type=token` +
        `&client_id=${FB_APP_ID}` +
        `&redirect_uri=${encodeURIComponent(redirectUrl)}`,
    });
    this.setState({ result });
  };

  _handlePressAsync = async () => {
    const result = await Facebook.logInWithReadPermissionsAsync(FB_APP_ID, {
        permissions: ['public_profile'],
      });
    this.setState({result})
  }

  render() {
    const createFadeDownAnimation = (animation) => {
      const translateY = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [-50, 0]
      });
      return {
        opacity: animation,
        transform: [{
          translateY
        }]
      }
    }

    const createTitleUnderlineStyle = (animation) => {
      const width = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '95%']
      });
      return {
        width: width,
        opacity: animation,
      }
    }

    const titleStyle = createFadeDownAnimation(this.state.titleAnimation);
    const titleUnderlineStyle = createTitleUnderlineStyle(this.state.titleUnderlineAnimation);
    const facebookStyle = createFadeDownAnimation(this.state.facebookAnimation);
    const emailStyle = createFadeDownAnimation(this.state.emailAnimation);
    const signupStyle = createFadeDownAnimation(this.state.signupAnimation);
    const nosigninStyle = createFadeDownAnimation(this.state.nosigninAnimation);

    const {navigate} = this.props.navigation;
    const {fontLoaded} = this.state;
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#0099F7', '#F11712']}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: '100%',
          }}
        >
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
          {
            fontLoaded && [
              <Animated.Text key='1' style={[{ fontSize: 34, color: 'white', fontFamily:'fugazone-regular'}, titleStyle]}>
                🔥🏀🔥NBAAAY🔥🏀🔥
              </Animated.Text>,
              <Animated.View key='2' style={[{position: 'relative', width: '100%', height: 10, backgroundColor: 'white'}, titleUnderlineStyle]} />,
              <View key='3' style={{ marginTop: 150, alignItems: 'center'}}>
                <TouchableWithoutFeedback key='3' onPress={this._handlePressAsync}>
                  <Animated.View style={facebookStyle}>
                    <Text style={styles.button}>🤔 Facebook Login</Text>
                  </Animated.View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback key='4' onPress={this._handlePressAsync}>
                  <Animated.View style={emailStyle}>
                    <Text style={styles.button}>😂 Email Login</Text>
                  </Animated.View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback key='5' onPress={this._handlePressAsync}>
                  <Animated.View style={signupStyle}>
                    <Text style={styles.button}>🤔 Sign Up</Text>
                  </Animated.View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback key='6' onPress={() => this.props.navigation.navigate('Main')}>
                  <Animated.View style={nosigninStyle}>
                    <Text style={styles.button}>🏀 Use Without Signin</Text>
                  </Animated.View>
                </TouchableWithoutFeedback>{
                  this.state.result ? (
                    <Text>{JSON.stringify(this.state.result)}</Text>
                ) : null
                }
              </View>
            ]
          }
        </View>
        </LinearGradient>
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
  button: {
    alignItems: 'center',
    padding: 10,
    fontFamily:'fugazone-regular',
    color: 'white'
  },
})

export default SplashScreen;
