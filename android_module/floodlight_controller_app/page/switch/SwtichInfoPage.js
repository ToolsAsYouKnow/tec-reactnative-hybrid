/**
 * Created by skylan on 16/5/29.
 */

'use strict';

import React, {
	Component,
} from 'react'

import {
	Text,
	View,
	BackAndroid,
	ViewPagerAndroid,
	StyleSheet,
	TouchableOpacity
} from 'react-native';

import MyToolBar from '../../common/widget/CommonToolBar';

import * as URL from '../../constants/ServerUrl'

var _navigator;
var _route;


BackAndroid.addEventListener('hardwareBackPress', function () {
	if (_navigator == null) {
		return false;
	}
	if (_navigator.getCurrentRoutes().length === 1) {
		return false;
	}
	_navigator.pop();
	return true;
});

class SwitchInfoPage extends Component {
	// 构造
	constructor(props) {
		super(props);
		_navigator = this.props.navigator;
		_route = this.props.route;

		// 初始状态
		this.state = {
			isDescLoaded: false,
			isPortLoaded: false,
			isFlowLoaded: false,

			switchDes: {},
			portDS: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2
			}),
			flowDS: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2
			})

		};
	}

	componentDidMount() {
		this.getSwitchDesc();
		this.getSwitchPorts();
		this.getSwitchFlow();
	}

	getSwitchDesc() {
		fetch(URL.HOST_URL + URL.SWITCHES_DESC_1 + _route.switchId + URL.SWITCHES_DESC_2)
			.then((response) => response.json())
			.then((responseJson)=> {
				this.setState({
					isDescLoaded: true,
					switchDes: responseJson.desc
				})
			}).done();
	}

	getSwitchPorts() {
		fetch(URL.HOST_URL + URL.SWITCHES_PORT_1 + _route.switchId + URL.SWITCHES_PORT_2)
			.then((response) => response.json())
			.then((responseJson)=> {
				this.setState({
					isPortLoaded: true,
					portDS: this.state.portDS.cloneWithRows(responseJson['port_reply'][0]['port'])
				})
			}).done();
	}

	getSwitchFlow() {
		fetch(URL.HOST_URL + URL.SWITCHES_FLOW_1 + _route.switchId + URL.SWITCHES_FLOW_2)
			.then((response) => response.json())
			.then((responseJson)=> {
				this.setState({
					isFlowLoaded: true,
					flowDS: this.state.flowDS.cloneWithRows(responseJson)
				})
			}).done();
	}

	render() {
		return (
			<View>
				<MyToolBar title={_route.switchId}/>
				<ViewPagerAndroid style={{height:550}}>
					<View style={{padding: 20}}>
						{this.showSwitchDesc()}
					</View>
					<View style={{padding: 20}}>
						<ListView
							style={{padding:10}}
							dataSource={this.state.portDS}
							renderRow={(portJson) => this.renderPorts(portJson)}
						/>
					</View>
					<View style={{padding: 20}}>
						<ListView
							style={{padding:10}}
							dataSource={this.state.flowDS}
							renderRow={(flowJson) => this.renderFlows(flowJson)}
						/>
					</View>
				</ViewPagerAndroid>
			</View>
		)
	}


	showSwitchDesc() {
		if (!this.state.isDescLoaded) {
			return (
				<Text>
					Loading.....
				</Text>)
		} else {
			var descItemList = [];
			var count = 0;
			for (var arg in this.state.switchDes) {
				descItemList[count] =
					<TouchableOpacity style={SwitchInfoPageStyles.item_wrapper} key={arg}>
						<Text style={SwitchInfoPageStyles.item_tittle}>{arg}</Text>
						<Text style={SwitchInfoPageStyles.item_text}>{this.state.switchDes[arg]}</Text>
					</TouchableOpacity>;
				count++;
			}
			return descItemList;
		}
	}

	renderPorts(portJson) {
		return (
			<TouchableOpacity
				style={SwitchPageStyles.item_wrapper}
				onPress={this.switchItemOnPress.bind(this,portJson.switchId)}
			>
				<View style={{flexDirection: 'row'}}>
					<Text style={[SwitchPageStyles.item_text,{flex:3}]}>
						{portJson.switchId}
					</Text>
					<Text style={[SwitchPageStyles.item_text,{flex:1}]}>
						{portJson.aggregate.version}
					</Text>
				</View>
				<View style={{flexDirection: 'row', alignItems: 'center'}}>
					<Text style={[SwitchPageStyles.item_text,{flex:1}]}>
						{portJson.aggregate.flowCount}
					</Text>
					<Text style={[SwitchPageStyles.item_text,{flex:1}]}>
						{portJson.aggregate.packetCount}
					</Text>
					<Text style={[SwitchPageStyles.item_text,{flex:1}]}>
						{portJson.aggregate.byteCount}
					</Text>
					<Text style={[SwitchPageStyles.item_text,{flex:1}]}>
						{portJson.aggregate.flags}
					</Text>
				</View>
			</TouchableOpacity>
		);
	}

	renderFlows(flowJson) {
		return (
			<TouchableOpacity
				style={SwitchPageStyles.item_wrapper}
				onPress={this.switchItemOnPress.bind(this,flowJson.switchId)}
			>
				<View style={{flexDirection: 'row'}}>
					<Text style={[SwitchPageStyles.item_text,{flex:3}]}>
						{flowJson.switchId}
					</Text>
					<Text style={[SwitchPageStyles.item_text,{flex:1}]}>
						{flowJson.aggregate.version}
					</Text>
				</View>
				<View style={{flexDirection: 'row', alignItems: 'center'}}>
					<Text style={[SwitchPageStyles.item_text,{flex:1}]}>
						{flowJson.aggregate.flowCount}
					</Text>
					<Text style={[SwitchPageStyles.item_text,{flex:1}]}>
						{flowJson.aggregate.packetCount}
					</Text>
					<Text style={[SwitchPageStyles.item_text,{flex:1}]}>
						{flowJson.aggregate.byteCount}
					</Text>
					<Text style={[SwitchPageStyles.item_text,{flex:1}]}>
						{flowJson.aggregate.flags}
					</Text>
				</View>
			</TouchableOpacity>
		);
	}
}

var SwitchInfoPageStyles = StyleSheet.create({
	item_wrapper: {
		borderWidth: 3,
		borderRadius: 5,
		borderColor: '#0080FF',
		padding: 10,
		margin: 5
	},
	item_tittle: {
		color: 'black',
		fontSize: 15,
		fontWeight: 'bold'
	},
	item_text: {
		fontSize: 20,
		fontWeight: 'bold',
		color: 'black'
	}
});

module.exports = SwitchInfoPage;