!function(e,n){for(var t in n)e[t]=n[t]}(exports,function(e){var n={};function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}return t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:o})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(t.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)t.d(o,r,function(n){return e[n]}.bind(null,r));return o},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=0)}([function(e,n,t){"use strict";n.__esModule=!0,n.AEXECEL=void 0,function(e){var n=function(){function e(e){e?this.fileName=e:e="测试文件",this.fileExtension="xml"}return e.prototype.CreateExcel=function(){var e=document.createElement("a");e.href='<?xml version="1.0"?>\n    <?mso-application progid="Excel.Sheet"?>\n    <Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"\n        xmlns:o="urn:schemas-microsoft-com:office:office"\n        xmlns:x="urn:schemas-microsoft-com:office:excel"\n        xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"\n        xmlns:html="http://www.w3.org/TR/REC-html40">\n      < /Workbook>',e.download=this.fileName+"."+this.fileExtension,document.body.appendChild(e),e.click()},e}();e.AExecel=n}(n.AEXECEL||(n.AEXECEL={}))}]));
//# sourceMappingURL=index.js.map