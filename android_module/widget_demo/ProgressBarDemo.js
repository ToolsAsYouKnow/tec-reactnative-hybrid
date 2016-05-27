'use strict';

import React, {
	Component,
} from 'react'

import {
	View,
	ProgressBarAndroid,
} from 'react-native';

var TimerMixin = require('react-timer-mixin');

var MovingBar = React.createClass({
	mixins: [TimerMixin],

	getInitialState: function () {
		return {
			progress: 0
		};
	},

	componentDidMount: function () {
		this.setInterval(
			() => {
				var progress = (this.state.progress + 0.02) % 1;
				this.setState({progress: progress});
			}, 50
		);
	},

	render: function () {
		return <ProgressBarAndroid progress={this.state.progress} {...this.props} />;
	},
});

var ProgressBarAndroidExample = React.createClass({

	statics: {
		title: '<ProgressBarAndroid>',
		description: 'Visual indicator of progress of some operation. ' +
		'Shows either a cyclic animation or a horizontal bar.',
	},

	render: function () {
		return (
			<View>
				<ProgressBarAndroid />

				<ProgressBarAndroid styleAttr="Normal"/>


				<ProgressBarAndroid styleAttr="Small"/>


				<ProgressBarAndroid styleAttr="Large"/>


				<ProgressBarAndroid styleAttr="Inverse"/>


				<ProgressBarAndroid styleAttr="SmallInverse"/>


				<ProgressBarAndroid styleAttr="LargeInverse"/>


				<ProgressBarAndroid styleAttr="Horizontal"/>


				<MovingBar styleAttr="Horizontal" indeterminate={false}/>


				<ProgressBarAndroid styleAttr="Large" color="red"/>


				<ProgressBarAndroid styleAttr="Horizontal" color="black"/>


				<MovingBar styleAttr="Horizontal" indeterminate={false} color="blue"/>
			</View>

		);
	},
});

module.exports = ProgressBarAndroidExample;