import { FileType } from './utils/constants'
export namespace AEXECEL {
  'use strict'

  export class AExecel {
    private fileName: String//文件名称
    constructor(fileName: String) {
      if (fileName) {
        this.fileName = fileName
      }
      else { fileName = '测试文件' }
    }

    // 创建一条a标签的链接
    private createLink(fileName: String, linkUrl: string, fileExtension: FileType) {
      let aTag = document.createElement('a')
      aTag.download = `${fileName}.${fileExtension}`
      document.body.appendChild(aTag)
      aTag.href = linkUrl
      aTag.click()
      document.body.removeChild(aTag)
    }

    // CSV格式导出
    public createCSV(jsonData: Array<any>) {
      let formatData = ''
      for (let i = 0; i < jsonData.length; i++) {
        for (let item in jsonData[i]) {

          //增加\t为了不让表格显示科学计数法或者其他格式
          formatData += `${jsonData[i][item] + '\t,'}`
        }
        formatData += '\n'
      }
      const uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(formatData)
      this.createLink(this.fileName, uri, FileType.csv)
    }
    // 以blob流的形式，组合成csv格式导出
    public createLargerCsv(jsonData: Array<any>) {
      let str: string
      let blob: Blob
      jsonData.forEach(data => {
        Object.values(data).forEach(o => {
          str += o
        })
        str += '\n'
      })
      blob = new Blob([str], { type: 'text/plain;charset=utf-8' })
      //解决中文乱码问题
      blob = new Blob([String.fromCharCode(0xFEFF), blob], { type: blob.type })
      this.createLink(this.fileName, window.URL.createObjectURL(blob), FileType.csv)
    }
    // xml格式导出
    public createXml() {
      var result = ''
      result = `<?xml version="1.0"?>
    <?mso-application progid="Excel.Sheet"?>
    <Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
        xmlns:o="urn:schemas-microsoft-com:office:office"
        xmlns:x="urn:schemas-microsoft-com:office:excel"
        xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
        xmlns:html="http://www.w3.org/TR/REC-html40">
      < /Workbook>`

      this.createLink(this.fileName, result, FileType.xml)

    }

  }


}