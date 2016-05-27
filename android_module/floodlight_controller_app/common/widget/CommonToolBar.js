/**
 * Created by skylan on 16/5/22.
 */
'use strict';

import React, {
	Component
} from 'react';

import{
	StyleSheet,
	Text,
	View,
	ToolbarAndroid
} from 'react-native';

class MyToolBar extends Component {
	render() {
		return (
			<ToolbarAndroid
				actions={toolbarActions}
				style={ToolBarStyle.main}
				title={this.props.title}>
			</ToolbarAndroid>
		)
	}
}

var toolbarActions = [
	{title: 'Filter'}
];

const ToolBarStyle = StyleSheet.create({
	main: {
		marginTop: 25,
		backgroundColor: '#0080FF',
		height: 53
	}
});

module.exports = MyToolBar;