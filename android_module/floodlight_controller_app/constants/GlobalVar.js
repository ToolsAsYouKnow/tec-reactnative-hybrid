/**
 * Created by skylan on 16/5/23.
 */
'use strict';

import Storage from 'react-native-storage';

// Main color
export const TOOL_BAR_COLOR = 'F9F900';
export const STATUS_BAR_COLOR = TOOL_BAR_COLOR + '88';

//
global.storage = new Storage({
	// 最大容量，默认值1000条数据循环存储
	size: 1000,

	// 数据过期时间，默认一整天（1000 * 3600 * 24秒）
	defaultExpires: 1000 * 3600 * 24,

	// 读写时在内存中缓存数据。默认启用。
	enableCache: true,

	// 如果storage中没有相应数据，或数据已过期，
	// 则会调用相应的sync同步方法，无缝返回最新数据。
	sync : {
		// 同步方法的具体说明会在后文提到
	}
});

export const PORT_STORAGE_KEY = 'portSave';
export const SWITCH_STORAGE_KEY = 'portSave';

