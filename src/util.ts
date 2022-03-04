// 规整化字符串
function normalizeString(value: any) {
  if (typeof value === "undefined" || value === null) {
    return "";
  }
  return typeof value === "string" ? value : String(value);
}

// 获取省份码
export function getProvinceCode(code: string) {
  const realCode = normalizeString(code);
  return realCode.substring(0, 2);
}

// 获取市级码
export function getCityCode(code: string) {
  const realCode = normalizeString(code);
  return realCode.substring(0, 4);
}

// 是否为省份码
export function isProvinceCode(code: string) {
  const realCode = normalizeString(code);
  return realCode.substring(2, 6) === "0000";
}

// 是否为市级码
export function isCityCode(code: string) {
  const realCode = normalizeString(code);
  return !isProvinceCode(realCode) && realCode.substring(4, 6) === "00";
}

// 是否为区级码
export function isAreaCode(code: string) {
  return !isProvinceCode(code) && !isCityCode(code);
}

// 非内地省代码
const notInlandProvinceCode = ["71", "81", "82"];

// 是否为内地省市区
export const isInland = (code: string) => {
  return !notInlandProvinceCode.includes(getProvinceCode(code));
};

// ref: scripts/extend.js
// 直辖县的市级
const crownCountryCityCodes = [
  "110100",
  "310100",
  "500100",
  "500200",
  "120100",
  "469000",
  "659000",
  "419000",
  "429000",
];
// 是否为直辖市或直辖县的市级
export const isCrownCountryCityCode = (code: string) =>
  crownCountryCityCodes.includes(code);
