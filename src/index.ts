import data from "./data";
import {
  isAreaCode,
  isCityCode,
  isProvinceCode,
  isInland,
  getProvinceCode,
  getCityCode,
} from "./util";

export {
  data,
  isAreaCode,
  isCityCode,
  isProvinceCode,
  isInland,
  getProvinceCode,
  getCityCode,
};

export type DataType = typeof data;

export type CascaderOption = {
  inland?: boolean;
  fieldNames?: {
    code?: string;
    name?: string;
    children?: string;
  };
  dataSource?: DataType;
};

export type CascadeData = {
  code?: string;
  name?: string;
  children?: CascadeData[];
  [key: string]: any;
};

// 默认字段名
const defaultFieldNames = {
  code: "code",
  name: "name",
  children: "children",
};

// 将数据拆分成省市区数据
export function splitPCA(opts?: {
  dataSource?: DataType;
  inland?: boolean;
  province?: boolean;
  city?: boolean;
  area?: boolean;
}) {
  const {
    province = true,
    city = true,
    area = true,
    inland = false,
    dataSource = data,
  } = opts || {};
  const provinces: DataType = [];
  const cities: DataType = [];
  const areas: DataType = [];

  dataSource.forEach((item) => {
    if (!inland || isInland(item.code)) {
      if (province && isProvinceCode(item.code)) {
        provinces.push({ ...item });
      } else if (city && isCityCode(item.code)) {
        cities.push({ ...item });
      } else if (area && isAreaCode(item.code)) {
        areas.push({ ...item });
      }
    }
  });
  return { provinces, cities, areas };
}

// 获取省市联动数据
export function getPC(options?: CascaderOption) {
  const {
    inland = false,
    fieldNames: outFieldNames,
    dataSource = data,
  } = options || {};
  const {
    code: codeKey,
    name: nameKey,
    children: childrenKey,
  } = { ...defaultFieldNames, ...outFieldNames };
  const { provinces, cities } = splitPCA({ dataSource, inland, area: false });

  return provinces.map((provItem) => {
    const newProvItem: CascadeData = {
      [codeKey]: provItem.code,
      [nameKey]: provItem.name,
      [childrenKey]: [],
    };

    cities.forEach((cityItem) => {
      if (getProvinceCode(cityItem.code) === getProvinceCode(provItem.code)) {
        newProvItem[childrenKey].push({
          [codeKey]: cityItem.code,
          [nameKey]: cityItem.name,
        });
      }
    });

    return newProvItem;
  });
}

// 获取省市区联动数据
export function getPCA(options?: CascaderOption) {
  const {
    inland = false,
    fieldNames: outFieldNames,
    dataSource = data,
  } = options || {};
  const {
    code: codeKey,
    name: nameKey,
    children: childrenKey,
  } = { ...defaultFieldNames, ...outFieldNames };
  const { provinces, cities, areas } = splitPCA({ dataSource, inland });

  return provinces.map((provItem) => {
    const newProvItem: CascadeData = {
      [codeKey]: provItem.code,
      [nameKey]: provItem.name,
      [childrenKey]: [],
    };

    cities.forEach((cityItem) => {
      const newCityItem: CascadeData = {
        [codeKey]: cityItem.code,
        [nameKey]: cityItem.name,
        [childrenKey]: [],
      };

      areas.forEach((areaItem) => {
        if (getCityCode(areaItem.code) === getCityCode(cityItem.code)) {
          newCityItem[childrenKey].push({
            [codeKey]: areaItem.code,
            [nameKey]: areaItem.name,
          });
        }
      });

      if (getProvinceCode(provItem.code) === getProvinceCode(cityItem.code)) {
        newProvItem[childrenKey].push(newCityItem);
      }
    });
    return newProvItem;
  });
}

type ParseItem = null | { code: string; name: string };

// 解析地区码
export function parseAreaCode(
  areaCode: string,
  dataSource = data
): [ParseItem, ParseItem, ParseItem] {
  if (typeof areaCode !== "string" || areaCode.length !== 6) {
    return [null, null, null];
  }

  const provinceCode = getProvinceCode(areaCode) + "0000";
  const cityCode = getCityCode(areaCode) + "00";

  const hasCity = areaCode !== provinceCode;
  const hasArea = hasCity && areaCode !== cityCode;

  let province: ParseItem = null;
  let city: ParseItem = null;
  let area: ParseItem = null;

  dataSource.some((item) => {
    if (
      province &&
      ((hasCity && city) || !hasCity) &&
      ((hasArea && area) || !hasArea)
    ) {
      return true;
    }

    if (!province && item.code === provinceCode) {
      province = { ...item };
    } else if (hasCity && !city && item.code === cityCode) {
      city = { ...item };
    } else if (hasArea && !area && item.code === areaCode) {
      area = { ...item };
    }
    return false;
  });

  return [province, city, area];
}
