# lcn

[![npm][npm]][npm-url] ![GitHub](https://img.shields.io/github/license/caijf/lcn.svg)

中华人民共和国行政区划，省市区数据

## 数据来源

当前数据

- [2020 年 12 月中华人民共和国县以上行政区划代码](http://www.mca.gov.cn/article/sj/xzqh/2020/20201201.html)

## 多种数据格式

> 如果在客户端中使用，并且没有用到全部数据，建议保存对应数据到本地。比如只用到省市联动数据，将 `pc.json` 保存本地即可。

| 文件             | 数据格式                       | 描述                 |
| ---------------- | ------------------------------ | -------------------- |
| [pca.json]       | Array<{code, name, children?}> | 省/市/区三级联动数据 |
| [pc.json]        | Array<{code, name, children?}> | 省/市二级联动数据    |
| [data.json]      | Array<{code, name}>            | 全部数据             |
| [provinces.json] | Array<{code, name}>            | 省份数据             |
| [cities.json]    | Array<{code, name}>            | 市级数据             |
| [areas.json]     | Array<{code, name}>            | 区级数据             |

## 使用

### 安装

```bash
npm install lcn
```

or

```bash
yarn add lcn
```

### 示例

```typescript
import { data, getPCA, getPC, getProvinces, getCities, getAreas } from "lcn";

const pca = getPCA({ formatForm: true }); // 获取省市区三级联动表单格式数据
console.log(pca);
```

## 文档

- getPCA - 获取省/市/区三级联动数据
- getPC - 获取省/市二级联动数据
- data - 全部数据
- getProvinces - 获取全部省份数据
- getCities - 获取全部市级数据
- getAreas - 获取全部区级数据
- parseAreaCode - 解析地区码

### getPCA(options)

> - options &lt;object&gt; 配置项
> - options.inland &lt;boolean&gt; 仅包含内地数据。默认为 `false`
> - options.formatForm &lt;boolean&gt; 数据处理为表单格式，即 `{ value, label, children? }`。默认为 `false`

获取省/市/区三级联动数据。

`formatForm` 为 `true` 时，数据可直接用于 `antd` `element-ui` 的表单组件中。

```javascript
import { getPCA } from "lcn";

const data1 = getPCA();
console.log(data1);

[
  {
    code: "110000",
    name: "北京市",
    children: [
      // ...
    ],
  },
  // ...
  { code: "710000", name: "台湾省" },
  { code: "810000", name: "香港特别行政区" },
  { code: "820000", name: "澳门特别行政区" },
];

const data2 = getPCA({ inland: true, formatForm: true });
console.log(data2);

[
  {
    value: "110000",
    label: "北京市",
    children: [
      // ...
    ],
  },
  // ...
];
```

### getPC(options)

> - options &lt;object&gt; 配置项
> - options.inland &lt;boolean&gt; 仅包含内地数据。默认为 `false`
> - options.formatForm &lt;boolean&gt; 数据处理为表单格式，即 `{ value, label, children? }`。默认为 `false`

获取省/市二级联动数据。其余同 `getPCA` 方法。

### data

全部数据，无级联。

```javascript
[
  { code: "110000", name: "北京市" },
  { code: "110100", name: "北京市" },
  { code: "110101", name: "东城区" },
  { code: "110102", name: "西城区" },
  // ...
];
```

### getProvinces()

获取全部省份数据。

```javascript
[
  { code: "110000", name: "北京市" },
  { code: "120000", name: "天津市" },
  // ...
];
```

### getCities()

获取全部市级数据。

```javascript
[
  // ...
  { code: "130100", name: "石家庄市" },
  { code: "130200", name: "唐山市" },
  { code: "130300", name: "秦皇岛市" },
  // ...
];
```

### getAreas()

获取全部区级数据。

```javascript
[
  { code: "110101", name: "东城区" },
  { code: "110102", name: "西城区" },
  { code: "110105", name: "朝阳区" },
  // ...
];
```

### parseAreaCode(areaCode)

> - areaCode &lt;string&gt; 地区码

解析地区码，返回一个元祖 `[省,市,区]`

```javascript
parseAreaCode("410102"); // => [{ code: '410000', name: '河南省' }, { code: '410100', name: '郑州市' }, { code: '410102', name: '中原区' }];
parseAreaCode("410100"); // => [{ code: '410000', name: '河南省' }, { code: '410100', name: '郑州市' }, null];
parseAreaCode("410000"); // => [{ code: '410000', name: '河南省' }, null, null];
parseAreaCode("000000"); // => [null, null, null];
```

## 注意，以下数据修正

### 1. 直辖市补充`市级数据`

- 北京市(110000)
  - **北京市(110100)**
- 天津市(120000)
  - **天津市(120100)**
- 上海市(310000)
  - **上海市(310100)**
- 重庆市(500000)
  - **重庆市(500100)**
  - **县(500200)**

### 2. 部分省补充县级行政区划

- 海南省(460000)
  - **[省直辖县级行政区划](http://www.stats.gov.cn/tjsj/tjbz/tjyqhdmhcxhfdm/2021/46.html)(469000)**
- 新疆维吾尔自治区(650000)
  - **[自治区直辖县级行政区划](http://www.stats.gov.cn/tjsj/tjbz/tjyqhdmhcxhfdm/2021/65.html)(659000)**
- 河南省(410000)
  - **[省直辖县级行政区划](http://www.stats.gov.cn/tjsj/tjbz/tjyqhdmhcxhfdm/2021/41.html)(419000)**
- 湖北省(420000)
  - **[省直辖县级行政区划](http://www.stats.gov.cn/tjsj/tjbz/tjyqhdmhcxhfdm/2021/42.html)(429000)**

### 3. 海南省三沙市补充区级数据

> 数据源自[国家统计局 - 统计用区划和城乡划分代码](http://www.stats.gov.cn/tjsj/tjbz/tjyqhdmhcxhfdm/2020/46/4603.html)

- 海南省(460000)
  - 三沙市(460300)
    - **西沙群岛(460321)**
    - **南沙群岛(460322)**
    - **中沙群岛的岛礁及其海域(460323)**

### 4. 以下几个[特殊地级市]，属于“不设区的市”：

- 广东省东莞市(441900)
- 广东省中山市(442000)
- 甘肃省嘉峪关市(620200)
- 海南省儋州市(460400)

## 参考

- [民政部 - 行政区划代码]
- [国家统计局 - 统计用区划和城乡划分代码]
- [特殊地级市]

[民政部 - 行政区划代码]: http://www.mca.gov.cn/article/sj/xzqh/2020/
[国家统计局 - 统计用区划和城乡划分代码]: http://www.stats.gov.cn/tjsj/tjbz/tjyqhdmhcxhfdm/
[特殊地级市]: https://baike.baidu.com/item/%E5%9C%B0%E7%BA%A7%E5%B8%82/2089621?fr=aladdin#4_1
[pca.json]: https://github.com/caijf/lcn/tree/master/data/pca.json
[pc.json]: https://github.com/caijf/lcn/tree/master/data/pc.json
[data.json]: https://github.com/caijf/lcn/tree/master/data/data.json
[provinces.json]: https://github.com/caijf/lcn/tree/master/data/provinces.json
[cities.json]: https://github.com/caijf/lcn/tree/master/data/cities.json
[areas.json]: https://github.com/caijf/lcn/tree/master/data/areas.json
[npm]: https://img.shields.io/npm/v/lcn.svg
[npm-url]: https://npmjs.com/package/lcn
