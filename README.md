# lcn

[![npm][npm]][npm-url] ![GitHub](https://img.shields.io/github/license/caijf/lcn.svg)

中华人民共和国行政区划，省市区数据。

支持 `umd` `es` `cjs` 等模块格式。

## 各版本对应的数据源

| lcn 版本 | 数据源 |
| --- | --- |
| `v5.x` | [2022 年中华人民共和国行政区划代码](https://www.mca.gov.cn/mzsj/xzqh/2022/202201xzqh.html) |
| `v1.x ~ v4.x` | [2020 年 12 月中华人民共和国县以上行政区划代码](https://www.mca.gov.cn/mzsj/xzqh/2020/20201201.html) |

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
import { data, getPCA, getPC, parseAreaCode } from 'lcn';

// 获取内地省市区三级联动表单格式数据
const pca = getPCA({
  inland: true,
  fieldNames: { code: 'value', name: 'label' },
});
console.log(pca);
```

## 文档

- 主要数据和方法

  - data - 全部省市区数据
  - getPCA - 获取省/市/区三级联动数据
  - getPC - 获取省/市二级联动数据
  - parseAreaCode - 解析地区码

- 其他工具方法

  - isProvinceCode - 是否为省级码
  - isCityCode - 是否为市级码
  - isAreaCode - 是否为区级码
  - isInland - 是否为大陆内地区码
  - getProvinceCode - 获取 2 位省级编码
  - getCityCode - 获取 4 位市级编码
  - isCrownCountryCityCode - 是否为直辖市或直辖县的市级编码

### data

全部省市区数据。

```typescript
[
  { code: '110000', name: '北京市' },
  { code: '110100', name: '北京市' },
  { code: '110101', name: '东城区' },
  { code: '110102', name: '西城区' },
  // ...
];
```

### getPCA(options)

> - options &lt;object&gt; 配置项
> - options.inland &lt;boolean&gt; 仅包含内地数据。默认为 `false`
> - options.fieldNames &lt;{ code?: string; name?: string; children?: string; }&gt; 自定义字段名
> - options.dataSource &lt;{ code: string; name: string; }[]&gt; 自定义数据源，默认 data
> - options.emptyChildrenValue &lt;'array' | 'null' | 'none'&gt; 子级为空时的值，默认 'array' 。array 表示为[]，null 表示为 null，none 表示删除该子级。

获取省/市/区三级联动数据。

通过自定义字段名，可将数据成直接用于 `antd` `element-ui` 的表单组件中。

```typescript
import { getPCA } from 'lcn';

const data1 = getPCA();
console.log(data1);

[
  {
    code: '110000',
    name: '北京市',
    children: [
      // ...
    ],
  },
  // ...
];

const data2 = getPCA({
  inland: true,
  fieldNames: { code: 'value', name: 'label' },
});
console.log(data2);

[
  {
    value: '110000',
    label: '北京市',
    children: [
      // ...
    ],
  },
  // ...
];
```

### getPC(options)

获取省/市二级联动数据。参数及用法同 `getPCA` 方法。

### parseAreaCode(areaCode, options?)

> - areaCode &lt;string&gt; 地区码
> - options &lt;object&gt; 配置项
> - options.dataSource &lt;{ code: string; name: string; }[]&gt; 自定义数据源，默认 data
> - options.ignoreCrownCountryCityName &lt;boolean&gt; 是否忽略直辖市或直辖县的市级名称，默认 false

解析地区码，返回一个元组 `[省,市,区]`

```typescript
parseAreaCode('410102'); // => [{ code: '410000', name: '河南省' }, { code: '410100', name: '郑州市' }, { code: '410102', name: '中原区' }];
parseAreaCode('410100'); // => [{ code: '410000', name: '河南省' }, { code: '410100', name: '郑州市' }, null];
parseAreaCode('410000'); // => [{ code: '410000', name: '河南省' }, null, null];
parseAreaCode('000000'); // => [null, null, null];
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
  - **[省直辖县级行政区划](http://www.stats.gov.cn/sj/tjbz/tjyqhdmhcxhfdm/2022/46.html)(469000)**
- 新疆维吾尔自治区(650000)
  - **[自治区直辖县级行政区划](http://www.stats.gov.cn/sj/tjbz/tjyqhdmhcxhfdm/2022/65.html)(659000)**
- 河南省(410000)
  - **[省直辖县级行政区划](http://www.stats.gov.cn/sj/tjbz/tjyqhdmhcxhfdm/2022/41.html)(419000)**
- 湖北省(420000)
  - **[省直辖县级行政区划](http://www.stats.gov.cn/sj/tjbz/tjyqhdmhcxhfdm/2022/42.html)(429000)**

### 3. 海南省三沙市补充区级数据

> 数据源自[国家统计局 - 统计用区划和城乡划分代码](http://www.stats.gov.cn/sj/tjbz/tjyqhdmhcxhfdm/2022/46/4603.html)

- 海南省(460000)
  - 三沙市(460300)
    - **西沙群岛(460321)**
    - **南沙群岛(460322)**
    - **中沙群岛的岛礁及其海域(460323)**

### 4. 以下几个[特殊地级市]，属于“不设区的市”

- 广东省东莞市(441900)
- 广东省中山市(442000)
- 甘肃省嘉峪关市(620200)
- 海南省儋州市(460400)

## 更多数据格式

> 如果在客户端中使用，并且没有用到全部数据，建议保存对应数据到本地。比如只用到省市联动数据，将 `pc.json` 保存本地即可。

| 文件             | 数据格式                       | 描述                 |
| ---------------- | ------------------------------ | -------------------- |
| [pca.json]       | Array<{code, name, children?}> | 省/市/区三级联动数据 |
| [pc.json]        | Array<{code, name, children?}> | 省/市二级联动数据    |
| [data.json]      | Array<{code, name}>            | 全部数据             |
| [provinces.json] | Array<{code, name}>            | 省份数据             |
| [cities.json]    | Array<{code, name}>            | 市级数据             |
| [areas.json]     | Array<{code, name}>            | 区级数据             |

## 参考

- [民政部 - 行政区划代码]
- [国家统计局 - 统计用区划和城乡划分代码]
- [特殊地级市]

[民政部 - 行政区划代码]: https://www.mca.gov.cn/n156/n2679/index.html
[国家统计局 - 统计用区划和城乡划分代码]: http://www.stats.gov.cn/sj/tjbz/tjyqhdmhcxhfdm/2022/index.html
[特殊地级市]: https://baike.baidu.com/item/%E5%9C%B0%E7%BA%A7%E5%B8%82/2089621?fr=aladdin#4_1
[pca.json]: https://github.com/caijf/lcn/tree/master/data/pca.json
[pc.json]: https://github.com/caijf/lcn/tree/master/data/pc.json
[data.json]: https://github.com/caijf/lcn/tree/master/data/data.json
[provinces.json]: https://github.com/caijf/lcn/tree/master/data/provinces.json
[cities.json]: https://github.com/caijf/lcn/tree/master/data/cities.json
[areas.json]: https://github.com/caijf/lcn/tree/master/data/areas.json
[npm]: https://img.shields.io/npm/v/lcn.svg
[npm-url]: https://npmjs.com/package/lcn
