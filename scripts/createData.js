const http = require('http');
const path = require('path');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const { checkDirExist, writeToFile, isProvinceCode, isCityCode } = require('./util');
const extendData = require('./extend');

// 2020年12月中华人民共和国县以上行政区划代码
const url = 'http://www.mca.gov.cn/article/sj/xzqh/2020/20201201.html';

const root = path.join(__dirname, '../data/');

// 数据文件
const DATA_FILE = path.join(root, 'data.json');
// map数据文件
const DATA_MAP_FILE = path.join(root, 'data-map.json');
// 省份数据
const PROVINCE_FILE = path.join(root, 'provinces.json');
// 市级数据
const CITY_FILE = path.join(root, 'cities.json');
// 区级数据
const AREA_FILE = path.join(root, 'areas.json');

/**
 * 处理标准数据 -> code/name
 * @param  {string} html dom string
 * @returns
 * @example
 *      [{
 *          "code":"110000"
 *          "name":"北京市"
 *      }]
 */
function processHtml(html) {
  const $ = cheerio.load(html);
  const $tr = $('tr');

  const ret = [];

  $tr.each(function () {
    const $this = $(this);
    const code = $this.find('td').eq(1).text();
    const name = $this.find('td').eq(2).text();

    if (code && name && !isNaN(code)) {
      ret.push({
        code: code.trim(),
        name: name.trim()
      });
    }
  });

  return ret;
}

/**
 * 处理map/省份/市级/区级数据
 * @param {{code:string;name:string;}[]} data 省市区数据数组
 * @returns {Promise<any>}
 */
async function processDataAndWirteToFile(data) {
  const dataMap = [];
  const provinces = [];
  const cities = [];
  const area = [];

  data.forEach(item => {
    dataMap.push([item.code, item.name]);
    if (isProvinceCode(item.code)) {
      provinces.push(item);
    } else if (isCityCode(item.code)) {
      cities.push(item);
    } else {
      area.push(item);
    }
  });

  const wp_all = writeToFile(DATA_MAP_FILE, JSON.stringify(dataMap));
  const wp_provinces = writeToFile(PROVINCE_FILE, JSON.stringify(provinces));
  const wp_cities = writeToFile(CITY_FILE, JSON.stringify(cities));
  const wp_area = writeToFile(AREA_FILE, JSON.stringify(area));
  return Promise.all([wp_all, wp_provinces, wp_cities, wp_area]);
}

// 创建数据
function createData() {
  return new Promise((resolve, reject) => {
    http.get(url, function (res) {
      let chunks = [];
      let size = 0;

      res.on('data', function (data) {
        chunks.push(data);
        size += data.length;
      });
      res.on('end', async function () {
        // 防止中文乱码
        let buf = Buffer.concat(chunks, size);
        let str = iconv.decode(buf, 'utf8');

        // 输出标准数据文件
        const data = [...processHtml(str), ...extendData.cities, ...extendData.areas].sort((a, b) => a.code - b.code);

        checkDirExist(root);

        try {
          await writeToFile(DATA_FILE, JSON.stringify(data));
          await processDataAndWirteToFile(data);

          resolve();
        } catch (err) {
          reject(err);
        }
      })
    }).on('error', function (err) {
      console.log('获取数据失败');
      reject(err);
    });
  });
}

module.exports = createData;