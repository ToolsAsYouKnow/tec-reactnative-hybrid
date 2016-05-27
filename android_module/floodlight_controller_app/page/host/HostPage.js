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

import * as URL from '../../constants/ServerUrl'

var _navigator;
var _route;

class HostPage extends Component {
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
			hostNum: 0,
			activeHostNum: 0
		};
	}

	componentDidMount() {
		this.getHostsInfo();
	}

	getHostsInfo() {
		fetch(URL.HOST_URL + URL.ALL_HOST_INFO)
			.then((response) => response.json())
			.then((responseJson)=> {
				console.log(responseJson);

				var hostNum = responseJson.length;
				var unActiveHostNum = 0;
				for (var hostJson in responseJson) {
					if (responseJson[hostJson].attachmentPoint[0] === undefined) {
						delete responseJson[hostJson];
						unActiveHostNum++;
					}
				}

				this.setState({
					hostNum: hostNum,
					activeHostNum: hostNum - unActiveHostNum,
					dataSource: this.state.dataSource.cloneWithRows(responseJson)
				})
			}).done();
	}

	render() {
		return (
			<View style={{flex:1}}>
				<MyToolBar title={_route.message}/>
				<View style={HostPageStyles.host_summary_view}>
					<Text style={[HostPageStyles.host_summary_text, {color:'red'}]}>
						Total Host Num: {this.state.hostNum}
					</Text>
					<Text style={[HostPageStyles.host_summary_text, {color:'green'}]}>
						Active Host Num: {this.state.activeHostNum}
					</Text>
				</View>
				<ListView
					style={HostPageStyles.hosts_listview}
					dataSource={this.state.dataSource}
					renderRow={(hostJson) => this.renderHost(hostJson)}
				/>
			</View>
		)
	}

	renderHost(hostJson) {

		return (
			<View style={HostPageStyles.host_item_wrapper}>
				<View style={{flex:3}}>
					<Text style={HostPageStyles.host_item_text}>
						{hostJson.mac[0]}
					</Text>
					<Text style={HostPageStyles.host_item_text}>
						{hostJson.ipv4.length !== 0 ? hostJson.ipv4[0] : 'EMPTY'}
					</Text>
				</View>
				<View style={{flex:4}}>
					<Text style={HostPageStyles.host_item_text}>
						{hostJson.attachmentPoint[0]['switchDPID'] + '-' + hostJson.attachmentPoint[0]['port']}
					</Text>
					<Text style={HostPageStyles.host_item_text}>
						{this.timestampToDate(hostJson.lastSeen)}
					</Text>
				</View>
			</View>
		)
	}

	timestampToDate(timstamp) {
		var date = new Date(timstamp);
		var Y = date.getFullYear() + '-';
		var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
		var D = date.getDate() + ' ';
		var h = date.getHours() + ':';
		var m = date.getMinutes() + ':';
		var s = date.getSeconds();
		return Y+M+D+h+m+s;
	}
}

var HostPageStyles = StyleSheet.create({
	host_summary_view: {
		alignItems: 'center',
		padding: 10,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: '#CDCDCD'
	},
	host_summary_text: {
		fontSize: 20,
		fontWeight: 'bold'
	},
	hosts_listview: {
		borderWidth: 3,
		borderRadius: 5,
		borderColor: '#0080FF',
		padding: 5,
	},
	host_item_wrapper: {
		alignItems: 'center',
		borderWidth: 3,
		borderRadius: 5,
		borderColor: '#0080FF',
		padding: 10,
		margin: 5,
		flexDirection: 'row'
	},
	host_item_text: {
		color: 'black',
		fontWeight: 'bold'
	}
});

module.exports = HostPage;