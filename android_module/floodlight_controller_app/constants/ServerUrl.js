'use strict';


// IP and Port
export const HOST_IP = '192.168.1.89';
export const HOST_PORT = '8080';
export const HOST_URL = 'http://' + HOST_IP + ':' + HOST_PORT;

// Sub URL
export const WM = '/wm';
export const CORE = '/core';

//---------------------------------------Controller--------------------------------------------
// Get Controller Health Info
export const CONTROLLER_STATE = WM + CORE + '/health/json';
// Get Controller Memory Info
export const CONTROLLER_MEM = WM + CORE + '/memory/json';
// Controller Run Time
export const CONTROLLER_UPTIME = WM + CORE + '/system/uptime/json';

// Get Switches/Nodes/Links Number
export const TOPO_SUMMARY = WM + CORE + '/controller/summary/json';

//---------------------------------------Switch--------------------------------------------
// Get All Switches Info
export const SWITCHES_INFO = WM + CORE + '/switch/all/aggregate/json';

//---------------------------------------Host--------------------------------------------
export const ALL_HOST_INFO = WM + '/device/';