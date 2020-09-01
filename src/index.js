"use strict";
exports.__esModule = true;
console.log('开始');
// ie浏览器支持使用activeXoBJECT
function isIE() {
    return window.ActiveXObject ? true : false;
}
// 导出方法
function JSON2SCV() {
    if (!isIE()) {
        aTagExport();
    }
    // 对activeXobject的处理
    activeXObjectExport();
}
exports["default"] = JSON2SCV;
// activeXobject
function activeXObjectExport() {
}
// a标签
function aTagExport() {
    var aElement = document.createElement("a");
    document.querySelector('body').appendChild(aElement);
}
