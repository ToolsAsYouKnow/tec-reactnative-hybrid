/**
 * Created by skylan on 16/5/13.
 */

'use strict';

import React, {
	Component,
} from 'react'

import {
	View,
	Text,
	DrawerLayoutAndroid,
	ScrollView,
	Image,
	StyleSheet,
	Navigator,
	TouchableHighlight
} from 'react-native'

import MyStatusBar from '../common/widget/CommonStatusBar';

// Sub page
import ControllerPage from './controller/ControllerPage';
import SwitchPage from './switch/SwitchPage';
import SwitchInfoPage from './switch/SwtichInfoPage';
import HostPage from './host/HostPage';
import FlowPage from './flow/FlowPage';
import SettingPage from './other/SettingPage';
import AboutPage from './other/AboutPage';

const DRAWER_WEIGHT = 250;

global.drawer_menu_tittle_text = [
	'Controller',
	'Switches',
	'Hosts',
	'Flow',
	'',
	'Setting',
	'About',
	'Exit'
];

var _navigator;

class NavButton extends React.Component {
	render() {
		return (
			<TouchableHighlight
				style={[MainPageStyle.drawer_item, this.props.style]}
				underlayColor="#B5B5B5"
				onPress={this.props.onPress}>
				<Text style={MainPageStyle.drawer_item_txt}>{this.props.text}</Text>
			</TouchableHighlight>
		);
	}
}

class DrawerDemo extends Component {
	// 构造
	constructor(props) {
		super(props);
		// 初始状态
		this.state = {};
	}

	render() {
		var navigationView = (
			<View style={{flex: 1, backgroundColor: '#fff'}}>
				<ScrollView
					showsVerticalScrollIndicator={false}>
					<Image
						source={require('../../../img/bg_drawer_menu.android.png')}
						style={{width: DRAWER_WEIGHT, height: 170}}
					/>
					{this.makeMenuItems()}
				</ScrollView>
			</View>
		);

		return (
			<DrawerLayoutAndroid
				drawerWidth={DRAWER_WEIGHT}
				drawerPosition={DrawerLayoutAndroid.positions.Left}
				keyboardDismissMode={'on-drag'}
				renderNavigationView={() => navigationView}
				ref={(drawer) => { this.drawer = drawer; }}>
				<MyStatusBar/>
				<Navigator
					style={MainPageStyle.container}
					initialRoute={{id: drawer_menu_tittle_text[1]}}
					renderScene={this._routeMapping.bind(this)}
					configureScene={()=>{return Navigator.SceneConfigs.FadeAndroid}}
				/>
			</DrawerLayoutAndroid>

		);
	}

	makeMenuItems() {
		var drawer_menu_items = [];
		for (var ii = 0; ii < drawer_menu_tittle_text.length; ii++) {
			drawer_menu_items[ii] = (
				<NavButton
					key={ii}
					text={drawer_menu_tittle_text[ii]}
					onPress={this._onPressDrawerMenuItem.bind(this, ii)}
				/>
			)
		}
		return drawer_menu_items;
	}

	_onPressDrawerMenuItem(number) {
		this.drawer.closeDrawer();
		_navigator.resetTo({id: drawer_menu_tittle_text[number]});
	}

	_routeMapping(route, navigationOperations, onComponentRef) {
		_navigator = navigationOperations;
		// Controller sub page
		if (route.id === drawer_menu_tittle_text[0]) {
			return <ControllerPage navigator={navigationOperations} route={route}/>;
		}
		// Switch sub page
		if (route.id === drawer_menu_tittle_text[1]) {
			return <SwitchPage navigator={navigationOperations} route={route}/>;
		}
		// Switch Info page
		if (route.id === 'Switch Info') {
			return <SwitchInfoPage navigator={navigationOperations} route={route}/>;
		}
		// Host sub page
		if (route.id === drawer_menu_tittle_text[2]) {
			return <HostPage navigator={navigationOperations} route={route}/>;
		}
		// Topo sub page
		if (route.id === drawer_menu_tittle_text[3]) {
			return <FlowPage navigator={navigationOperations} route={route}/>;
		}
		// Setting page
		if (route.id === drawer_menu_tittle_text[5]) {
			return <SettingPage navigator={navigationOperations} route={route}/>;
		}
		// About page
		if (route.id === drawer_menu_tittle_text[6]) {
			return <AboutPage navigator={navigationOperations} route={route}/>;
		}
	}

	// _configureScene(route) {
	// 	if (route.sceneConfig) {
	// 		return route.sceneConfig;
	// 	}
	// 	return Navigator.SceneConfigs.FadeAndroid;
	// }
}

var MainPageStyle = StyleSheet.create({
	container: {
		flex: 1
	},
	drawer_menu_view: {
		padding: 20
	},
	drawer_item: {
		backgroundColor: 'white',
		padding: 15,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderTopWidth: StyleSheet.hairlineWidth,
		borderBottomColor: '#CDCDCD',
		borderTopColor: '#CDCDCD'
	},
	drawer_item_txt: {
		fontSize: 18,
		color: 'black'
	}
});

module.exports = DrawerDemo;
