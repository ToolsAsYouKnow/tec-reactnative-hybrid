/**
 * Created by skylan on 16/5/13.
 */

'use strict';

import React, {
	Component
} from 'react';

import {
	StatusBar
} from 'react-native';

class CommonStatusBar extends Component {
	render() {
		return <StatusBar
			backgroundColor='#005AB588'
			translucent={true}
			hidden={false}
			animated={true}
		/>
	}
}

module.exports = CommonStatusBar;