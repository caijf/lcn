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

// 处理成map数据
async function processMapData(data) {
  const mapData = data.map(item => ([item.code, item.name]));
  return writeToFile(DATA_MAP_FILE, JSON.stringify(mapData));
}

// 处理省份数据
async function processProvince(data) {
  const provinces = data.filter(item => isProvinceCode(item.code));
  return writeToFile(PROVINCE_FILE, JSON.stringify(provinces));
}

// 处理市级数据
async function processCity(data) {
  const cities = data.filter(item => isCityCode(item.code));
  return writeToFile(CITY_FILE, JSON.stringify(cities));
}

// 处理区级数据
async function processArea(data) {
  const area = data.filter(item => !isProvinceCode(item.code) && !isCityCode(item.code));
  return writeToFile(AREA_FILE, JSON.stringify(area));
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
          await processMapData(data);
          await processProvince(data);
          await processCity(data);
          await processArea(data);

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