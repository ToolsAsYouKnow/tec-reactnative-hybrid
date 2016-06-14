/**
 * Created by skylan on 16/5/17.
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

var _navigator;
var _route;

class AboutPage extends Component {
	// 构造
	constructor(props) {
		super(props);
		_navigator = this.props.navigator;
		_route = this.props.route;

		// 初始状态
		this.state = {};
	}

	render() {
		return (
			<View>
				<MyToolBar title={_route.id}/>
				<View style={{alignItems: 'center', padding: 50}}>
					<Text style={{fontSize:50}}>Created by SkyLan</Text>
					<Text style={{fontSize:20, marginTop:20}}>A SDN Controller APP Based On Floodlight</Text>
					<Text style={{fontSize:20, marginTop:20}}>copyright@Skylan.c.c</Text>
				</View>
			</View>
		)
	}
}

module.exports = AboutPage;