
// 枚举类
export enum FileType {
  csv = 'csv',
  xml = 'xml',
  xls = 'xls'
}

// 接口
export interface Ictx {
  worksheet: string,
  table: string,
  sheetName: string
}

export interface IstyleList {
  [name: string]: Istyle
}

// 单个样式的实例
export interface Istyle {
  'text-align': string,
  'background-color': string,
  // ['background-color':string]:string
  width?: string,//宽度 100(px)
  height?: string,//高度 100(px)
  color?: string//颜色 #00ff00
  border: string//border 1px solid #ccc
}
//静态变量
// table转化需要的变量
const utf8Heading = '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">'
// table的需要模板
export const template = {
  head: '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">' + utf8Heading + '<head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets>',
  sheet: {
    head: '<x:ExcelWorksheet><x:Name>',
    tail: '</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>'
  },
  mid: '</x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body>',
  table: {
    head: '<table>',
    tail: '</table>'
  },
  foot: '</body></html>'
}