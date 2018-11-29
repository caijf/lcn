# lcn

中华人民共和国行政区划，省市区数据

## 数据来源

当前数据

- [2018年10月中华人民共和国县以上行政区划代码](http://www.mca.gov.cn/article/sj/xzqh/2018/201804-12/20181011221630.html)

## 多种数据格式

模块  | 数据格式 | 描述
------------- | ------------- | -------------
`lcn` | Array<{code, name, children}> | 默认数据格式，省/市/区三级联动
`lcn/lcn_pc` | Array<{code, name, children}> | 默认数据格式，省/市二级联动
`lcn-form` | Array<{value, label, children}> | 表单数据格式，省/市/区三级联动，支持 `antd`、`element-ui`级联组件的格式
`lcn/lcn_pc-form` | Array<{code, name, children}> | 表单数据格式，省/市二级联动，支持 `antd`、`element-ui`级联组件的格式
`lcn/lcn-normalize` | Object({code:name}) | 规整化数据，无级联，对象字面量
`lcn/lcn-origin` | Array<{code, name}> | 元数据，无级联

## 使用

安装

```shell
npm install lcn --save
```

示例，其他格式使用方式一样

```javascript
import lcn from 'lcn'
import lcnForm from 'lcn/lcn-form';

console.log(lcn);
// [
//   {
//     code:'110000', name: '北京市', children: [{...}]
//   },
//   {
//     code:'120000', name: '天津市', children: [{...}]
//   },
// ]

console.log(lcnForm);
// [
//   {
//     value:'110000', label: '北京市', children: [{...}]
//   },
//   {
//     value:'120000', label: '天津市', children: [{...}]
//   },
// ]

```
