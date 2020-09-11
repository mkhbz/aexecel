## 2020-09-11 
   - 添加   完成scv导出单个excel

### 使用

```
npm install aexecel
```

```
import { AEXECEL } from { aexece }
var myExecel = new AEXECEL.AExecel('fileName');
const title = ['标题1', '标题2', '标题3', '标题4']
let data = new Array(1000000);
data.fill({ 'name1': 'value1', 'name2': 'value2', 'name3': 'value3', 'name4': 'value4' })
myExecel.createLargerCsv(title, data)

```
