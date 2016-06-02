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
	Picker,
	ToastAndroid,
	StyleSheet,
	TouchableOpacity
} from 'react-native';

import MyToolBar from '../../common/widget/CommonToolBar';

import * as URL from '../../constants/ServerUrl';

var _navigator;
var _route;

class FlowPage extends Component {
	// 构造
	constructor(props) {
		super(props);
		_navigator = this.props.navigator;
		_route = this.props.route;

		// 初始状态
		this.state = {
			ds: {},

			switchPortList: [],

			selectSwitch: '',
			selectPort: ''
		};
	}

	componentDidMount() {
		this.getSwitchPorts();
	}

	getSwitchPorts() {
		fetch(URL.HOST_URL + URL.SWITCHES_PORT_1 + 'all' + URL.SWITCHES_PORT_2)
			.then((response) => response.json())
			.then((responseJson)=> {
				this.setState({
					ds: responseJson
				})
			}).done();
	}

	render() {
		return (
			<View>
				<MyToolBar title={_route.id}/>
				<View style={{padding: 20}}>
					<View style={{flexDirection: 'row', alignItems:'center'}}>
						<Text style={[FlowPageStyles.item_text, {color: 'green', flex:1}]}>SWITCH</Text>
						<Picker
							style={{width:200, flex:3}}
							selectedValue={this.state.selectSwitch}
							onValueChange={this.changePortItems.bind(this)}>
							{this.showSwitchItems()}
						</Picker>
					</View>
					<View style={{flexDirection: 'row', alignItems:'center'}}>
						<Text style={[FlowPageStyles.item_text, {color: 'green', flex:1}]}>PORT</Text>
						<Picker
							style={{width:200, flex:3}}
							selectedValue={this.state.selectPort}
							onValueChange={(value) => this.setState({selectPort: value})}>
							{this.state.switchPortList}
						</Picker>
					</View>
					<View style={{flexDirection: 'row', marginTop:40}}>
						<TouchableOpacity
							style={[FlowPageStyles.item_wrapper, {flex:1, alignItems:'center'}]}
							onPress={this._onPressAdd.bind(this)}
						>
							<Text style={[FlowPageStyles.item_tittle, {color:'green'}]}>ADD</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[FlowPageStyles.item_wrapper, {flex:1, alignItems:'center'}]}
							onPress={this._onPressDel.bind(this)}
						>
							<Text style={[FlowPageStyles.item_tittle, {color:'red'}]}>DELETE</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[FlowPageStyles.item_wrapper, {flex:1, alignItems:'center'}]}
							onPress={this._onPressClear.bind(this)}
						>
							<Text style={[FlowPageStyles.item_tittle, {color:'red'}]}>CLEAR</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		)
	}

	showSwitchItems() {
		let switchItems = [];
		let count = 0;
		for (let switchId in this.state.ds) {
			switchItems[count] = <Picker.Item key={switchId} label={switchId} value={switchId}/>;
			count++;
		}
		return switchItems;
	}

	changePortItems(value) {
		this.setState({
			selectSwitch: value
		});

		let count = 0;
		let pickerItemList = [];
		let portList = this.state.ds[value]["port_reply"][0]['port'];
		for (let port in portList) {
			pickerItemList[count] =
				<Picker.Item
					key={portList[port].portNumber}
					label={portList[port].portNumber}
					value={portList[port].portNumber}
				/>;
			count++;
		}

		this.setState({
			switchPortList: pickerItemList
		})
	}

	_onPressAdd() {
		fetch(URL.HOST_URL + URL.FLOW, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				switch: this.state.selectSwitch,
				name: this.state.selectSwitch + '-' + this.state.selectPort,
				cookie: "0",
				priority: "32768",
				in_port: this.state.selectPort,
				active: "true",
				actions: "output=flood"
			})
		})
			.then((response)=>response.json())
			.then((responseJson)=> {
				if (responseJson.status == 'Entry pushed') {
					ToastAndroid.show('Entry pushed', ToastAndroid.SHORT);
				}
			})
			.catch((error)=> {
				ToastAndroid.show(error, ToastAndroid.SHORT);
			});
	}

	_onPressDel() {
		fetch(URL.HOST_URL + URL.FLOW, {
			method: 'DELETE',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: this.state.selectSwitch + '-' + this.state.selectPort
			})
		})
			.then((response)=>response.json())
			.then((responseJson)=> {
				ToastAndroid.show('Flow Delete', ToastAndroid.SHORT);
			})
			.catch((error)=> {
				ToastAndroid.show(error, ToastAndroid.SHORT);
			});
	}

	_onPressClear() {
		fetch(URL.HOST_URL + URL.CLEAR_FLOW)
			.then((response) => response.json())
			.then((responseJson)=> {
				ToastAndroid.show(responseJson.status, ToastAndroid.SHORT);
			}).done();
	}
}

var FlowPageStyles = StyleSheet.create({
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

module.exports = FlowPage;