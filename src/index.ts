console.log('开始')
// ie浏览器支持使用activeXoBJECT
function isIE(): Boolean {
  return window.ActiveXObject ? true : false
}
// 导出方法
export default function JSON2SCV() {
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
  const aElement: HTMLAnchorElement = document.createElement("a");
  document.querySelector('body').appendChild(aElement);
}