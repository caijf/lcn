import data from "./data";
import {
  isAreaCode,
  isCityCode,
  isProvinceCode,
  getProvinceCode,
  filterInland,
  getCityCode,
  CascadeData,
  CascadeDataForm,
} from "./util";

export type { CascadeData, CascadeDataForm };

export interface CascaderOption {
  inland?: boolean;
  formatForm?: boolean;
}

// 缓存数据
let __provinces: typeof data; // 省级数据
let __cities: typeof data; // 市级数据
let __areas: typeof data; // 区级数据
let __pca: CascadeData[]; // 省市区级联数据
let __pc: CascadeData[]; // 省市级联数据

// 获取省级数据
function getProvinces() {
  if (!__provinces) {
    __provinces = data.filter((item) => isProvinceCode(item.code));
  }
  return __provinces;
}

// 获取市级数据
function getCities() {
  if (!__cities) {
    __cities = data.filter((item) => isCityCode(item.code));
  }
  return __cities;
}

// 获取区级数据
function getAreas() {
  if (!__areas) {
    __areas = data.filter((item) => isAreaCode(item.code));
  }
  return __areas;
}

// 内部获取省市级联数据
function initPC() {
  __pc = [];
  const provinces = getProvinces();
  const cities = getCities();

  provinces.forEach((item) => {
    const newItem: CascadeData = {
      ...item,
    };

    __pc.push(newItem);

    cities.forEach((cityItem) => {
      if (getProvinceCode(cityItem.code) === getProvinceCode(item.code)) {
        if (!newItem.children) {
          newItem.children = [];
        }
        newItem.children.push(cityItem);
      }
    });
  });
}

// 递归转换
function recursionTransformFormat(datalist: CascadeData[]) {
  const ret: CascadeDataForm[] = [];
  datalist.forEach((item) => {
    const newItem: CascadeDataForm = {
      value: item.code,
      label: item.name,
    };
    if (Array.isArray(item.children) && item.children.length > 0) {
      newItem.children = recursionTransformFormat(item.children);
    }
    ret.push(newItem);
  });
  return ret;
}

// 获取省市联动数据
function getPC(options?: CascaderOption) {
  const { inland = false, formatForm = false } = options || {};
  if (!__pc) {
    initPC();
  }

  let internalPC = __pc.slice();

  if (inland) {
    internalPC = filterInland(internalPC);
  }

  return formatForm ? recursionTransformFormat(internalPC) : internalPC;
}

function initPCA() {
  const newCities: CascadeData[] = getCities().map((item) => ({ ...item }));

  newCities.forEach((cityItem) => {
    data.forEach((item) => {
      if (
        isAreaCode(item.code) &&
        getCityCode(item.code) === getCityCode(cityItem.code)
      ) {
        if (!cityItem.children) {
          cityItem.children = [];
        }
        cityItem.children.push({ ...item });
      }
    });
  });

  const newProvinces: CascadeData[] = getProvinces().map((item) => ({
    ...item,
  }));

  newProvinces.forEach((item) => {
    newCities.forEach((cityItem) => {
      if (getProvinceCode(item.code) === getProvinceCode(cityItem.code)) {
        if (!item.children) {
          item.children = [];
        }
        item.children.push(cityItem);
      }
    });
  });
  __pca = newProvinces;
}

function getPCA(options?: CascaderOption) {
  const { inland = false, formatForm = false } = options || {};
  if (!__pca) {
    initPCA();
  }

  let internalPCA = __pca.slice();

  if (inland) {
    internalPCA = filterInland(internalPCA);
  }

  return formatForm ? recursionTransformFormat(internalPCA) : internalPCA;
}

export { data, getProvinces, getCities, getAreas, getPC, getPCA };
