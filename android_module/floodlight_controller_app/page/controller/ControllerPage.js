/**
 * Created by skylan on 16/5/17.
 */

'use strict';

import React, {
	Component,
} from 'react'

import {
	Text,
	View,
	ScrollView,
	TouchableOpacity,
	StyleSheet
} from 'react-native';

import MyToolBar from '../../common/widget/CommonToolBar';

import * as URL from '../../constants/ServerUrl'

var _navigator;
var _route;

class InfoCell extends Component {
	render() {
		return (
			<TouchableOpacity style={ControllerPageStyles.itemWrapper}>
				<Text style={ControllerPageStyles.item_tittle}>{this.props.title}</Text>
				<Text style={[ControllerPageStyles.item_text, this.props.style]}>
					{this.props.text}
				</Text>
			</TouchableOpacity>
		)
	}
}

class ControllerPage extends Component {
	// 构造
	constructor(props) {
		super(props);

		_navigator = this.props.navigator;
		_route = this.props.route;

		// 初始状态
		this.state = {
			// Controller info
			healthy: false,
			memoryTotal: 0,
			memoryFree: 0,
			uptime: '0 Min\n 0 Sec',

			// Topo summary info
			switchNum: 0,
			hostNum: 0,
			switchLinkNum: 0
		}
	}

	componentDidMount() {
		this.getServerHealthInfo();
		this.getServerMemInfo();
		this.getServerRunTime();
		this.getTopoSummary();
	}

	getServerHealthInfo() {
		fetch(URL.HOST_URL + URL.CONTROLLER_STATE)
			.then((response) => response.json())
			.then((responseJson)=> {
				this.setState({
					healthy: responseJson.healthy
				})
			}).done();
	}

	getServerMemInfo() {
		fetch(URL.HOST_URL + URL.CONTROLLER_MEM)
			.then((response) => response.json())
			.then((responseJson)=> {
				this.setState({
					memoryTotal: responseJson.total / 1024 / 1024,
					memoryFree: Math.round(responseJson.free / 1024 / 1024)
				})
			}).done();
	}

	getServerRunTime() {
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

	getTopoSummary() {
		fetch(URL.HOST_URL + URL.TOPO_SUMMARY)
			.then((response) =>response.json())
			.then((responseJson)=> {
				console.log(responseJson);
				this.setState({
					switchNum: responseJson['# Switches'],
					hostNum: responseJson['# hosts'],
					switchLinkNum: responseJson['# inter-switch links']
				})
			}).done();
	}

	render() {
		return (
			<View>
				<MyToolBar title={_route.message}/>
				<ScrollView
					style={ControllerPageStyles.verticalScrollView}
					showsVerticalScrollIndicator={true}>
					<InfoCell key='health' style={this.state.healthy === true ?{color:'green'}:{color:'red'}}
					          text={this.state.healthy === true ? 'HEALTHY' : 'UNHEALTHY'}
					/>
					<View key={'mem'} style={{flexDirection: 'row'}}>
						<InfoCell key='free' style={{color:'green'}}
						          title='Free Memory (MB)'
						          text={this.state.memoryFree}
						/>
						<InfoCell key='total' style={{color:'blue'}}
						          title='Total Memory (MB)'
						          text={this.state.memoryTotal}
						/>
					</View>
					<InfoCell key='uptime' style={{color:'darkgoldenrod'}}
					          title='Run Time'
					          text={this.state.uptime}
					/>
					<View key={'topo'} style={{flexDirection: 'row'}}>
						<InfoCell key='switch' style={{color:'brown'}}
						          title='Switches'
						          text={this.state.switchNum}
						/>
						<InfoCell key='host' style={{color:'brown'}}
						          title='Hosts'
						          text={this.state.hostNum}
						/>
						<InfoCell key='link' style={{color:'brown'}}
						          title='Iner Links'
						          text={this.state.switchLinkNum}
						/>
					</View>
				</ScrollView>
			</View>
		)
	}
}

var ControllerPageStyles = StyleSheet.create({
	verticalScrollView: {
		margin: 5
	},
	itemWrapper: {
		flex: 1,
		alignItems: 'center',
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
		fontSize: 50,
		fontWeight: 'bold'
	},
	horizontalItemWrapper: {
		padding: 50
	}
});

module.exports = ControllerPage;