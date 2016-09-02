function detect(targetUrl) {
	window.onerror = function(msg, url, line, col, errorobj) {
		var param = {
			'message': msg,
			'page': url,
			'line': line,
			'col': col,
			'errorobj': errorobj
		};
		var target = targetUrl + '?' + toQueryString(param);

		function toQueryPair(key, value) {
			if (typeof value == 'undefined') {
				return key;
			}
			return key + '=' + encodeURIComponent(value === null ? '' : String(value));
		};
		
		function toQueryString(obj) {
			var ret = [];
			for (var key in obj) {
				key = encodeURIComponent(key);
				var values = obj[key];
				if (values && values.constructor == Array) { //数组 
					var queryValues = [];
					for (var i = 0, len = values.length, value; i < len; i++) {
						value = values[i];
						queryValues.push(toQueryPair(key, value)); //[key=value,key=value,key=value]
					}
					ret = ret.concat(queryValues); //数组与数组的合并
				} else { //字符串 
					ret.push(toQueryPair(key, values)); //[key=value,key=value,key=value,a=1,a=2]
				}
			}
			return ret.join('&');
		};
		var script = document.createElement('img');
		script.src = target;
		script.style.display = 'none';
		document.body.appendChild(script);
	};
}
