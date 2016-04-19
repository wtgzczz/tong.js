function miniFontSize(box,content) {
  var oBox = document.getElementsByClassName(box)[0],
      oContent = document.getElementsByClassName(content)[0],
      cWidth = oContent.offsetWidth,
      bWidth = oBox.offsetWidth,
      cHeight = oContent.offsetHeight,
      bHeight = oBox.offsetHeight;
  if (cWidth >= bWidth || cHeight >= bHeight) {
    var fontStr = oContent.style.fontSize || window.getComputedStyle(oContent).fontSize;
    var fontSize = fontStr.substring(0, fontStr.length - 2);
    if(fontSize > 12){
      var nowFontSize = parseInt(--fontSize) + 'px';
      oContent.style.fontSize = nowFontSize;
      arguments.callee(box,content);
    }
  }
};
