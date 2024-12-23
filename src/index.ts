import data from "./data";
import {
  isAreaCode,
  isCityCode,
  isProvinceCode,
  isInland,
  getProvinceCode,
  getCityCode,
  isCrownCountryCityCode,
} from "./util";

export {
  data,
  isAreaCode,
  isCityCode,
  isProvinceCode,
  isInland,
  getProvinceCode,
  getCityCode,
  isCrownCountryCityCode,
};

export type DataType = typeof data;

export type CascaderOption = {
  /**
   * 仅包含中国大陆内地数据。默认为 `false`。
   *
   * 如果为 `true`，将不包含香港/澳门/台湾。
   */
  inland?: boolean;

  /**
   * 自定义字段名。
   */
  fieldNames?: {
    code?: string;
    name?: string;
    children?: string;
  };

  /**
   * 自定义数据源。默认 `data`。
   */
  dataSource?: DataType;

  /**
   * 子级为空时的值，默认 `array`。
   *
   * `array` 表示为`[]`，`null` 表示为 `null`，`none` 表示删除该子级。
   */
  emptyChildrenValue?: "none" | "null" | "array";
};

export type CascadeData = {
  code?: string;
  name?: string;
  children?: CascadeData[];
  [key: string]: any;
};

export type CascadeDataWithNull = Omit<CascadeData, "children"> & {
  children?: CascadeDataWithNull[] | null;
};

// 默认字段名
const defaultFieldNames = {
  code: "code",
  name: "name",
  children: "children",
};

/**
 * 将数据拆分成省市区数据。
 *
 * @param opts
 * @returns
 */
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

// 初始化children值
function initChildrenValue(
  data: CascadeData,
  childrenKey: string,
  emptyChildrenValue: CascaderOption["emptyChildrenValue"],
) {
  if (emptyChildrenValue === "array") {
    data[childrenKey] = [];
  } else if (emptyChildrenValue === "null") {
    data[childrenKey] = null;
  }
}

/**
 * 获取省市级联数据。
 *
 * @param {Object} [options] 配置项。
 * @param {boolean} [options.inland=false] 仅包含中国大陆内地数据。默认为 `false`。如果为 `true`，将排除香港/澳门/台湾。
 * @param {boolean} [options.fieldNames] 自定义字段名。
 * @param {boolean} [options.dataSource=data] 自定义数据源。默认 `data`。
 * @param {boolean} [options.emptyChildrenValue='array'] 子级为空时的值，默认 `array`。`array` 表示为`[]`，`null` 表示为 `null`，`none` 表示删除该子级。
 * @returns {Array} 省市级联数据。
 * @example
 * // 全部省市级联数据
 * const pc = getPC();
 * // [
 * //   {
 * //     code: "410000",
 * //     name: "河南省",
 * //     children: [
 * //       { code: "410100", name: "郑州市" },
 * //       // ...
 * //     ]
 * //   },
 * //   // ...
 * // ]
 *
 * // 中国大陆内地省市级联数据
 * const pc2 = getPC({ inland: true });
 * // 数据结构同上，不包含香港/澳门/台湾。
 *
 * // 自定义字段名
 * const pc3 = getPC({ inland: true, fieldNames: { code: "value", name: "label" } });
 * // [
 * //   {
 * //     value: "410000",
 * //     label: "河南省",
 * //     children: [
 * //       { value: "410100", label: "郑州市" },
 * //       // ...
 * //     ]
 * //   },
 * //   // ...
 * // ]
 */
export function getPC(
  options?: CascaderOption & { emptyChildrenValue: "null" },
): CascadeDataWithNull[];
export function getPC(options?: CascaderOption): CascadeData[];
export function getPC(options?: CascaderOption) {
  const {
    inland = false,
    fieldNames: outFieldNames,
    dataSource = data,
    emptyChildrenValue = "array",
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
    };
    initChildrenValue(newProvItem, childrenKey, emptyChildrenValue);

    cities.forEach((cityItem) => {
      if (getProvinceCode(cityItem.code) === getProvinceCode(provItem.code)) {
        if (!newProvItem[childrenKey]) {
          newProvItem[childrenKey] = [];
        }
        newProvItem[childrenKey].push({
          [codeKey]: cityItem.code,
          [nameKey]: cityItem.name,
        });
      }
    });

    return newProvItem;
  });
}

/**
 * 获取省市区级联数据
 *
 * @param {Object} [options] 配置项。
 * @param {boolean} [options.inland=false] 仅包含中国大陆内地数据。默认为 `false`。如果为 `true`，将排除香港/澳门/台湾。
 * @param {boolean} [options.fieldNames] 自定义字段名。
 * @param {boolean} [options.dataSource=data] 自定义数据源。默认 `data`。
 * @param {boolean} [options.emptyChildrenValue='array'] 子级为空时的值，默认 `array`。`array` 表示为`[]`，`null` 表示为 `null`，`none` 表示删除该子级。
 * @returns {Array} 省市区级联数据。
 * @example
 * // 全部省市区级联数据
 * const pca = getPCA();
 * // [
 * //   {
 * //     code: "410000",
 * //     name: "河南省",
 * //     children: [
 * //       { code: "410100", name: "郑州市", children: [...] },
 * //       // ...
 * //     ]
 * //   },
 * //   // ...
 * // ]
 *
 * // 中国大陆内地省市区级联数据
 * const pca2 = getPCA({ inland: true });
 * // 数据结构同上，不包含香港/澳门/台湾。
 *
 * // 自定义字段名
 * const pca3 = getPCA({ inland: true, fieldNames: { code: "value", name: "label" } });
 * // [
 * //   {
 * //     value: "410000",
 * //     label: "河南省",
 * //     children: [
 * //       { value: "410100", label: "郑州市", children: [...] },
 * //       // ...
 * //     ]
 * //   },
 * //   // ...
 * // ]
 */
