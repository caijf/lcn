import provinces from '../../data/provinces.json';
import provincesTest from '../shared/provincesTest';
import definedTest from '../shared/definedTest';

describe('data/provinces.json', () => {
  definedTest(provinces);
  provincesTest(provinces);
});
