'use strict';

import React, {
	Component,
} from 'react'

import {
	TextInput,
	View,
	Text,
	StyleSheet
} from 'react-native'

class InputTest extends React.Component {

	// 构造
	constructor(props) {
		super(props);
		// 初始状态
		this.state = {
			name: ''
		};
	}

	render() {
		return (
			<View style={textInputTestStyles.main}>
				<TextInput
					style={{height: 40, borderColor: 'blue', borderWidth: 1, marginLeft: 20, marginRight: 20}}
				    autoFocus={true}
				/>
				<TextInput
					style={{height: 40, borderColor: 'red', borderWidth: 1}}
				    defaultValue='huhushushu'
				    editable={false}
					secureTextEntry={true}
				/>
				<TextInput
					style={{height: 40, borderColor: 'red', borderWidth: 1}}
					defaultValue='huhushushffferfkacajcajcbaskcbkrjfnejrberbieurgbieurgiwwdwwu'
				    multiline={true}
				/>
				<TextInput
					style={{height: 40, borderColor: 'red', borderWidth: 1}}
					keyboardType="email-address"
					onChangeText={(text) => {this.setState({name: text})}}
					underlineColorAndroid='blue'
				/>
				<Text>
					{this.state.name}
				</Text>
			</View>

		)
	}

}

var textInputTestStyles = StyleSheet.create({
	main: {
		margin: 40
	}
});

module.exports = InputTest;