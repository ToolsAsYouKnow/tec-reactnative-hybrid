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

class SettingPage extends Component {
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
				<MyToolBar title={_route.message}/>
				<View style={{alignItems: 'center', padding: 100}}>
					<Text>Sub Page</Text>
					<Text>{_route.message}</Text>
					<Text>{_navigator.getCurrentRoutes().length}</Text>
				</View>
			</View>
		)
	}
}

module.exports = SettingPage;