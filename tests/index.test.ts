import { data, getAreas, getCities, getProvinces, getPC, getPCA } from '../src';
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

describe('module', () => {
  describe('data', () => {
    dataTest(data);

    it("equal data/data.json", () => {
      expect(data).toEqual(dataJson);
    });
  });

  describe('getAreas', () => {
    const areas = getAreas();
    areasTest(areas);

    it('equal data/areas.json', () => {
      expect(areas).toEqual(areasJson);
    });
  });

  describe('getCities', () => {
    const cities = getCities();
    citiesTest(cities);

    it('equal data/cities.json', () => {
      expect(cities).toEqual(citiesJson);
    });
  });

  describe('getProvinces', () => {
    const provinces = getProvinces();
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

    const pcForm = getPC({ formatForm: true });
    pcFormTest(pcForm);
  });

  describe('getPC inland', () => {
    const pcInland = getPC({ inland: true });
    pcTest(pcInland);
    inlandTest(pcInland);

    const pcInlandForm = getPC({ inland: true, formatForm: true });
    pcFormTest(pcInlandForm);
    inlandFormTest(pcInlandForm);
  });

  describe('getPCA', () => {
    const pca = getPCA();
    pcaTest(pca);

    it('equal data/pca.json', () => {
      expect(pca).toEqual(pcaJson);
    });

    const pcaForm = getPCA({ formatForm: true });
    pcaFormTest(pcaForm);
  });

  describe('getPCA inland', () => {
    const pca = getPCA({ inland: true });
    pcaTest(pca);
    inlandTest(pca);

    const pcaForm = getPCA({ inland: true, formatForm: true });
    pcaFormTest(pcaForm);
    inlandFormTest(pcaForm);
  });
});
