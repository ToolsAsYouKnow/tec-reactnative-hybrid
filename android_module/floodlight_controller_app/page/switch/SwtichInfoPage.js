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
			switchPort: {}
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
					switchDes: responseJson.desc,
					isDescLoaded: true
				})
			}).done();
	}

	getSwitchPorts() {
		fetch(URL.HOST_URL + URL.SWITCHES_PORT_1 + _route.switchId + URL.SWITCHES_PORT_2)
			.then((response) => response.json())
			.then((responseJson)=> {
				this.setState({
					switchPort: responseJson['port_reply'][0],
					isPortLoaded: true
				})
			}).done();
	}

	getSwitchFlow() {
		fetch(URL.HOST_URL + URL.SWITCHES_FLOW_1 + _route.switchId + URL.SWITCHES_FLOW_2)
			.then((response) => response.json())
			.then((responseJson)=> {
				this.setState({
					isFlowLoaded: true
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
					<View style={{alignItems: 'center', padding: 100}}>
						<Text>Sub Page</Text>
						<Text>{_route.switchId}</Text>
						<Text>{_navigator.getCurrentRoutes().length}</Text>
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
					<TouchableOpacity style={SwitchInfoStyles.itemWrapper} key={arg}>
						<Text style={SwitchInfoStyles.item_tittle}>{arg}</Text>
						<Text style={SwitchInfoStyles.item_text}>{this.state.switchDes[arg]}</Text>
					</TouchableOpacity>;
				count++;
			}
			return descItemList;
		}
	}
}

var SwitchInfoStyles = StyleSheet.create({
	itemWrapper: {
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