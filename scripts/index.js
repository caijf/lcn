const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const http = require('http');
const fs = require('fs');

const {checkDirExist} = require('./util');

// 2018年10月中华人民共和国县以上行政区划代码
const url = 'http://www.mca.gov.cn/article/sj/xzqh/2018/201804-12/20181011221630.html';

/**
 * 处理标准数据 -> code/name
 * @param  {string} html dom string
 * @return {object} 
 * @example
 *      [{
 *          "code":"110000"
 *          "name":"北京市"
 *      }]
 */
function processOrigin(html) {
    const $ = cheerio.load(html);
    const $tr = $('tr');

    const ret = [];

    $tr.each(function (item, index) {
        const $this = $(this);
        const code =$this.find('td').eq(1).text();
        const name =$this.find('td').eq(2).text();

        if (!isNaN(code) && code != 0) {
            ret.push({
                code,
                name
            });
        }
    });

    return ret;
}

function cloneObject(obj) {
    return JSON.parse(JSON.stringify(obj));
}

// 直辖市当省处理
const zxs = {
    "11": "北京市",
    "12": "天津市",
    "31": "上海市",
    "50": "重庆市"
};

// 判断是否直辖市
function isZXS(code) {
    return !!zxs[code.substr(0,2)];
}

/**
 * 格式化数据，处理省市区、表单格式、规整化等格式
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function format(data) {
    let provinces = [], 
        cities = [], 
        areas = [], 
        normalData = {}, // 规整化数据
        stdData = [], // 标准数据
        formData = [], // 表单格式数据
        stdpcData = [], // 省市数据
        formpcData = []; // 省市数据

    // 划分省市区数据
    data.forEach(item=>{
        // const provinceID = item.code.substr(0, 2);
        // const cityID = item.code.substr(2,4);
        // const areaID = item.code.substr(4, 6);

        normalData[item.code] = item.name;

        if(item.code.substr(2) === '0000'){
            provinces.push(item);
        }else if(item.code.substr(4) === '00' || isZXS(item.code)){ // 直辖市区相当于省地级市
            cities.push(item);
        }else{
            areas.push(item);
        }
    });

    const cloneCities = cities.map(item=>{
        const children = [];
        const cpc = item.code.substr(0,4); 

        areas.forEach(area=>{
            const apc = area.code.substr(0,4);
            if(apc === cpc){
                children.push(area);
            }
        });

        return children.length > 0 ? {
            ...item,
            children
        } : {...item};
    });

    const cloneProvinces = provinces.map(item=>{
        const children = [];
        const pp = item.code.substr(0,2); 

        cloneCities.forEach(city=>{
            const cp = city.code.substr(0,2);
            if(pp === cp){
                children.push(city);
            }
        });

        return children.length > 0 ? {
            ...item,
            children
        } : {...item};
    });

    stdData = cloneProvinces;
    stdpcData = stdData.map(item=>{
        let { children, ...rest } = item;

        let rwChildren = [];

        if(children && children.length > 0){
            children.forEach(subItem=>{
                let { children, ...rest } = subItem;
                rwChildren.push(rest);
            });
        }

        return rwChildren.length > 0 ? {
            ...rest,
            children: rwChildren
        } : {...rest};
    });

    formData = recursionKey(stdData);
    formpcData = formData.map(item=>{
        let { children, ...rest } = item;

        let rwChildren = [];

        if(children && children.length > 0){
            children.forEach(subItem=>{
                let { children, ...rest } = subItem;
                rwChildren.push(rest);
            });
        }

        return rwChildren.length > 0 ? {
            ...rest,
            children: rwChildren
        } : {...rest};
    })

    return {
        provinces,
        cities,
        areas,
        normalData,
        stdData,
        stdpcData,
        formData,
        formpcData
    }
}

function recursionKey(data) {
    const ret = [];
    if(Array.isArray(data) && data.length > 0){
        data.forEach(item=>{
            let tmp = {
                value: item.code,
                label: item.name
            };
            if(Array.isArray(item.children) && item.children.length>0){
                tmp.children = recursionKey(item.children);
            }
            ret.push(tmp);
        })
    }
    return ret;
}

// 转为 js 模块字符串
function transformJsModule(str) {
    return `export default ${str}`;
}

// 将内容写入文件
async function writeToFile(filename, data) {
    let str = data;

    if(typeof data !== 'string'){
        str = JSON.stringify(data);
    }

    str = transformJsModule(str);

    fs.writeFile(filename, str, function (err) {
        if (err) {
            console.log(err);
            return false;
        } else {
            console.log(`数据保存已到${filename}`);
            return true;
        }
    });
}

// 导出js模块-->>
// lcn.js // 标准数据 code/name
// lcn-normalize.js // 规整化数据code:name
// lcn-form.js // 表单数据 value/label


// TODOS:
// 同一个省全部拉到一个数组里
// 同一个市全部拉到一个数组里

// 是否用缓存数据，不用去服务端获取

// lcn.json // 规整化数据code:name
// lcn-provinces.json // 省数据
// lcn-cities.json // 市数据
// lcn-areas.json // 区数据

// 扩展 json、csv 标准数据（全部、省、市、区）

// 生成文件存放路径
const srcRoot = './src';
const stdFilename = 'lcn.js';
const originFilename = 'lcn-origin.js';
const normalFilename = 'lcn-normalize.js';
const formFilename = 'lcn-form.js';

// 只级联省市数据
const stdpcFilename = 'lcn_pc.js';
const formpcFilename = 'lcn_pc-form.js';

checkDirExist(srcRoot);

http.get(url, function (res) {
    let chunks = [];
    let size = 0;

    res.on('data', function (data) {
        chunks.push(data);
        size+=data.length;
    });
    res.on('end', function () {
        // 防止中文乱码
        let buf = Buffer.concat(chunks,size);
        let str = iconv.decode(buf,'utf8');
        
        // 输出标准数据文件
        let lcnOrigin = processOrigin(str);
        writeToFile(`${srcRoot}/${originFilename}`, lcnOrigin);

        const data = format(lcnOrigin);
        // console.log(data);
        writeToFile(`${srcRoot}/${stdFilename}`, data.stdData);
        writeToFile(`${srcRoot}/${normalFilename}`, data.normalData);
        writeToFile(`${srcRoot}/${formFilename}`, data.formData);
        writeToFile(`${srcRoot}/${stdpcFilename}`, data.stdpcData);
        writeToFile(`${srcRoot}/${formpcFilename}`, data.formpcData);

    })
}).on('error', function () {
    console.log('获取数据失败');
});





