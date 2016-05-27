'use strict';

import React, {
	Component,
} from 'react'

import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity
} from 'react-native'

var NUM_ITEMS = 20;

class ScrollViewTest extends React.Component {

	// 构造
	constructor(props) {
		super(props);

		// 初始状态
		this.state = {
			title: '<ScrollView>',
			description: 'Component that enables scrolling through child components.'
		}
	}

	makeItems(nItems:number, styles):Array<any> {
		var items = [];
		for (var i = 0; i < nItems; i++) {
			items[i] = (
				<TouchableOpacity key={i} style={styles}>
					<Text>{'Item ' + i}</Text>
				</TouchableOpacity>
			);
		}
		return items;
	}


	render() {
		// One of the items is a horizontal scroll view
		var items = this.makeItems(NUM_ITEMS, styles.itemWrapper);
		items[10] = (
			<ScrollView key={'scrollView'} horizontal={true}>
				{this.makeItems(NUM_ITEMS, [styles.itemWrapper, styles.horizontalItemWrapper])}
			</ScrollView>
		);
		items[0] = (
			<Text>
				asdjiasdalsdnasdnashdasnd
			</Text>
		);

		// var verticalScrollView = (
		//
		// );

		// verticalScrollView.showsVerticalScrollIndicator = {true};

		return (
			<ScrollView
				style={styles.verticalScrollView}
				showsVerticalScrollIndicator={false}>
				{items}
			</ScrollView>
		);
	}
}

var styles = StyleSheet.create({
	verticalScrollView: {
		margin: 10
	},
	itemWrapper: {
		backgroundColor: '#dddddd',
		alignItems: 'center',
		borderRadius: 5,
		borderWidth: 5,
		borderColor: '#a52a2a',
		padding: 30,
		margin: 5
	},
	horizontalItemWrapper: {
		padding: 50
	}
});

module.exports = ScrollViewTest;
