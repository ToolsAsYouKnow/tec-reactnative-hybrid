'use strict';

import React, {
	Component,
} from 'react'

import {
	StyleSheet,
	ProgressBarAndroid
} from 'react-native';

class CommonProgressBar extends Component{
	render() {
		return <ProgressBarAndroid styleAttr='Horizontal' color="blue" style={ProgressBarStyle.pos}/>;
	}
};

var ProgressBarStyle = StyleSheet.create({
	pos: {
	}
});

module.exports = CommonProgressBar;