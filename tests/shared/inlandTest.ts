import { DataType, CascadeData, CascadeDataWithNull } from '../../src';

function inlandTest(data: DataType | (CascadeData | CascadeDataWithNull)[]) {
  it('内地数据不包含港澳台', () => {
    expect(data).not.toContainEqual({ code: '710000', name: '台湾省' });
    expect(data).not.toContainEqual({ code: '810000', name: '香港特别行政区' });
    expect(data).not.toContainEqual({ code: '820000', name: '澳门特别行政区' });
  });
}

export default inlandTest;