# lcn

中华人民共和国行政区划，省市区数据

## 数据来源

当前数据

- [2020年8月中华人民共和国县以上行政区划代码](http://www.mca.gov.cn/article/sj/xzqh/2018/201804-12/20181011221630.html)

## 多种数据格式

模块  | 数据格式 | 描述
------------- | ------------- | -------------
`lcn` | array<{code, name, children}> | 默认数据格式，省/市/区三级联动
`lcn/lcn-inland` | array<{code, name, children}> | 默认数据格式，省/市/区三级联动，不包含港澳台。
`lcn/lcn-form` | array<{value, label, children}> | 表单数据格式，省/市/区三级联动，可直接应用于 `antd` `element-ui` 级联组件
`lcn/lcn-form-inland` | array<{value, label, children}> | 表单数据格式，省/市/区三级联动，可直接应用于 `antd` `element-ui` 级联组件。不包含港澳台。
`lcn/data` | array<{code, name}> | 全部数据，无级联。
`lcn/province` | array<{code, name}> | 省份数据
`lcn/city` | array<{code, name}> | 市级数据
`lcn/area` | array<{code, name}> | 区级数据

## 使用

安装

```shell
npm install lcn --save
```

### lcn

默认格式的级联省市区数据。

```javascript
// import lcn from 'lcn';

[
  {
    "code":"110000",
    "name":"北京市",
    "children":[{
      "code":"110100",
      "name":"北京市",
      "children":[
        {"code":"110101","name":"东城区"},
        {"code":"110102","name":"西城区"},
        // ...
      ]
    }],
  },
  // ...
]
```

### lcn-form

表单格式的省市区数据。

```javascript
// import lcn from 'lcn/lcn-form';
[
  {
    "value":"110000",
    "label":"北京市",
    "children":[{
      "value":"110100",
      "label":"北京市",
      "children":[
        {"value":"110101","label":"东城区"},
        {"value":"110102","label":"西城区"},
        // ...
      ]
    }],
  },
  // ...
]
```

### data

全部数据，无级联。

```javascript
// import lcnData from 'lcn/data';

[
  {"code":"110000","name":"北京市"},
  {"code":"110101","name":"东城区"},
  {"code":"110102","name":"西城区"},
  // ...
]
```

### province

省份数据。

```javascript
// import lcnData from 'lcn/province';

[
  {"code":"110000","name":"北京市"},
  {"code":"120000","name":"天津市"},
  // ...
]
```

### city

市级数据。

```javascript
// import lcnData from 'lcn/city';

[
  {"code":"130100","name":"石家庄市"},
  {"code":"130200","name":"唐山市"},
  {"code":"130300","name":"秦皇岛市"},
  // ...
]
```

### area

区级数据。

```javascript
// import lcnData from 'lcn/area';

[
  {"code":"110101","name":"东城区"},
  {"code":"110102","name":"西城区"},
  {"code":"110105","name":"朝阳区"},
  // ...
]
```

## 注意

### 1. 全部数据补充海南省三沙市区级数据，数据源自[国家统计局 - 统计用区划和城乡划分代码](http://www.stats.gov.cn/tjsj/tjbz/tjyqhdmhcxhfdm/2019/46/4603.html)

  - 西沙群岛(460321)
  - 南沙群岛(460322)
  - 中沙群岛的岛礁及其海域(460323)

### 2. 级联数据 `lcn`、`lcn-form` 中

  - `直辖市` 补充市级数据
    - 北京市
    - 天津市
    - 上海市
    - 重庆市
  - 海南省补充市级数据
    - [省直辖县级行政区划](http://www.stats.gov.cn/tjsj/tjbz/tjyqhdmhcxhfdm/2019/46.html)
  - 新疆维吾尔族自治区补充市级数据
    - [自治区直辖县级行政区划](http://www.stats.gov.cn/tjsj/tjbz/tjyqhdmhcxhfdm/2019/65.html)

### 3. 以下几个[特殊地级市](https://baike.baidu.com/item/%E5%9C%B0%E7%BA%A7%E5%B8%82/2089621?fr=aladdin#4_1)，属于“不设区的市”：

- 广东省东莞市(441900)
- 广东省中山市(442000)
- 甘肃省嘉峪关市(620200)
- 海南省儋州市(460400)

## 参考

- [民政部 - 行政区划代码](http://www.mca.gov.cn/article/sj/xzqh/2020/)
- [国家统计局 - 统计用区划和城乡划分代码](http://www.stats.gov.cn/tjsj/tjbz/tjyqhdmhcxhfdm/)