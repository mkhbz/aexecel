!function(e,t){for(var r in t)e[r]=t[r]}(exports,function(e){var t={};function r(o){if(t[o])return t[o].exports;var n=t[o]={i:o,l:!1,exports:{}};return e[o].call(n.exports,n,n.exports,r),n.l=!0,n.exports}return r.m=e,r.c=t,r.d=function(e,t,o){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(o,n,function(t){return e[t]}.bind(null,n));return o},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";t.__esModule=!0,t.AEXECEL=void 0;var o=r(1);!function(e){var t=function(){function e(e){this.fileName=e||(+new Date).toString()}return e.prototype.arrayToTableStr=function(e){var t="";return t+=o.template.head,t+=o.template.sheet.head,t+="sheet1",t+=o.template.sheet.tail,t+=o.template.mid,t+=o.template.table.head,e.forEach((function(e){t+=e})),t+=o.template.table.tail,t+=o.template.foot},e.prototype.createLink=function(e,t,r){r=r||o.FileType.xml;var n=document.createElement("a");n.download=(t||this.fileName)+"."+r,document.body.appendChild(n),n.href=e,n.click(),document.body.removeChild(n)},e.prototype.createRowArray=function(e,t,r){var o=[],n="";return n+="<tr>",e.forEach((function(e){n+="<td>"+e+"</td>"})),n+="</tr>",o.push(n),t.forEach((function(e){n="<tr>",Object.keys(e).forEach((function(t){r[t]?n+="<td"+r[t]+">"+e[t]+"</td>":n+="<td>"+e[t]+"</td>"})),n+="</tr>",o.push(n)})),o},e.prototype.formatStyle2String=function(e){if(!e||0===e.length)return[];var t=[];return Object.keys(e).forEach((function(r){var o=" style='";Object.keys(e[r]).forEach((function(t){o+=t+":"+e[r][t]+";"})),o.slice(o.length,1),o+="' ",t[r]=o})),t},e.prototype.createByTable=function(e,t,r){var n=this.formatStyle2String(r),i=this.createRowArray(e,t,n),a=new Blob([this.arrayToTableStr(i)],{type:"application/vnd.ms-excel"});a=new Blob([String.fromCharCode(65279),a],{type:a.type}),this.createLink(window.URL.createObjectURL(a),this.fileName,o.FileType.xls)},e.prototype.createLargerCsv=function(e,t){var r,n="";if(this.startTime=new Date,!this.hasActiveXObject)return e.forEach((function(e){n+=e.toString()+","})),n+="\n",t.forEach((function(e){Object.values(e).forEach((function(e){n+=e.toString()+","})),n+="\n"})),r=new Blob([n],{type:"text/plain;charset=utf-8"}),r=new Blob([String.fromCharCode(65279),r],{type:r.type}),this.createLink(window.URL.createObjectURL(r),this.fileName,o.FileType.csv),this.endTime=new Date,{endTime:this.endTime,startTime:this.startTime}},e}();e.AExecel=t}(t.AEXECEL||(t.AEXECEL={}))},function(e,t,r){"use strict";t.__esModule=!0,t.template=t.FileType=void 0,function(e){e.csv="csv",e.xml="xml",e.xls="xls"}(t.FileType||(t.FileType={}));t.template={head:'<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8"><head>\x3c!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets>',sheet:{head:"<x:ExcelWorksheet><x:Name>",tail:"</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>"},mid:"</x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--\x3e</head><body>",table:{head:"<table>",tail:"</table>"},foot:"</body></html>"}}]));
//# sourceMappingURL=index.js.map