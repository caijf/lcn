// ref: https://www.mca.gov.cn/article/sj/xzqh/2021/20211201.html
// 2021年中华人民共和国县以上行政区划代码变更情况
const changed = {
  // 撤销
  remove: [
    {
      code: '610322',
      name: '凤翔县'
    },
    {
      code: '654223',
      name: '沙湾县'
    },
    {
      code: '513425',
      name: '会理县'
    },
    {
      code: '532331',
      name: '禄丰县'
    },
    {
      code: '450127',
      name: '横县'
    },
    {
      code: '350681',
      name: '龙海市'
    },
    {
      code: '350625',
      name: '长泰县'
    },
    {
      code: '350402',
      name: '梅列区'
    },
    {
      code: '350403',
      name: '三元区'
    },
    {
      code: '350427',
      name: '沙县'
    },
    {
      code: '610928',
      name: '旬阳县'
    },
    {
      code: '431121',
      name: '祁阳县'
    },
    {
      code: '520522',
      name: '黔西县'
    },
    {
      code: '410381',
      name: '偃师市'
    },
    {
      code: '410322',
      name: '孟津县'
    },
    {
      code: '410306',
      name: '吉利区'
    },
    // {
    //   code: '330102',
    //   name: '上城区'
    // },
    {
      code: '330104',
      name: '江干区'
    },
    {
      code: '330103',
      name: '下城区'
    },
    // {
    //   code: '330105',
    //   name: '拱墅区'
    // },
    // {
    //   code: '330110',
    //   name: '余杭区'
    // },
  ],

  // 设立
  add: [
    {
      code: '610305',
      name: '凤翔区'
    },
    {
      code: '654203',
      name: '沙湾市'
    },
    {
      code: '513402',
      name: '会理市'
    },
    {
      code: '532302',
      name: '禄丰市'
    },
    {
      code: '450181',
      name: '横州市'
    },
    {
      code: '659011',
      name: '新星市'
    },
    {
      code: '350604',
      name: '龙海区'
    },
    {
      code: '350605',
      name: '长泰区'
    },
    {
      code: '350404',
      name: '三元区'
    },
    {
      code: '350405',
      name: '沙县区'
    },
    {
      code: '610981',
      name: '旬阳市'
    },
    {
      code: '431181',
      name: '祁阳市'
    },
    {
      code: '520581',
      name: '黔西市'
    },
    {
      code: '410307',
      name: '偃师区'
    },
    {
      code: '410308',
      name: '孟津区'
    },
    // {
    //   code: '330102',
    //   name: '上城区'
    // },
    // {
    //   code: '330105',
    //   name: '拱墅区'
    // },
    // {
    //   code: '330110',
    //   name: '余杭区'
    // },
    {
      code: '330113',
      name: '临平区'
    },
    {
      code: '330114',
      name: '钱塘区'
    },
  ]
}

/**
 * 2021 年数据补丁
 * @param {{code:string;name: string;}[]} data 2020省市区数据
 */
function patch2021(data) {
  return data.filter(item => !changed.remove.find(removeItem => removeItem.code === item.code)).concat(changed.add);
}

module.exports = patch2021;
