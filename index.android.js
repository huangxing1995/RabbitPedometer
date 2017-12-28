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
import ScrollableTabView,{DefaultTabBar} from 'react-native-scrollable-tab-view'
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
	descriptionText: {
		elevation: 1,
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'center',
		color: 'yellow',
	},
});

AppRegistry.registerComponent('Pedometer', () => Pedometer);
