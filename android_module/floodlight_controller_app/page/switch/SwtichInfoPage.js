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
	TouchableOpacity,
	ListView
} from 'react-native';

import MyToolBar from '../../common/widget/CommonToolBar';
import Progress from '../../common/widget/CommonProgressBar';

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
			isFlowLoaded: false,

			switchDes: {},
			flowDS: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2
			})

		};
	}

	componentDidMount() {
		this.getSwitchDesc();
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

	getSwitchFlow() {
		fetch(URL.HOST_URL + URL.SWITCHES_FLOW_1 + _route.switchId + URL.SWITCHES_FLOW_2)
			.then((response) => response.json())
			.then((responseJson)=> {
				let flowsList = responseJson[_route.switchId];
				if (flowsList) {
					this.setState({
						isFlowLoaded: true,
						flowDS: this.state.flowDS.cloneWithRows(flowsList)
					})
				}
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
						<Text style={[SwitchInfoPageStyles.item_text, {color:'green'}]}> Flow </Text>
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
			return <Progress/>;
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

	renderFlows(flowJson) {
		var _flowId;
		var flowInfo = {};
		for (let flowId in flowJson) {
			_flowId = flowId;
			flowInfo = flowJson[flowId];
		}
		return (
			<TouchableOpacity
				style={SwitchInfoPageStyles.item_wrapper}
			>
				<View style={{flexDirection: 'row'}}>
					<Text style={[SwitchInfoPageStyles.item_tittle,{flex:3}]}>
						{_flowId}
					</Text>
					<Text style={[SwitchInfoPageStyles.item_tittle,{flex:1}]}>
						{flowInfo.command}
					</Text>
				</View>
				<View style={{flexDirection: 'row', alignItems: 'center'}}>
					<Text style={[SwitchInfoPageStyles.item_tittle,{flex:1}]}>
						inPort: {flowInfo['match']['in_port']}
					</Text>
					<Text style={[SwitchInfoPageStyles.item_tittle,{flex:1}]}>
						{flowInfo['actions']['actions']}
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