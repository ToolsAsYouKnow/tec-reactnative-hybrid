/**
 * Created by skylan on 16/5/13.
 */

/**
  * Sample React Native App
  * https://github.com/facebook/react-native
  */
'use strict';

import React, {
	Component,
} from 'react';

import {
	Text,
	View,
	StatusBar,
	TouchableHighlight,
	StyleSheet
} from 'react-native';

//简单封装一个组件
class CustomButton extends React.Component {
	render() {
		return (
			<TouchableHighlight
				style={styles.button}
				underlayColor="#a5a5a5"
				onPress={this.props.onPress}>
				<Text style={styles.buttonText}>{this.props.text}</Text>
			</TouchableHighlight>
		);
	}
}
class StatusBarDemo extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<View>
				
				<CustomButton text='状态栏隐藏透明效果'/>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	button: {
		margin: 5,
		backgroundColor: 'white',
		padding: 15,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: '#cdcdcd',
	}
});

module.exports = StatusBarDemo;