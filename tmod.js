(function(global) {

	var getType = Object.prototype.toString,
		isArray = function(obj) {
			return getType.call(obj) === '[object Array]';
		},
		isObject = function(obj) {
			return getType.call(obj) === '[object Object]';
		},
		isFunction = function(obj) {
			return getType.call(obj) === '[object Function]';
		},
		baseJsUrl,
		getRootPath = function() {
			var curWwwPath = window.document.location.href,
				pathName = window.document.location.pathname, //得到路径
				pos = curWwwPath.indexOf(pathName), //得到“/项目名”斜线的位置
				localhostPath = curWwwPath.substring(0, pos), //得到“协议：//ip：端口”字符串
				projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1); //得到项目名
			return (localhostPath + projectName);
		};

	//存储已经加载好的模块
	var modCache = {};

	/**require和define是同一个函数
	 *@param {Array} deps require或define调用时传入的第一个参数
	 *@callback {Function} reuire或define的第二个参数（即回调函数）
	 */

	var require = function(deps, callback) {

		var params = [],
			depCount = 0,
			doc = document,
			// scripts = doc.getElementsByTagName('script'),
			// modName = doc.currentScript.id || scripts[scripts.length - 1].getAttribute('id'), //获取当前正在执行的脚本名
			modName = doc.currentScript.id, //得到当前正在执行的js文件名
			loadModManage = function(i, dep) {
				depCount++;
				loadModule(dep, function(param) {
					params[i] = param;
					depCount--;
					if (depCount == 0) {
						saveModule(modName, params, callback);
					}
				});
			};

		//依赖模块的参数类型为字符串的数组也可能没依赖
		if (isArray(deps)) {
			for (var i = 0, len = deps.length; i < len; i++) {
				loadModManage(i, deps[i]);
			}
		} else {
			callback = deps;
			saveModule(modName, null, callback);
		}
	};

	// 获取模块真实路径
	//todo路径解析需要考虑返回上一级
	var getRealPath = function(modName) {

		var pathName = global.location.pathname,
			pathNames = pathName.split('/'),
			baseUrl = pathName.replace(pathNames[pathNames.length - 1], ''), //得到当前html文档路径
			modNames = modName.split('/');

		url = baseUrl + modName.replace(/\.\//, '');
		baseJsUrl = url.replace(modNames[modNames.length - 1], '');

		if (url.indexOf('.js') == -1) url += '.js';

		getRealPath = function(modName) {
			if (/\.\//g.test(modName)) {
				url = baseJsUrl + modName.replace(/\.\//, '');
			} else if (/^\//.test(modName)) {
				url = getRootPath() + modName;
			} else {
				url = baseJsUrl + modName;
			}
			if (url.indexOf('.js') == -1) url += '.js';
			return url;
		};
		return url;
	};


	/**通过动态创建script来异步执行模块
	 *@param {String} modeName  模块名字
	 *@param {String} url  模块全路径
	 */
	var execScript = function(modName, url) {

		var doc = document,
			oScript = doc.createElement('script');
		oScript.id = modName;
		oScript.async = true;
		oScript.src = url;
		doc.body.appendChild(oScript);
	};

	//加载依赖模块
	var loadModule = function(modName, callback) {

		var url = getRealPath(modName),
			mod;

		//如果该模块已经被加载
		if (modCache[modName]) {
			mod = modCache[modName];
			if (mod.status == 'loaded') {
				setTimeout(callback(this.params), 0);
			} else {
				//如果未到加载状态直接往onLoad插入值，在依赖项加载好后会解除依赖
				mod.onload.push(callback);
			}
		} else {
			mod = modCache[modName] = {
				modName: modName,
				status: 'loading',
				out: null,
				onload: [callback]
			};
			// 动态执行js
			execScript(modName, url);
		}
	};

	/**
	 *@param {String} modName 模块的名字
	 *@param {Array}  params  参数会被传送到callback或者require或define的回调
	 *@param {Function} callBack 也是一个参数在 require 或 define
	 */
	var saveModule = function(modName, params, callback) {

		var mod, fn;
		if (modCache.hasOwnProperty(modName)) {
			mod = modCache[modName];
			mod.status = 'loaded';
			if (isObject(callback)) {
				mod.out = callback;
			} else if (isFunction(callback)) {
				//暴露模块
				mod.out = callback.apply(global, params);
			}
			while (fn = mod.onload.shift()) {
				fn(mod.out);
			}
		} else {
			callback && callback.apply(global, params);
		}
	};

	// 为了避免手动引入入口script，根据引入框架的data-main来指定入口script
	var curScript = function() {

		var doc = document,
			driveMod = doc.currentScript.getAttribute('data-main') || doc.getElementsByTagName('script')[0].getAttribute('data-main'),
			oScript = doc.createElement('script'),
			url = getRealPath(driveMod);
		execScript(driveMod, url);
	};
	curScript(); //从入口开始执行
	global.require = require;
	global.define = require;
})(this);
