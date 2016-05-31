'use strict';

import React, {
} from 'react'

import {
	AppRegistry
} from 'react-native'

// Movies App
var HomePage = require('./android_module/movies_app/page/HomePage');
var MoviesListPage = require('./android_module/movies_app/page/MoviesListPage');

// Widget Demo
var ProgressBarDemo = require('./android_module/widget_demo/ProgressBarDemo');
var ListViewDemo = require('./android_module/widget_demo/ListViewDemo');
var TextInputDemo = require('./android_module/widget_demo/TextInputDemo');
var ScrollViewDemo = require('./android_module/widget_demo/ScrollViewDemo');
var StatusBarDemo = require('./android_module/widget_demo/StatusBarDemo');
var ToolBarDemo = require('./android_module/widget_demo/ToolBarDemo');
var NavigatorDemo_1 = require('./android_module/widget_demo/navigator_demo/NavigatorDemo');
var NavigatorDemo_2 = require('./android_module/widget_demo/navigator_demo/index');
var ToolBarDemo = require('./android_module/widget_demo/ViewPagerDemo');


// Floodlight Controller App
var WelcomePage = require('./android_module/floodlight_controller_app/page/WelcomePage');
var MainPage = require('./android_module/floodlight_controller_app/page/MainPage');
var MyToolBar = require('./android_module/floodlight_controller_app/common/widget/CommonToolBar');


AppRegistry.registerComponent('WeiPiao', () =>  MainPage);
