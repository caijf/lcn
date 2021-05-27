const path = require('path');
const { writeToFile, getProvinceCode, getCityCode } = require('./util');
const createData = require('./createData');

const root = path.join(__dirname, '../data/');

// 省市区级联数据
const PROVINCE_CITY_AREA = path.join(root, 'pca.json');
// 省市级联数据
const PROVINCE_CITY = path.join(root, 'pc.json');

// 过滤区级数据
function filterArea(data) {
  return data.map(item => {
    if (!item.children) {
      return item;
    }
    const newItem = {
      ...item
    }
    newItem.children = newItem.children.map(subItem => {
      delete subItem.children;
      return subItem;
    });
    return newItem;
  });
}

createData().then(() => {
  const originData = {
    data: require('../data/data.json'),
    province: require('../data/provinces.json'),
    city: require('../data/cities.json'),
    area: require('../data/areas.json')
  }

  // 级联补充市级数据，联动区级
  const cities = originData.city.map(item => {
    const cityCode = getCityCode(item.code);
    const newItem = {
      ...item
    };

    originData.area.forEach(areaItem => {
      if (getCityCode(areaItem.code) === cityCode) {
        if (!newItem.children) {
          newItem.children = [areaItem];
        } else {
          newItem.children.push(areaItem);
        }
      }
    });
    return newItem;
  });

  const provinces = originData.province.map(item => {
    const provinceCode = getProvinceCode(item.code);
    const newItem = {
      ...item
    };

    cities.forEach(cityItem => {
      if (getProvinceCode(cityItem.code) === provinceCode) {
        if (!newItem.children) {
          newItem.children = [cityItem];
        } else {
          newItem.children.push(cityItem);
        }
      }
    });
    return newItem;
  });

  // 省市区级联数据
  writeToFile(PROVINCE_CITY_AREA, JSON.stringify(provinces));

  const provincesWithCity = filterArea(provinces);

  // 省市级联数据
  writeToFile(PROVINCE_CITY, JSON.stringify(provincesWithCity));
});