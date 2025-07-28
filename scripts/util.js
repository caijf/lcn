/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');

/**
 * 检查路径是否存在 如果不存在则创建路径
 * @param {string} folderpath 文件路径
 */
function checkDirExist(folderpath) {
  const pathArr = folderpath.split('/');
  let _path = '';
  for (let i = 0; i < pathArr.length; i++) {
    if (pathArr[i] === '.' && i === 0) {
      _path = pathArr[i];
    } else if (pathArr[i]) {
      _path += `/${pathArr[i]}`;
    }

    if (pathArr[i]) {
      if (!fs.existsSync(_path)) {
        fs.mkdirSync(_path);
      }
    }
  }
}

// 将内容写入文件
function writeToFile(filename, data) {
  let str = data;

  if (typeof data !== 'string') {
    str = JSON.stringify(data);
  }

  return new Promise((resolve, reject) => {
    fs.writeFile(filename, str, function (err) {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log(`数据保存已到${filename}`);
        resolve();
      }
    });
  });
}

// 获取省份码
function getProvinceCode(code) {
  return code.substr(0, 2);
}

// 获取市级码
function getCityCode(code) {
  return code.substr(0, 4);
}

// 是否为省份码
function isProvinceCode(code) {
  return code.substr(2, 4) === '0000';
}

// 是否为市级码
function isCityCode(code) {
  return !isProvinceCode(code) && code.substr(4, 2) === '00';
}

module.exports = {
  checkDirExist,
  writeToFile,
  isProvinceCode,
  isCityCode,
  getProvinceCode,
  getCityCode
};
