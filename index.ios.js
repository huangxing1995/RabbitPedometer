/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Main from './src/Main'

export default class Pedometer extends Component {
  render() {
    return (
      <View style={styles.container}>
	      <Main>
		      <Text style={styles.descriptionText}>
			      {123}
		      </Text>
	      </Main>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
	descriptionText: {
		elevation: 1,
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'center',
		color: 'yellow',
	},
});

AppRegistry.registerComponent('Pedometer', () => Pedometer);
