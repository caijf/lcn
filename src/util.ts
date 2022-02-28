export interface CascadeData {
  code: string;
  name: string;
  children?: CascadeData[];
}

export interface CascadeDataForm {
  value: string;
  label: string;
  children?: CascadeDataForm[];
}

// 获取省份码
export function getProvinceCode(code: string) {
  return code.substring(0, 2);
}

// 获取市级码
export function getCityCode(code: string) {
  return code.substring(0, 4);
}

// 是否为省份码
export function isProvinceCode(code: string) {
  return code.substring(2, 6) === "0000";
}

// 是否为市级码
export function isCityCode(code: string) {
  return !isProvinceCode(code) && code.substring(4, 6) === "00";
}

// 是否为区级码
export function isAreaCode(code: string) {
  return !isProvinceCode(code) && !isCityCode(code);
}

// 转换form数据
export function transformFormData(data: CascadeData[]) {
  return data.map((item) => {
    const ret: CascadeDataForm = {
      value: item.code,
      label: item.name,
    };
    if (item.children) {
      ret.children = transformFormData(item.children);
    }
    return ret;
  });
}

// 非内地省代码
const notInlandProvinceCode = ["71", "81", "82"];

// 过滤非内地省份
export function filterInland(data: CascadeData[]) {
  return data.filter(
    (item) => notInlandProvinceCode.indexOf(getProvinceCode(item.code)) === -1
  );
}
