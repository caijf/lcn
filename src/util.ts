/**
 * 规整化编码。
 *
 * @param value 要处理的值。
 * @param min 有效值的最小长度。默认 `2`。
 * @returns 省市区编码字符串。
 * @example
 * normalizeCode(); // ''
 * normalizeCode('1'); // ''
 * normalizeCode(1); // ''
 * normalizeCode(11); // '11'
 * normalizeCode(1101); // '1101'
 * normalizeCode(110102); // '110102'
 *
 * normalizeCode(11, 4); // ''
 * normalizeCode(1101, 4); // '1101'
 */
function normalizeCode(value: any, min = 2) {
  if (value == null) {
    return "";
  }
  const result = typeof value === "string" ? value : String(value);
  return result.length >= min ? result : "";
}

// 是否为有效的省市区编码。
const _isValidCode = (code: string) => {
  return code.length === 6;
};

// 是否为省级编码
const _isProvinceCode = (code: string) => {
  return code.substring(2, 6) === "0000";
};

// 是否为市级编码
const _isCityCode = (code: string) => {
  return !_isProvinceCode(code) && code.substring(4, 6) === "00";
};

/**
 * 获取省份编码。
 *
 * @param code 省市区编码。
 * @returns 如果值的长度是大于等于 2 ，返回前 2 位字符，否则返回空字符串。
 * @example
 * getProvinceCode('110102'); // '11'
 * getProvinceCode(); // ''
 */
export function getProvinceCode(code?: string) {
  const realCode = normalizeCode(code);
  return realCode.substring(0, 2);
}

/**
 * 获取省市编码。
 *
 * @param code 省市区编码。
 * @returns 如果值的长度是大于等于 4 ，返回前 4 位字符，否则返回空字符串。
 * @example
 * getCityCode('110102'); // '1101'
 * getCityCode(); // ''
 */
export function getCityCode(code?: string) {
  const realCode = normalizeCode(code, 4);
  return realCode.substring(0, 4);
}

/**
 * 判断是否为省份编码。
 *
 * @param code 要检查的编码。
 * @returns 如果值的长度为 6，且后 4 位字符等于 `0000`，返回 `true`，否则返回 `false`。
 * @example
 * isProvinceCode('110000'); // true
 * isProvinceCode('110100'); // false
 * isProvinceCode('110102'); // false
 * isProvinceCode(); // false
 */
export function isProvinceCode(code?: string) {
  const realCode = normalizeCode(code);
  return _isValidCode(realCode) && _isProvinceCode(realCode);
}

/**
 * 判断是否为市级编码。
 *
 * @param code 要检查的编码。
 * @returns 如果值的长度为 6 ，最后 2 位等于 `00`，且后4位字符不等于 `0000`，返回 `true`，否则返回 `false`。
 * @example
 * isCityCode('110000'); // false
 * isCityCode('110100'); // true
 * isCityCode('110102'); // false
 * isCityCode(); // false
 */
export function isCityCode(code?: string) {
  const realCode = normalizeCode(code);
  return _isValidCode(realCode) && _isCityCode(realCode);
}

/**
 * 判断是否为区县编码。
 *
 * @param code 要检查的编码。
 * @returns 如果值的长度为 6 ，最后 2 位不等于 `00`，且后4位字符不等于 `0000`，返回 `true`，否则返回 `false`。
 * @example
 * isAreaCode('110000'); // false
 * isAreaCode('110100'); // false
 * isAreaCode('110102'); // true
 * isAreaCode(); // false
 */
export function isAreaCode(code?: string) {
  const realCode = normalizeCode(code);
  return (
    _isValidCode(realCode) &&
    !_isProvinceCode(realCode) &&
    !_isCityCode(realCode)
  );
}

// 非内地省代码
const notInlandProvinceCode = ["71", "81", "82"];

/**
 * 判断是否为内地省市区。
 *
 * @param code 要检查的编码。
 * @returns 如果是中国大陆内地省市区编码，返回 `true`，否则返回 `false`。
 * @example
 * isInland('110102'); // true
 *
 * // 71/81/82 开头的编码都返回 false
 * isInland('710000'); // false
 * isInland('810000'); // false
 * isInland('820000'); // false
 */
export const isInland = (code?: string) => {
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

/**
 * 判断是否为直辖市或直辖县的市级。
 *
 * @param code 要检查的编码。
 * @returns 如果是直辖县的市级，返回 `true`，否则返回 `false`。
 * @example
 * isCrownCountryCityCode('110100'); // true
 * isCrownCountryCityCode('310100'); // true
 * isCrownCountryCityCode('500100'); // true
 * isCrownCountryCityCode('500200'); // true
 *
 * isCrownCountryCityCode('441300'); // fasle
 */
export const isCrownCountryCityCode = (code?: string) =>
  crownCountryCityCodes.includes(code!);
