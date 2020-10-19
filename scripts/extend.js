// 级联，市级数据补充
const cityExtend = [
  // 直辖市
  {
    code: '110100',
    name: '北京市'
  },
  {
    code: '310100',
    name: '上海市'
  },
  {
    code: '500100',
    name: '重庆市'
  },
  {
    code: '120100',
    name: '天津市'
  },

  // 直辖县级行政区划
  {
    code: '469000',
    name: '省直辖县级行政区划'
  },
  {
    code: '659000',
    name: '自治区直辖县级行政区划'
  }
];

// 源数据缺失
const dataExtend = [
  // 海南省三沙市县级行政区
  {
    code: '460321',
    name: '西沙群岛'
  },
  {
    code: '460322',
    name: '南沙群岛'
  },
  {
    code: '460323',
    name: '中沙群岛的岛礁及其海域'
  }
];

module.exports = {
  dataExtend,
  cityExtend
};