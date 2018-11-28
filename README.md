# lcn

中华人民共和国行政区划，省市区数据

## 数据来源

当前数据

- [2018年10月中华人民共和国县以上行政区划代码](http://www.mca.gov.cn/article/sj/xzqh/2018/201804-12/20181011221630.html)

## 生成多种数据格式
- `lcn.js` 默认数据格式，含省市区级联

```javascript
import lcn from 'lcn'

console.log(lcn); 
// [{code:'110000', name: '北京市', children: [{...}]}]
```

- `lcn-form.js` 表单格式数据，含省市区级联

该格式支持 `antd` `element-ui` 级联组件

```javascript
import lcnForm from 'lcn/lcn-form'

console.log(lcnForm); 
// [{value:'110000', label: '北京市', children: [{...}]}]
```

- `lcn-normalize.js` 规整化数据，无级联，对象字面量

```javascript
import lcnNormalize from 'lcn/lcn-normalize'

console.log(lcnNormalize); 
// {'110000': '北京市','110101':'东城区', ...}
```

- `lcn-origin.js` 元数据，无级联

```javascript
import lcnOrigin from 'lcn/lcn-origin'

console.log(lcnOrigin); 
// [{code:'110000', name: '北京市'},{code:'110101', name: '东城区'}, ...]
```

## 使用

安装

```shell
npm install lcn --save
```

示例

```javascript
import lcn from 'lcn'

// dosomething

```