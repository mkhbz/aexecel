export namespace AEXECEL {
  'use strict'
   export class AExecel {
    private fileExtension: string//文件扩展名
    private fileName: String//文件名称
    constructor(fileName: String) {
      if (fileName) {
        this.fileName = fileName
      }
      else { fileName = '测试文件' }
      this.fileExtension = 'xml'
    }
    // 创建一个excel。并且导出。
    public CreateExcel() {
      let result = ''//返回的载体
      result = `<?xml version="1.0"?>
    <?mso-application progid="Excel.Sheet"?>
    <Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
        xmlns:o="urn:schemas-microsoft-com:office:office"
        xmlns:x="urn:schemas-microsoft-com:office:excel"
        xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
        xmlns:html="http://www.w3.org/TR/REC-html40">
      < /Workbook>`
      var a = document.createElement('a')
      a.href = result
      a.download = `${this.fileName}.${this.fileExtension}`
      document.body.appendChild(a)
      a.click()
    }
    // CSV格式导出
    // public CreateCSV(data:Array<String>){
    // const formatData=
    // const uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str)
    // }
   }
}