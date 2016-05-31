/**
 * Created by skylan on 16/5/29.
 */

'use strict';

import React, {
	Component,
} from 'react'

import {
	Text,
	View
} from 'react-native';

import MyToolBar from '../../common/widget/CommonToolBar';

import * as URL from '../../constants/ServerUrl'

var _navigator;
var _route;

class SwitchInfoPage extends Component {
	// 构造
	constructor(props) {
		super(props);
		_navigator = this.props.navigator;
		_route = this.props.route;

		// 初始状态
		this.state = {};
	}

	componentDidMount() {
		this.getSwitchDesc();
		this.getSwitchPorts();
		this.getSwitchFlow();
	}

	getSwitchDesc() {
		fetch(URL.HOST_URL + URL.SWITCHES_DESC_1 + _route.switchId + URL.SWITCHES_DESC_2s)
			.then((response) => response.json())
			.then((responseJson)=> {
				this.setState({
					healthy: responseJson.healthy
				})
			}).done();
	}

	getSwitchPorts() {
		fetch(URL.HOST_URL + URL.CONTROLLER_MEM)
			.then((response) => response.json())
			.then((responseJson)=> {
				this.setState({
					memoryTotal: responseJson.total / 1024 / 1024,
					memoryFree: Math.round(responseJson.free / 1024 / 1024)
				})
			}).done();
	}

	getSwitchFlow() {
		fetch(URL.HOST_URL + URL.CONTROLLER_UPTIME)
			.then((response) => response.json())
			.then((responseJson)=> {
				var time = responseJson.systemUptimeMsec;
				var timeString = Math.floor(time / 1000 / 60) + ' Min'
					+ '\n'
					+ Math.floor(time / 1000 - Math.floor(time / 1000 / 60) * 60) + ' Sec';
				this.setState({
					uptime: timeString
				})
			}).done();
	}

	render() {
		return (
			<View>
				<MyToolBar title={_route.id}/>
				<View style={{alignItems: 'center', padding: 100}}>
					<Text>Sub Page</Text>
					<Text>{_route.switchId}</Text>
					<Text>{_navigator.getCurrentRoutes().length}</Text>
				</View>
			</View>
		)
	}
}

module.exports = SwitchInfoPage;