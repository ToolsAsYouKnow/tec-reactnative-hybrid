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
} from 'react-native';

var ToolbarAndroid = require('ToolbarAndroid');

class ToolBarDemo extends Component {
	render() {
		return (
			<ToolbarAndroid
				actions={toolbarActions}
				style={styles.toolbar}
				title="主标题">
			</ToolbarAndroid>
		);
	}
}
var toolbarActions = [
	{title: 'Filter'}
];
const styles = StyleSheet.create({
	toolbar: {
		backgroundColor: '#e9eaed',
		height: 56
	},
});

module.exports = ToolBarDemo;
