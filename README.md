# lcn

中华人民共和国行政区划，省市区数据

## 数据来源

当前数据

- [2018年10月中华人民共和国县以上行政区划代码](http://www.mca.gov.cn/article/sj/xzqh/2018/201804-12/20181011221630.html)

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

## 多种数据格式
- `lcn` 默认数据格式，省/市/区三级联动

```javascript
import lcn from 'lcn'

console.log(lcn);
// [
// 		{
//			code:'110000', name: '北京市', children: [{...}]
// 		},
// 		{
//			code:'120000', name: '天津市', children: [{...}]
// 		},
// ]
```
- `lcn/lcn_pc` 默认数据格式，省/市二级联动

```javascript
import lcnpc from 'lcn/lcn_pc'

console.log(lcnpc);
// [
// 		{
//			code:'110000', name: '北京市', children: [{...}]
// 		},
// 		{
//			code:'120000', name: '天津市', children: [{...}]
// 		},
// ]
```

- `lcn/lcn-form` 表单格式数据，省/市/区三级联动

该格式支持 `antd` `element-ui` 级联组件

```javascript
import lcnForm from 'lcn/lcn-form'

console.log(lcnForm);
// [
//  	{
//			value:'110000', label: '北京市', children: [{...}]
//		},
//  	{
// 			value:'120000', label: '天津市', children: [{...}]
//		},
// ]
```

- `lcn/lcn_pc-form` 表单格式数据，省/市二级联动

该格式支持 `antd` `element-ui` 级联组件

```javascript
import lcnpcForm from 'lcn/lcn_pc-form'

console.log(lcnpcForm);
// [
//  	{
//			value:'110000', label: '北京市', children: [{...}]
//		},
//  	{
// 			value:'120000', label: '天津市', children: [{...}]
//		},
// ]
```

- `lcn/lcn-normalize` 规整化数据，无级联，对象字面量

```javascript
import lcnNormalize from 'lcn/lcn-normalize'

console.log(lcnNormalize); 
// {
//		'110000': '北京市',
// 		'110101':'东城区',
// 		...
// 		'120000': '天津市',
// 		...
// }
```

- `lcn/lcn-origin` 元数据，无级联

```javascript
import lcnOrigin from 'lcn/lcn-origin'

console.log(lcnOrigin); 
// [
// 		{
// 			code:'110000', name: '北京市'
// 		},
// 		{
// 			code:'110101', name: '东城区'
// 		},
// 		...
// 		{
//			code: '120000', name: '天津市'
//		},
// 		...
// ]
```