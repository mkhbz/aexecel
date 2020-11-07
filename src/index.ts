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
    private fileName: String//文件名称
    constructor(fileName: String) {
      if (fileName) {
        this.fileName = fileName
      }
      else { fileName = '未命名文件' }
      // 检查系统有没有ActiveXObject
      // ActiveXObject ? this.hasActiveXObject = true : this.hasActiveXObject = false

    }
    //检查并获取用户的自定义样式
    private getCustomerStyle(customerObject: LinkStyle) {
      const customerStyleStr = Object.keys(customerObject).map((key) => `${key}:${customerObject[key]}`).join(',')
      return customerStyleStr === '{}' ? '' : customerStyleStr.slice(1, customerStyleStr.length - 1)
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
    // 使用ActiveXObject创建
    // TODO:暂时不了解机制，先不管
    // private createByAX(titleArray: Array<String>, jsonData: Array<any>) {
    //   let oXL: ActiveXObject
    //   // ie浏览器的activexobject需要调整安全性的，
    //   //Start Excel and get Application object.
    //   try {
    //     oXL = new ActiveXObject('Excel.Application')
    //   }
    //   catch (e) {
    //     alert('无法启动Excel!\n\n如果您确信您的电脑中已经安装了Excel，' + '那么请调整IE的安全级别。\n\n具体操作：\n\n' + '工具 → Internet选项 → 安全 → 自定义级别 → 对没有标记为安全的ActiveX进行初始化和脚本运行 → 启用')
    //     return false
    //   }

    // }
    /**
     * 
     * 将table转化为excel导出
     * 缺点：暂时不知道怎么多个sheet，数据量导出大的时候有问题
     * 优点：转化为table，比较方便,可以设置背景色等
     */
    public createByTable(titleArray: Array<String>, jsonData: Array<any>) {

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
      let computedStyle = {}//计算过后的样式对象
      let row = ''
      // 便利获取到样式以及元素的k-v，拼接起来
      // 横排
      jsonData.forEach(tr => {
        if (tr.style) {
          computedStyle = this.getCustomerStyle(tr.style)
        }
        row += `<tr style=' ${computedStyle} '>`
        // 竖排
        Object.keys(tr).forEach(td => {
          if (td === 'style') {
            computedStyle = this.getCustomerStyle(tr.style)
          }
          row += `<td>${td}</td>`

        })
        row += '</tr>'
        // 每一列都加上去
        tableRows.push(row)
      })
      console.log(tableRows)
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