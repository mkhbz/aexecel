
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