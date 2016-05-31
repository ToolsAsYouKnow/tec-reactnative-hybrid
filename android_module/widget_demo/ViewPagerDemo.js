/**
 * Created by skylan on 16/5/31.
 */

'use strict';

import React, {
	Component
} from 'react';

import {
	StyleSheet,
	Text,
	View,
	ViewPagerAndroid
} from 'react-native'


class ViewPagerDemo extends Component {
	render() {
		return (
			<View >
				<Text style={styles.welcome}>
					ViewPagerAndroid实例
				</Text>
				<ViewPagerAndroid style={styles.pageStyle} initialPage={0}>
					<View style={{backgroundColor:"red"}}>
						<Text>First Page!</Text>
					</View>
					<View style={{backgroundColor:"yellow"}}>
						<Text>Second Page!</Text>
					</View>
				</ViewPagerAndroid>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	pageStyle: {
		alignItems: 'center',
		padding: 20,
		height: 200,
	}
});

module.exports = ViewPagerDemo;