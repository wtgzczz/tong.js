(function() {
	var root = window,
		tong = {}; //生成一个命名空间tong
	root.tong = tong; //把命名空间挂载到window下，以便外部访问

	/*私有函数 类型判断*/
	var getType = function(para) {
			return Object.prototype.toString.call(para).slice(8, -1);
		}
		/*对象浅拷贝*/
	var shallowCopy = function(old, newer) {
			for (i in old) {
				newer[i] = old[i];
			}
		}
		/*对象深拷贝*/
	var deepCopy = function(newer) {
			var obj = {};
			for (i in newer) {
				obj[i] = typeof newer[i] == 'object' ? deepCopy(newer[i]) : newer[i];
			}
			return obj;
		}
		
	var util = {};
	tong.util = util;
	/*传入的字符串是否重复*/
	util.isDuplicate=function(){
		 var array = Array.prototype.slice.call(arguments);  //arguments为数组
             array.sort(compare);
         var result;
         var compare = function(value1,value2){           //按从小到大的顺序排
                return value1-value2;
                }      
            for(var i = 0;i< array.length-1;i++){
                        if(array[i] == array[i+1]){
                                result = true;
                                break;
                        }
                        else{
                                result = false;
                        }
                            }
                    return result;
            }	
		
		/*数组方法*/
	var arr = {};
	tong.array = arr;

	/*数组中是否含有某值*/
	arr.contains = function(arr, content) {
			for (i in arr) {
				if (arr[i] == content) {
					return true;
				}
			}
			return false;
		}
		/*数组去重*/
	arr.unique = function(arr) {
			var newArr = [],
				judgeObj = {}; //hash表
			for (var i = 0, len = arr.length; i < len; i++) {
				var item = arr[i];
				if (judgeObj[item] == undefined) { //如果hash表中没有当前项
					newArr.push(item);
					judgeObj[item] = true;
				}
			}
			return newArr;
		}
		/*山形数组去重*/
	arr.uniqueMountain = (function(){
	    var p,
		q,
		len=arr.length,
		judgeObj = {};
		p=0;
		q=len-1;
		return function print(arr){
			 if(p>len || q<0) return;
				if(arr[p]<arr[q]){
					if(!judgeObj[arr[p]]){
						console.log(arr[p]);
						judgeObj[arr[p]] = true;
					}
						p++;
						arguments.callee(arr);
				}else if(arr[p]>arr[q]){
					if(!judgeObj[arr[q]]){
						console.log(arr[q]);
						judgeObj[arr[q]] = true;
					}
						q--;
						arguments.callee(arr);
					
				}else{
					if(!judgeObj[arr[q]] && !judgeObj[arr[p]]){
						console.log(arr[p]);
						judgeObj[arr[p]] = true;
						judgeObj[arr[q]] = true;
					}
						p++;
						q--;
						arguments.callee(arr);
				}
			}
		});	
		/*删除指定元素*/
	arr.remove = function(arr, content) {
			for (var i = 0, len = arr.length; i < len; i++) {
				if (arr[i] == content) {
					arr.splice(i, 1);
				}
			}
			return arr;
		}
		/*优化的数组冒泡排序*/
	arr.bubblSort = function(arr) {
			var swap = function(index1, index2) {
				var aux = arr[index1];
				arr[index1] = arr[index2];
				arr[index2] = aux;
			}
			for (var i = 0, len = arr.length; i < len; i++) {
				for (var j = 0; j < len - 1 - i; j++) {
					if (arr[j] > arr[j + 1]) {
						swap(j, j + 1);
					}
				}
			}
			return arr;
		}
		/*增对数组中的每个元素执行fn函数*/
	arr.each = function(arr, fn) {
		for (var i = 0, len = arr.length; i < len; i++) {
			fn.call(arr, i, arr[i]);
		}
	}

	/*css方法*/
	var css = {};
	tong.css = css;

	/*获取元素css样式*/
	css.getCss = function(ele, styleName) {
			var styles = window.getComputedStyle ? window.getComputedStyle(ele, null) : ele.currentStyle;
			return styles[styleName];
		}
		/*设置元素css样式*/
	css.setCss = function(ele, styleNames) {
		if (getType(ele) == 'Array') {
			for (var j = 0, len = ele.length; j < len; j++) {
				if (getType(styleNames) == 'Object') {
					for (i in styleNames) {
						ele[j]['style'][i] = styleNames[i];
					}
				}
			}
		} else if (getType(styleNames) == 'Object') {
			for (i in styleNames) {
				ele['style'][i] = styleNames[i];
			}
		}

	}

	/*事件方法*/
	var eventUtil = {};
	tong.eventUtil = eventUtil;

	/*添加监听事件*/
	eventUtil.addHandler = function(ele, type, handler) {
			if (ele.addEventListener) {
				ele.addEventListener(type, handler, false);
			} else if (ele.attachEvent) {
				ele.attachEvent('on' + type, handler);
			} else {
				ele["on" + type] = handler;
			}
		}
		/*获得事件对象*/
	eventUtil.getEvent = function(event) {
			return event ? event : window.event;
		}
		/*获取目标*/
	eventUtil.getTarget = function(event) {
			return event.target || event.srcElement;
		}
		/*阻止事件冒泡*/
	eventUtil.stopPropagation = function(event) {
			if (event.stopPropagation) {
				event.stopPropagation();
			} else {
				event.cancelable = true;
			}
		}
		/*阻止默认行为*/
	eventUtil.preventDefault = function(event) {
		if (event.preventDefault) {
			event.preventDefault();
		} else {
			event.returnValue = false;
		}
	}

	/*dom操作*/
	var dom = {};
	tong.dom = dom;

	/*判断元素是否有该类名*/
	dom.hasClass = function(ele, className) {
			if (!ele.className) {
				return false;
			} else {
				var arr = ele.className.split(" ");
				for (var i = 0, len = arr.length; i < len; i++) {
					if (arr[i] == className) {
						return true;
					} else {
						return false;
					}
				}
			}
		}
		/*为dom增加一个class类名*/
	dom.addClass = function(ele, newClassName) {
			if (!ele.className) {
				ele.className = newClassName;
			} else {
				if (!dom.hasClass(ele, newClassName)) {
					var oldName = ele.className;
					var newName = [oldName, newClassName].join(' ');
					ele.className = newName;
				}
			}
		}
		/*为dom删除一个class类名*/
	dom.removeClass = function(ele, oldClassName) {
			if (oldClassName == '*') {
				ele.className = '';
			}
			var nameArry = ele.className.split(' ');
			for (var i = 0, len = nameArry.length; i < len; i++) {
				if (nameArry[i] == oldClassName) {
					nameArry.splice(i, 1);
				};
			}
			var names = nameArry.join(' ');
			ele.className = names;
		}
		/*通过类名获取元素*/
	dom.getElementsByClass = function(className, parent) {
			if (typeof className != "string") return false;
			var result = [],
				eles;
			parent ? eles = parent.getElementsByTagName("*") : eles = document.getElementsByTagName("*");
			for (var i = 0, len = eles.length; i < len; i++) {
				var arr = eles[i].className.split(" ");
				for (var j = 0, leng = arr.length; j < leng; j++) {
					if (arr[j] == className) {
						result.push(eles[i]);
					}
				}
			}
			return result;
		}
		/*增加属性值或者获取属性值*/
	dom.attr = function(ele, name, value) {
			if (value) {
				ele.setAttribute(name, value);
			} else {
				var attrName = ele.getAttribute(name);
				return attrName;
			}
		}
		/*设置style样式*/
	dom.setStyle = function(ele, obj) {
			if (getType(obj) != "Object") return false;
			for (var item in obj) {
				ele["style"][item] = obj[item];
			}
		}
		/*绑定事件*/
	dom.on = function(ele, type, handler) {
			eventUtil.addHandler(ele, type, handler);
		}
		/*获取dom位置(元素各边距离页面上和左边的距离)*/
	dom.getPosition = function(ele) {
			var box = ele.getBoundingClientRect();
			return {
				top: box.top, // 元素上边距离页面上边的距离
				left: box.left, // 元素左边距离页面左边的距离
				right: box.right, // 元素右边距离页面左边的距离
				bottom: box.bottom
			}
		}
		/*ajax操作*/
	tong.ajax = function(options) {
		var createXHR = function() {
			if (typeof XMLHttpRequest != 'undefined') {
				return new XMLHttpRequest;
			} else if (typeof ActiveXObject != 'undefined') {
				if (typeof arguments.callee.activeXString != 'string') {
					var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"],
						i, len;
					for (var i = 0, len = versions.length; i < len; i++) {
						try {
							new ActiveXObect(versions[i]);
							arguments.callee.activeXString = versions[i];
							break;
						} catch (ex) {
							//跳过
						}
					}
				}
				return new ActiveXObect(arguments.callee.activeXString);
			} else {
				throw new Error("No XHRobject available.");
			}
		}
		var xhr = createXHR();
		var options = options || {};
		var type = options.type || 'GET';
		var data = options.data || {};
		var url = options.url;
		var success = options.success || function(data) {};
		var fail = options.fail || function(data) {};
		xhr.onreadyStateChange = function() {
			if (xhr.readyState == 4) {
				if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
					success(xhr.responseText, xhr);
				} else if (xhr.readyState == 4 && xhr.status == 404) {
					fail(xhr.responseText, xhr);
				}
			}
		}
		var str = '?';
		if (type.toUpperCase() === 'GET') {
			for (var i in data) {
				var item = data[i];
				str += i + '=' + JSON.stringify(item) + '&';
			}
			str = str.substring(0, str.length - 1);
			xhr.open("GET", url + str, true);
			xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
			xhr.send(null);
		} else if (type.toUpperCase() === 'POST') {
			xhr.open("POST", url, true);
			xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhr.send(JSON.stringify(data));
		}
	}
})();
