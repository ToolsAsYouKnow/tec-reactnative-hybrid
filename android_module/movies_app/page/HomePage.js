/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React, {
	Component,
} from 'react'

import {
	StyleSheet,
	Text,
	View
} from 'react-native';

class HomePage extends Component{
	render() {
		return (
			<View style={styles.container}>

				<Text style={styles.welcome}>
					Welcome to Sky movies!!
				</Text>

				<Text style={styles.instructions}>
					Enjoy life, Enjoy movies
				</Text>

				<Text style={styles.instructions}>
					Select a movie and have a wonderful day!
				</Text>

			</View >
		);
	}


}

var styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF'
	},
	welcome: {
		fontSize: 25,
		textAlign: 'center',
		margin: 10
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5
	},
	thumbnail: {
		width: 53,
		height: 81
	}
});

module.exports = HomePage;