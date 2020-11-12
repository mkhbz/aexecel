/**
 * 
 * @author mk
 * @Wechat 13609724279
 * 
 * 多种方式导出execel文件，前端生成execel文件，本质来说是生成二进制流，代码以及注释比较方便，就不多说
 * 实例看ReadMe.md
 */

import { FileType } from './utils/constants'
export namespace AEXECEL {
  'use strict'
  // 样式表中的元素
  interface LinkStyle {
    backgroundColor: String,
    color: String
  }
  export class AExecel {
    private hasActiveXObject: boolean//可否使用ActiveXObject
    private startTime: Date//开始时间
    private endTime: Date//结束时间
    private fileName: string//文件名称
    constructor(fileName: string) {
      this.fileName = fileName || (+new Date()).toString()//默认时间戳为文件名
      // 检查系统有没有ActiveXObject
      // ActiveXObject ? this.hasActiveXObject = true : this.hasActiveXObject = false

    }
    //检查并获取用户的自定义样式
    private getCustomerStyle(customerObject: LinkStyle) {
      const customerStyleStr = Object.keys(customerObject).map((key) => `${key}:${customerObject[key]}`).join(',')
      return customerStyleStr === '{}' ? '' : customerStyleStr.slice(1, customerStyleStr.length - 1)
    }
    /**
     * @typedef a链接导出
     * @param fileName  文件名称
     * @param linkUrl   链接
     * @param fileExtension   文件后缀
     */
    private createLink(linkUrl: string, fileName?: String, fileExtension?: FileType) {
      fileExtension = fileExtension || FileType.xml//默认类型为xml
      let aTag = document.createElement('a')
      aTag.download = `${fileName || this.fileName}.${fileExtension}`
      document.body.appendChild(aTag)
      aTag.href = linkUrl
      aTag.click()
      document.body.removeChild(aTag)
    }
    /**
     * @typedef 以table的形式导出execel文件
     * @param titleArray  标题 Array  ['标题1', '标题2', '标题3', '标题4']
     * @param jsonData    内容体  Array  [{k1:v1,k2:v2}]
     */
    public createByTable(titleArray: Array<string>, jsonData: Array<any>) {

      const utf8Heading = '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">'
      // table的需要模板
      const template = {
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
      const tableRows = []//放数据的地方
      // let computedStyle = {}//计算过后的样式对象
      let row = ''
      // 需要把头的也遍历一边，后面需要拼接
      // row += `<tr style=' ${computedStyle} '>`
      row += '<tr>'
      // 竖排
      titleArray.forEach(td => {
        row += `<td>${td}</td>`
      })
      row += '</tr>'
      // 每一列都加上去
      tableRows.push(row)
      // 便利获取到样式以及元素的k-v，拼接起来
      // 横排
      jsonData.forEach(tr => {
        row = '<tr>'
        // 竖排
        Object.keys(tr).forEach(td => {
          row += `<td>${tr[td]}</td>`
        })
        row += '</tr>'
        // 每一列都加上去
        tableRows.push(row)
      })


      // 最后完整的字符串内容
      let fullTemplateStr = ''
      //拼接整个头部
      fullTemplateStr += template.head

      // 增加sheet的头部
      fullTemplateStr += template.sheet.head
      // 加上内容
      fullTemplateStr += 'sheet1'
      // 增加sheet的尾部
      fullTemplateStr += template.sheet.tail

      // 增加上中间的部分
      fullTemplateStr += template.mid
      fullTemplateStr += template.table.head
      // 加上正式内容
      tableRows.forEach((row) => {
        fullTemplateStr += row
      })
      fullTemplateStr += template.table.tail

      //拼接整个尾部
      fullTemplateStr += template.foot
      console.log('最后拼接的数据是:')
      console.log(fullTemplateStr)
      // 封装成为一个sheet
      let blob = new Blob([fullTemplateStr], { type: 'application/vnd.ms-excel' })
      //解决中文乱码问题
      blob = new Blob([String.fromCharCode(0xFEFF), blob], { type: blob.type })
      this.createLink(window.URL.createObjectURL(blob), this.fileName, FileType.xls)
      // 遍历数组，获取k-v，
    }
    /**
    以blob流的形式，组合成csv格式导出
     * 缺点：暂时不知道怎么多个sheet
     * 优点：文件比较大的时候没问题
     */
    public createLargerCsv(titleArray: Array<String>, jsonData: Array<any>) {
      let str: string = ''
      let blob: Blob
      this.startTime = new Date()
      if (this.hasActiveXObject) {
        // this.createByAX(titleArray, jsonData)
        return
      }
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
      this.createLink(window.URL.createObjectURL(blob), this.fileName, FileType.csv)
      this.endTime = new Date()
      // 返回开始，结束时间
      return {
        endTime: this.endTime,
        startTime: this.startTime
      }
    }

  }

}