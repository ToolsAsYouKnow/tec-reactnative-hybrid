'use strict';

import React, {
	Component,
} from 'react'

import {
	ListView,
	Text,
	TouchableOpacity,
	View,
	StyleSheet,
	ToastAndroid
} from 'react-native';

var DICE_NUMBER = [1, 2, 3, 4, 5, 6, 7, 8];

var COLOR_CHANGE = [
	'red',
	'green',
	'blue',
	'yellow',
	'black',
	'blueviolet',
	'brown',
	'burlywood',
	'cadetblue',
	'chartreuse',
	'chocolate',
	'crimson',
	'cyan',
	'darkblue',
	'darkcyan',
	'darkgoldenrod'
];

class ListViewTest extends Component {

	// 构造
	constructor(props) {
		super(props);

		var ds = new ListView.DataSource({
			rowHasChanged: (row1, row2) => row1 !== row2
		});

		// 初始状态
		this.state = {
			dataSource: ds.cloneWithRows(DICE_NUMBER),
			result: 0,
			colorStatus: 0
		};

	}

	render() {
		return (
			<View style={styles.main_view}>
				<Text style={{
					alignSelf: 'center',
					fontSize: 200,
					fontWeight: 'bold',
					color: COLOR_CHANGE[this.state.colorStatus]}}>
					{this.state.result}
				</Text>
				<ListView
					initialListSize={DICE_NUMBER.length}
					dataSource={this.state.dataSource}
					renderRow={this._renderRow.bind(this)}
					contentContainerStyle={styles.list}
				/>
			</View>
		)
	}

	_renderRow(rowData, sectionID, rowID) {
		return (
			this.showCube(rowData, rowID, rowData)
		);
	}

	showCube(rowData, rowID, cubeData) {
		return (
			<TouchableOpacity underlayColor='red' style={styles.cell}
			                  onPress={this.onPressTest.bind(this, rowData, rowID)}>
				<Text style={styles.cell_text}>
					{cubeData}
				</Text>
			</TouchableOpacity>
		)
	}

	onPressTest(rowData, rowID) {
		var result = 0;
		for (var i = 0; i < rowData; i++) {
			result += Math.floor(Math.random() * 3);
		}
		this.setState({
			result: result,
			colorStatus: (this.state.colorStatus + 1) % COLOR_CHANGE.length
		});
		// ToastAndroid.show(this.state.colorStatus + "  ", ToastAndroid.SHORT);
	}
}

var styles = StyleSheet.create({
	main_view: {
		top: 40
	},
	main_num_text: {
		alignSelf: 'center',
		fontSize: 200,
		fontWeight: 'bold'
	},
	list: {
		justifyContent: 'flex-end',
		flexDirection: 'row',
		flexWrap: 'wrap'
	},
	cell: {
		backgroundColor: '#F6F6F6',
		// size
		width: 70,
		height: 70,
		// pos
		marginTop: 20,
		marginLeft: 10,
		marginRight: 10,
		// content pos in cell
		alignItems: 'center',
		justifyContent: 'center',
		// border
		borderWidth: 1,
		borderRadius: 5,
		borderColor: '#CCC'
	},
	cell_text: {
		fontSize: 65,
		fontWeight: 'bold',
		color: '#00666699'
	}
});

module.exports = ListViewTest;