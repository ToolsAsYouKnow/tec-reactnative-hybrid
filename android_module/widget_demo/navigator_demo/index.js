/**
 * Created by skylan on 16/5/22.
 */

'use strict';

import React, {
	Component,
} from 'react'

import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	Navigator,
} from 'react-native';



var _navigator;
var HttpView = require('./http.js');

class AwesomeProject extends Component {

	// configureScenceAndroid() {
	// 	return Navigator.SceneConfigs.FadeAndroid;
	// }

	// jump to other page func
	renderSceneAndroid(route, navigator) {
		_navigator = navigator;
		if (route.id === 'main') {
			return (
				<View>
					<TouchableOpacity onPress={ () => this.gotoNewPage()} style={ styles.button }>
						<Text>NetWork</Text>
					</TouchableOpacity>
				</View>
			);
		}

		if (route.id === 'http') {
			return (
				<HttpView navigator={navigator} route={route}/>
			);
		}
	}

	gotoNewPage() {
		_navigator.push({title: 'NewsView', id: 'http', msg: 'POST'});
	}

	render() {
		var renderScene = this.renderSceneAndroid.bind(this);
		var configureScence = this.configureScenceAndroid;
		return (
			<Navigator
				debugOverlay={false}
				initialRoute={{ title: 'Main', id:'main'}}
				configureScence={{ configureScence }}
				renderScene={renderScene}
			/>
		);
	}
}

var styles = StyleSheet.create({
	button: {
		height: 56,
		margin: 10,
		backgroundColor: '#cad6c5',
		justifyContent: 'center',
		alignItems: 'center'
	}
});

module.exports = AwesomeProject;