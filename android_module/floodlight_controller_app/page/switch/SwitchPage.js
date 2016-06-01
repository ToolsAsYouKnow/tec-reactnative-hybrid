/**
 * Created by skylan on 16/5/17.
 */

'use strict';

import React, {
	Component,
} from 'react'

import {
	StyleSheet,
	Text,
	View,
	ListView,
	TouchableOpacity
} from 'react-native';

import MyToolBar from '../../common/widget/CommonToolBar';
import Progress from '../../common/widget/CommonProgressBar'

import * as URL from '../../constants/ServerUrl'

var _navigator;
var _route;

class SwitchPage extends Component {
	// 构造
	constructor(props) {
		super(props);

		_navigator = this.props.navigator;
		_route = this.props.route;

		// 初始状态
		this.state = {
			dataSource: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2
			}),
			switchNum: 0,
			isLoaded: false
		};
	}

	componentDidMount() {
		this.getSwitchInfo();
	}

	getSwitchInfo() {
		fetch(URL.HOST_URL + URL.SWITCHES_LIST)
			.then((response) => response.json())
			.then((responseJson)=> {
				console.log(responseJson);

				var switchList = [];
				var count = 0;
				for (var _switchId in responseJson) {
					switchList[count] = {
						switchId: _switchId,
						aggregate: responseJson[_switchId]['aggregate']
					};
					count++;
				}
				console.log(switchList);

				storage.save();
				
				this.setState({
					isLoaded: true,
					switchNum: switchList.length,
					dataSource: this.state.dataSource.cloneWithRows(switchList)
				})
			}).done();
	}

	render() {
		if (!this.state.isLoaded) {
			return (
				<View>
					<MyToolBar title={_route.id}/>
					<View style={SwitchPageStyles.switch_summary_view}>
						<Text style={[SwitchPageStyles.switch_summary_text, {color:'green'}]}>
							Total Switch Num: {this.state.switchNum}
						</Text>
					</View>
					<Progress/>
				</View>
			)
		} else {
			return (
				<View style={{flex:1}}>
					<MyToolBar title={_route.id}/>
					<View style={SwitchPageStyles.switch_summary_view}>
						<Text style={[SwitchPageStyles.switch_summary_text, {color:'green'}]}>
							Total Switch Num: {this.state.switchNum}
						</Text>
					</View>
					<ListView
						style={SwitchPageStyles.switch_listview}
						dataSource={this.state.dataSource}
						renderRow={(switchJson) => this.renderSwitch(switchJson)}
					/>
				</View>
			)
		}
	}

	renderSwitch(switchJson) {
		return (
			<TouchableOpacity
				style={SwitchPageStyles.item_wrapper}
				onPress={this.switchItemOnPress.bind(this,switchJson.switchId)}
			>
				<View style={{flexDirection: 'row'}}>
					<Text style={[SwitchPageStyles.item_text,{flex:3}]}>
						{switchJson.switchId}
					</Text>
					<Text style={[SwitchPageStyles.item_text,{flex:1}]}>
						{switchJson.aggregate.version}
					</Text>
				</View>
				<View style={{flexDirection: 'row', alignItems: 'center'}}>
					<Text style={[SwitchPageStyles.item_text,{flex:1}]}>
						{switchJson.aggregate.flowCount}
					</Text>
					<Text style={[SwitchPageStyles.item_text,{flex:1}]}>
						{switchJson.aggregate.packetCount}
					</Text>
					<Text style={[SwitchPageStyles.item_text,{flex:1}]}>
						{switchJson.aggregate.byteCount}
					</Text>
					<Text style={[SwitchPageStyles.item_text,{flex:1}]}>
						{switchJson.aggregate.flags}
					</Text>
				</View>
			</TouchableOpacity>
		);
	}

	switchItemOnPress(switchId) {
		console.log(switchId);
		_navigator.push({id: 'Switch Info', switchId: switchId});
	}
}

var SwitchPageStyles = StyleSheet.create({
	switch_summary_view: {
		alignItems: 'center',
		padding: 10,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: '#CDCDCD'
	},
	switch_summary_text: {
		fontSize: 20,
		fontWeight: 'bold'
	},
	switch_listview: {
		padding: 10
	},
	switch_item_wrapper: {
		borderWidth: 3,
		borderRadius: 5,
		borderColor: '#0080FF',
		padding: 10,
		margin: 5
	},
	switch_item_text: {
		color: 'black',
		fontWeight: 'bold'
	}
});

module.exports = SwitchPage;