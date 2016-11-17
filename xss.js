function VaildURL(sUrl)
{
	return (/^(https?:\/\/)?[\w\-.]+\.(qq|taotao)\.com($|\/|\\)/i).test(sUrl)||(/^[\w][\w\/\.\-_%]+$/i).test(sUrl)||(/^[\/\\][^\/\\]/i).test(sUrl) ? true : false;
}

//html正文编码：对需要出现在HTML正文里(除了HTML属性外)的不信任输入进行编码
function HtmlEncode(sStr)
{
	if(typeof sStr == 'string'){
		sStr = sStr.replace(/&/g,"&amp;");
		sStr = sStr.replace(/>/g,"&gt;");
		sStr = sStr.replace(/</g,"&lt;");
		sStr = sStr.replace(/"/g,"&quot;");
		sStr = sStr.replace(/'/g,"&#39;");
	}
	return sStr;
}

//html正文解码：对HtmlEncode函数的结果进行解码
function HtmlUnEncode(sStr)
{
	if(typeof sStr == 'string'){
		sStr = sStr.replace(/&amp;/g,"&");
		sStr = sStr.replace(/&gt;/g,">");
		sStr = sStr.replace(/&lt;/g,"<");
		sStr = sStr.replace(/&quot;/g,'"');
		sStr = sStr.replace(/&#39;/g,"'");
	}
	return sStr;
}

/*
html属性编码：对需要出现在HTML属性里的不信任输入进行编码
注意:
(1)该函数不适用于属性为一个URL地址的编码.这些标记包括:a/img/frame/iframe/script/xml/embed/object...
属性包括:href/src/lowsrc/dynsrc/background/...
(2)该函数不适用于属性名为 style="[Un-trusted input]" 的编码
*/
function HtmlAttrEncode(sStr)
{
	if(typeof sStr == 'string'){
		sStr = sStr.replace(/&/g,"&amp;");
		sStr = sStr.replace(/>/g,"&gt;");
		sStr = sStr.replace(/</g,"&lt;");
		sStr = sStr.replace(/"/g,"&quot;");
		sStr = sStr.replace(/'/g,"&#39;");
		sStr = sStr.replace(/=/g,"&#61;");
		sStr = sStr.replace(/`/g,"&#96;");
	}
	return sStr;
}

/*
url编码：对需要出现在HTML属性里的URL进行编码
属性包括:href/src/lowsrc/dynsrc/background/...
*/
function UriEncode(sStr)
{
	if(typeof sStr == 'string'){
		sStr = encodeURI(sStr);
		sStr = sStr.replace(/javascript:/ig, '');
		sStr = sStr.replace(/\+/g, "%2B");
	}
	return sStr;
}

/*
对需要出现在一个URI的一部分的不信任输入进行编码 
例如:
<a href="http://search.msn.com/results.aspx?q1=[Un-trusted-input]& q2=[Un-trusted-input]">Click Here!</a>
以下字符将会被编码: 
除[a-zA-Z0-9.-_]以外的字符都会被替换成URL编码
*/
function UriComponentEncode(sStr)
{
	if(typeof sStr == 'string'){
		sStr = encodeURIComponent(sStr);
		sStr = sStr.replace(/~/g,"%7E");
		sStr = sStr.replace(/!/g,"%21");
		sStr = sStr.replace(/\*/g,"%2A");
		sStr = sStr.replace(/\(/g,"%28");
		sStr = sStr.replace(/\)/g,"%29");
		sStr = sStr.replace(/'/g,"%27");
		sStr = sStr.replace(/\?/g,"%3F");
		sStr = sStr.replace(/;/g,"%3B");
	}
	return sStr;
}

//用做过滤直接放到HTML里js中的
function ScriptEncode(sStr)
{
	return sStr.replace(/[\\"']/g, function(r){ return "\\"+r; }).replace(/%/g, "\\x25").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\x01/g, "\\x01");
}

//用做过滤直接放到正则表达式中的
function RegexpEncode(sStr)
{
	return sStr.replace(/[\\\^\$\*\+\?\{\}\.\(\)\[\]]/g, function(a,b){ return "\\"+a; });
}
