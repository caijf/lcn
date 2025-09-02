import {
  data,
  getPC,
  getPCA,
  splitPCA,
  parseCode,
  isCrownCountryCityCode,
  getAreaCodeByNameAndCityCode
} from '../src';
import areasTest from './shared/areasTest';
import citiesTest from './shared/citiesTest';
import ProvincesTest from './shared/provincesTest';
import dataTest from './shared/dataTest';
import pcTest from './shared/pcTest';
import pcFormTest from './shared/pcFormTest';
import pcaTest from './shared/pcaTest';
import pcaFormTest from './shared/pcaFormTest';
import inlandTest from './shared/inlandTest';
import inlandFormTest from './shared/inlandFormTest';

import dataJson from '../data/data.json';
import areasJson from '../data/areas.json';
import citiesJson from '../data/cities.json';
import provincesJson from '../data/provinces.json';
import pcJson from '../data/pc.json';
import pcaJson from '../data/pca.json';

const { provinces, cities, areas } = splitPCA();

type CascadeData = {
  [key: string]: unknown;
  children?: CascadeData[];
};

function countCascadeDataLength(cascadeData: CascadeData[]) {
  let len = 0;
  cascadeData.forEach((item) => {
    len += 1;
    if (item?.children && item.children.length > 0) {
      len += countCascadeDataLength(item.children);
    }
  });
  return len;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getDiffAreas() {
  const pcaAreas: { code: string; name: string }[] = [];
  pcaJson.forEach((item) => {
    if (item?.children) {
      item.children.forEach((subItem) => {
        if (subItem?.children) {
          pcaAreas.push(...(subItem?.children || {}));
        }
      });
    }
  });

  const diffAreas: { code: string; name: string }[] = [];

  areasJson.forEach((item) => {
    if (!pcaAreas.find((pcaItem) => pcaItem.code === item.code)) {
      diffAreas.push(item);
    }
  });

  // console.log(diffAreas);
}

describe('module', () => {
  describe('data', () => {
    dataTest(data);

    it('equal data/data.json', () => {
      expect(data).toEqual(dataJson);

      // 测试级联数据数量
      const pcaLen = countCascadeDataLength(pcaJson);
      expect(pcaLen).toEqual(provincesJson.length + citiesJson.length + areasJson.length);

      // 测试级联数据数量
      const pcLen = countCascadeDataLength(pcJson);
      expect(pcLen).toEqual(provincesJson.length + citiesJson.length);
    });
  });

  describe('areas', () => {
    areasTest(areas);

    it('equal data/areas.json', () => {
      expect(areas).toEqual(areasJson);
    });
  });

  describe('cities', () => {
    citiesTest(cities);

    it('equal data/cities.json', () => {
      expect(cities).toEqual(citiesJson);
    });
  });

  describe('provinces', () => {
    ProvincesTest(provinces);

    it('equal data/provinces.json', () => {
      expect(provinces).toEqual(provincesJson);
    });
  });

  describe('getPC', () => {
    const pc = getPC();
    pcTest(pc);

    it('equal data/pc.json', () => {
      expect(pc).toEqual(pcJson);
    });

    const pcForm = getPC({ fieldNames: { code: 'value', name: 'label' } });
    pcFormTest(pcForm);
  });

  describe('getPC inland', () => {
    const pcInland = getPC({ inland: true });
    pcTest(pcInland);
    inlandTest(pcInland);

    const pcInlandForm = getPC({
      inland: true,
      fieldNames: { code: 'value', name: 'label' }
    });
    pcFormTest(pcInlandForm);
    inlandFormTest(pcInlandForm);
  });

  describe('getPC emptyChildrenValue', () => {
    it('emptyChildrenValue=array', () => {
      const pc = getPC({ emptyChildrenValue: 'array' });
      expect(pc).toMatchSnapshot();

      const tw = pc.find((item) => item.code === '710000');
      expect(tw?.children).toEqual([]);
    });
    it('emptyChildrenValue=none', () => {
      const pc = getPC({ emptyChildrenValue: 'none' });
      expect(pc).toMatchSnapshot();

      const tw = pc.find((item) => item.code === '710000');
      expect(tw?.children).toBeUndefined();
    });
    it('emptyChildrenValue=null', () => {
      const pc = getPC({ emptyChildrenValue: 'null' });
      expect(pc).toMatchSnapshot();

      const tw = pc.find((item) => item.code === '710000');
      expect(tw?.children).toBeNull();
    });
  });

  describe('getPC ignoreCrownCountryCity', () => {
    it('忽略直辖市或省直辖县的市级，并将直辖市的区和省直辖县的县添加到省份数据子集', () => {
      const pc = getPC({ ignoreCrownCountryCity: true });
      expect(pc).toContainEqual({
        code: '110000',
        name: '北京市',
        children: [
          { code: '110101', name: '东城区' },
          { code: '110102', name: '西城区' },
          { code: '110105', name: '朝阳区' },
          { code: '110106', name: '丰台区' },
          { code: '110107', name: '石景山区' },
          { code: '110108', name: '海淀区' },
          { code: '110109', name: '门头沟区' },
          { code: '110111', name: '房山区' },
          { code: '110112', name: '通州区' },
          { code: '110113', name: '顺义区' },
          { code: '110114', name: '昌平区' },
          { code: '110115', name: '大兴区' },
          { code: '110116', name: '怀柔区' },
          { code: '110117', name: '平谷区' },
          { code: '110118', name: '密云区' },
          { code: '110119', name: '延庆区' }
        ]
      });
      expect(pc).toContainEqual({
        children: [
          { code: '500101', name: '万州区' },
          { code: '500102', name: '涪陵区' },
          { code: '500103', name: '渝中区' },
          { code: '500104', name: '大渡口区' },
          { code: '500105', name: '江北区' },
          { code: '500106', name: '沙坪坝区' },
          { code: '500107', name: '九龙坡区' },
          { code: '500108', name: '南岸区' },
          { code: '500109', name: '北碚区' },
          { code: '500110', name: '綦江区' },
          { code: '500111', name: '大足区' },
          { code: '500112', name: '渝北区' },
          { code: '500113', name: '巴南区' },
          { code: '500114', name: '黔江区' },
          { code: '500115', name: '长寿区' },
          { code: '500116', name: '江津区' },
          { code: '500117', name: '合川区' },
          { code: '500118', name: '永川区' },
          { code: '500119', name: '南川区' },
          { code: '500120', name: '璧山区' },
          { code: '500151', name: '铜梁区' },
          { code: '500152', name: '潼南区' },
          { code: '500153', name: '荣昌区' },
          { code: '500154', name: '开州区' },
          { code: '500155', name: '梁平区' },
          { code: '500156', name: '武隆区' },
          { code: '500229', name: '城口县' },
          { code: '500230', name: '丰都县' },
          { code: '500231', name: '垫江县' },
          { code: '500233', name: '忠县' },
          { code: '500235', name: '云阳县' },
          { code: '500236', name: '奉节县' },
          { code: '500237', name: '巫山县' },
          { code: '500238', name: '巫溪县' },
          { code: '500240', name: '石柱土家族自治县' },
          { code: '500241', name: '秀山土家族苗族自治县' },
          { code: '500242', name: '酉阳土家族苗族自治县' },
          { code: '500243', name: '彭水苗族土家族自治县' }
        ],
        code: '500000',
        name: '重庆市'
      });
    });
  });

  describe('getPCA', () => {
    const pca = getPCA();
    pcaTest(pca);

    it('equal data/pca.json', () => {
      expect(pca).toEqual(pcaJson);
    });

    const pcaForm = getPCA({ fieldNames: { code: 'value', name: 'label' } });
    pcaFormTest(pcaForm);
  });

  describe('getPCA inland', () => {
    const pca = getPCA({ inland: true });
    pcaTest(pca);
    inlandTest(pca);

    const pcaForm = getPCA({
      inland: true,
      fieldNames: { code: 'value', name: 'label' }
    });
    pcaFormTest(pcaForm);
    inlandFormTest(pcaForm);
  });

  describe('getPCA emptyChildrenValue', () => {
    const pca1 = getPCA({ emptyChildrenValue: 'none' });
    const pca2 = getPCA({ emptyChildrenValue: 'null' });
    expect(pca1).toMatchSnapshot();
    expect(pca2).toMatchSnapshot();
  });

  describe('parseCode', () => {
    it('success', () => {
      const parseAreas = parseCode('410102');
      const results = [
        { code: '410000', name: '河南省' },
        { code: '410100', name: '郑州市' },
        { code: '410102', name: '中原区' }
      ];

      expect(parseAreas.length).toBe(3);
      expect(parseAreas[0]).toEqual(results[0]);
      expect(parseAreas[1]).toEqual(results[1]);
      expect(parseAreas[2]).toEqual(results[2]);
    });
    it('not area', () => {
      const parseAreas = parseCode('410100');
      const results = [
        { code: '410000', name: '河南省' },
        { code: '410100', name: '郑州市' },
        null
      ];

      expect(parseAreas.length).toBe(3);
      expect(parseAreas[0]).toEqual(results[0]);
      expect(parseAreas[1]).toEqual(results[1]);
      expect(parseAreas[2]).toEqual(results[2]);
    });
    it('not city', () => {
      const parseAreas = parseCode('410000');
      const results = [{ code: '410000', name: '河南省' }, null, null];

      expect(parseAreas.length).toBe(3);
      expect(parseAreas[0]).toEqual(results[0]);
      expect(parseAreas[1]).toEqual(results[1]);
      expect(parseAreas[2]).toEqual(results[2]);
    });
    it('fail', () => {
      const parseAreas = parseCode('100000');
      const results = [null, null, null];

      expect(parseAreas.length).toBe(3);
      expect(parseAreas[0]).toEqual(results[0]);
      expect(parseAreas[1]).toEqual(results[1]);
      expect(parseAreas[2]).toEqual(results[2]);
    });
    it('ignoreCrownCountryCityName', () => {
      const parseAreas = parseCode('110102', {
        ignoreCrownCountryCityName: true
      });
      const results = [
        { code: '110000', name: '北京市' },
        { code: '110100', name: '' },
        { code: '110102', name: '西城区' }
      ];

      expect(parseAreas.length).toBe(3);
      expect(parseAreas[0]).toEqual(results[0]);
      expect(parseAreas[1]).toEqual(results[1]);
      expect(parseAreas[2]).toEqual(results[2]);
    });
  });

  describe('isCrownCountryCityCode', () => {
    it('true', () => {
      // 310100', '500100', '500200', '120100', '469000', '659000', '419000', '429000'
      expect(isCrownCountryCityCode('110100')).toBe(true);
      expect(isCrownCountryCityCode('500100')).toBe(true);
      expect(isCrownCountryCityCode('500200')).toBe(true);
      expect(isCrownCountryCityCode('120100')).toBe(true);
      expect(isCrownCountryCityCode('469000')).toBe(true);
      expect(isCrownCountryCityCode('659000')).toBe(true);
      expect(isCrownCountryCityCode('419000')).toBe(true);
      expect(isCrownCountryCityCode('429000')).toBe(true);
    });
    it('false', () => {
      expect(isCrownCountryCityCode('110102')).toBe(false);
      expect(isCrownCountryCityCode('500102')).toBe(false);
      expect(isCrownCountryCityCode('500202')).toBe(false);
      expect(isCrownCountryCityCode('120102')).toBe(false);
      expect(isCrownCountryCityCode('469002')).toBe(false);
      expect(isCrownCountryCityCode('659002')).toBe(false);
      expect(isCrownCountryCityCode('419002')).toBe(false);
      expect(isCrownCountryCityCode('429002')).toBe(false);
    });
  });

  describe('getAreaCodeByNameAndCityCode', () => {
    it('basic', () => {
      const areaCode1 = getAreaCodeByNameAndCityCode('海沧区', '350200');
      expect(areaCode1).toBe('350205');
    });

    it('error data return `undefined`', () => {
      const areaCode1 = getAreaCodeByNameAndCityCode('海沧区123', '350200');
      expect(areaCode1).toBeUndefined();

      const areaCode2 = getAreaCodeByNameAndCityCode('', '350200');
      expect(areaCode2).toBeUndefined();

      const areaCode3 = getAreaCodeByNameAndCityCode('海沧区', '');
      expect(areaCode3).toBeUndefined();
    });
  });
});