export function getPCA(
  options?: CascaderOption & { emptyChildrenValue: "null" },
): CascadeDataWithNull[];
export function getPCA(options?: CascaderOption): CascadeData[];
export function getPCA(options?: CascaderOption) {
  const {
    inland = false,
    fieldNames: outFieldNames,
    dataSource = data,
    emptyChildrenValue = "array",
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
    };
    initChildrenValue(newProvItem, childrenKey, emptyChildrenValue);

    cities.forEach((cityItem) => {
      const newCityItem: CascadeData = {
        [codeKey]: cityItem.code,
        [nameKey]: cityItem.name,
      };
      initChildrenValue(newCityItem, childrenKey, emptyChildrenValue);

      areas.forEach((areaItem) => {
        if (getCityCode(areaItem.code) === getCityCode(cityItem.code)) {
          if (!newCityItem[childrenKey]) {
            newCityItem[childrenKey] = [];
          }
          newCityItem[childrenKey].push({
            [codeKey]: areaItem.code,
            [nameKey]: areaItem.name,
          });
        }
      });

      if (getProvinceCode(provItem.code) === getProvinceCode(cityItem.code)) {
        if (!newProvItem[childrenKey]) {
          newProvItem[childrenKey] = [];
        }
        newProvItem[childrenKey].push(newCityItem);
      }
    });
    return newProvItem;
  });
}

type ParseItem = null | { code: string; name: string };

/**
 * 解析省市区编码数据。
 *
 * @param {string} code 省市区编码。
 * @param {Object} [options] 配置项。
 * @param {boolean} [options.dataSource=data] 自定义数据源。默认 `data`。
 * @param {boolean} [options.ignoreCrownCountryCityName=false] 忽略直辖县市名称。默认 `false`。
 * @returns {Array} 返回一个元组数组，对应省市区（某个没找到的返回 null）。
 * @example
 * parseCode('410102');
 * // [{ code: '410000', name: '河南省' }, { code: '410100', name: '郑州市' }, { code: '410102', name: '中原区' }];
 *
 * parseCode('410100');
 * // [{ code: '410000', name: '河南省' }, { code: '410100', name: '郑州市' }, null];
 *
 * parseCode('410000');
 * // [{ code: '410000', name: '河南省' }, null, null];
 *
 * parseCode('000102');
 * // [null, null, null]
 */
export function parseCode(
  code?: string,
  options?: {
    /**
     * 自定义数据源。默认 `data`。
     */
    dataSource?: DataType;

    /**
     * 忽略直辖县市名称。默认 `false`。
     */
    ignoreCrownCountryCityName?: boolean; // 忽略直辖市或直辖县的市级名称
  },
): [ParseItem, ParseItem, ParseItem] {
  if (typeof code !== "string" || code.length !== 6) {
    return [null, null, null];
  }

  const { dataSource = data, ignoreCrownCountryCityName = false } =
    options || {};

  const provinceCode = getProvinceCode(code) + "0000";
  const cityCode = getCityCode(code) + "00";

  const hasCity = code !== provinceCode;
  const hasArea = hasCity && code !== cityCode;

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
      city = {
        name:
          ignoreCrownCountryCityName && isCrownCountryCityCode(item.code)
            ? ""
            : item.name,
        code: item.code,
      };
    } else if (hasArea && !area && item.code === code) {
      area = { ...item };
    }
    return false;
  });

  return [province, city, area];
}

/**
 * @deprecated 即将废弃，请使用 `parseCode`。
 */
export const parseAreaCode = parseCode;

/**
 * 通过区县名称和市编码反查区县编码。
 *
 * @param {string} areaName 区县名称。
 * @param {string} cityCode 市级编码。
 * @returns {string | undefined} 如果找到区县数据，返回区县编码，否则返回 `undefined`。
 * @example
 * getAreaCodeByNameAndCityCode('海沧区', '350200');
 * // '350205'
 *
 * getAreaCodeByNameAndCityCode('海沧区123', '350200');
 * // undefined
 */
export const getAreaCodeByNameAndCityCode = (
  areaName: string,
  cityCode: string,
) => {
  const preCityCode = getCityCode(cityCode);
  if (!preCityCode || !areaName) {
    return;
  }
  return data.find(
    (item) => item.name === areaName && item.code.indexOf(preCityCode) === 0,
  )?.code;
};
