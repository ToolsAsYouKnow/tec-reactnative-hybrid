'use strict';

import React, {
	Component
} from 'react';

import {
	Text,
	View
} from 'react-native'

// Server URL import
import * as URL from '../constants/ServerUrl'
import Progress from '../common/widget/CommonProgressBar'

class WelcomePage extends Component {
	// 构造
	constructor(props) {
		super(props);
		// 初始状态
		this.state = {
			healthy: false
		};
	}

	render() {
		if (this.state.healthy) {
			return (
				<Text>
					The server is HEALTHY.
				</Text>
			)
		} else {
			return (
				<View>
					<Progress />
					<Text>
						Checking Server.......
					</Text>
				</View>

			)
		}
	}

	componentDidMount() {
		this.checkServer();
	}

	checkServer() {
		fetch(URL.HOST_URL + URL.CONTROLLER_STATE)
			.then((response) => response.json())
			.then((serverStatus)=> {
				this.setState({
					healthy: serverStatus.healthy
				})
			}).done();
	}

}

module.exports = WelcomePage;

