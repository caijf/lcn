import pc from '../../data/pc.json';
import pcTest from '../shared/pcTest';
import definedTest from '../shared/definedTest';

describe('data/pc.json', () => {
  definedTest(pc);
  pcTest(pc);
});
