## 2020-09-11 
   - 添加   完成scv导出单个excel

## 2020-11-11
   - 添加   完成table格式导出execel

## 2020-11-11
   - 添加   完成table格式导出execel样式的的更改

### 使用

```
npm install aexecel
```

```
//引入文件
import { AEXECEL } from { aexece }

//初始化，传入的filename为文件的名字
var myExecel = new AEXECEL.AExecel('fileName');

//创建数据
const title = ['标题1', '标题2', '标题3', '标题4']
let data = new Array(1000000);
data.fill({ 'name1': 'value1', 'name2': 'value2', 'name3': 'value3', 'name4': 'value4' })

//第一种方式，导出一个大数据量的数据
myExecel.createLargerCsv(title, data)


//第二个方式，导出一个可以编辑表格的
const title = ['标题1', '标题2', '标题3', '标题4']
let data = new Array(10);
data.fill({ 'name1': 'value1', 'name2': 'value2', 'name3': 'value3', 'name4': 'value4' })
let styleList = {
    name1: {
        'background-color': '#ff00ff',
        color: '#00ff00',
        border: '1px solid #000',
        'text-align': 'center',
        width: '300px',
        height: '400px'
    }
}
myExecel.createByTable(title, data, styleList)

```
