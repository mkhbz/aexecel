import { FileType } from './utils/constants'
export namespace AEXECEL {
  'use strict'
  export class AExecel {
    private startTime: Date//开始时间
    private endTime: Date//结束时间
    private fileName: String//文件名称
    constructor(fileName: String) {
      if (fileName) {
        this.fileName = fileName
      }
      else { fileName = '未命名文件' }
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

    // 以blob流的形式，组合成csv格式导出
    public createLargerCsv(titleArray: Array<String>, jsonData: Array<any>) {
      let str: string = ''
      let blob: Blob
      this.startTime = new Date()
      
      // 使用string是因为如果是0的话会不显示，
      titleArray.forEach(title => {
        str += `${title.toString()},`
      })
      str += '\n'
      
      jsonData.forEach(data => {
        Object.values(data).forEach(o => {
          str += `${o.toString()},`
        })
        str += '\n'
      })
      
      // 添加编码格式
      blob = new Blob([str], { type: 'text/plain;charset=utf-8' })

      //解决中文乱码问题
      blob = new Blob([String.fromCharCode(0xFEFF), blob], { type: blob.type })
      this.createLink(this.fileName, window.URL.createObjectURL(blob), FileType.csv)
      this.endTime = new Date()
      // 返回开始，结束时间
      return {
        endTime: this.endTime,
        startTime: this.startTime
      }
    }

  }

}