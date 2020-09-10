export namespace AEXECEL {
  'use strict'

  enum fileType {
    'csv', 'xml'
  }

  export class AExecel {
    private fileName: String//文件名称
    constructor(fileName: String) {
      if (fileName) {
        this.fileName = fileName
      }
      else { fileName = '测试文件' }
    }

    // 创建一条a标签的链接
    private createLink(fileName: String, linkUrl: string, fileExtension: fileType) {
      let aTag = document.createElement('a')
      aTag.download = `${fileName}.${fileExtension}`
      document.body.appendChild(aTag)
      aTag.href = linkUrl
      aTag.click()
      document.body.removeChild(aTag);
    }

    // CSV格式导出
    public CreateCSV(jsonData: Array<any>) {
      let formatData = ''
      for (let i = 0; i < jsonData.length; i++) {
        for (let item in jsonData[i]) {

          //增加\t为了不让表格显示科学计数法或者其他格式
          //此处用`取代'，具体用法搜索模板字符串 ES6特性
          formatData += `${jsonData[i][item] + '\t,'}`
        }
        formatData += '\n'
      }
      const uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(formatData)
      this.createLink(this.fileName, uri, fileType.csv)
    }

    // 创建一个excel。并且导出。
    public CreateXml(jsonData: Array<any>) {
      var result = ''
      result = `<?xml version="1.0"?>
    <?mso-application progid="Excel.Sheet"?>
    <Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
        xmlns:o="urn:schemas-microsoft-com:office:office"
        xmlns:x="urn:schemas-microsoft-com:office:excel"
        xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
        xmlns:html="http://www.w3.org/TR/REC-html40">
      < /Workbook>`

      this.createLink(this.fileName, result, fileType.xml)

    }

  }


}