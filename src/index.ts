// ie浏览器支持使用activeXoBJECT
function isIE() {
  return window.ActiveXObject ? true : false
}
function JSON2SCV() {
  if (!isIE()) {
    aTagExport()
  }
  // 对activeXobject的处理
  activeXObjectExport()
}
// activeXobject
function activeXObjectExport() {
}
// a标签
function aTagExport() {
  const aElement = document.createElement('a');
  document.querySelector('body').appendChild(aElement);
  return 'a'
}
module.exports = {
  JSON2SCV
}  