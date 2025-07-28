import { DataType, CascadeData, CascadeDataWithNull } from '../../src';

function inlandFormTest(data: DataType | (CascadeData | CascadeDataWithNull)[]) {
  it('内地数据不包含港澳台', () => {
    expect(data).not.toContainEqual({ value: '710000', label: '台湾省' });
    expect(data).not.toContainEqual({
      value: '810000',
      label: '香港特别行政区'
    });
    expect(data).not.toContainEqual({
      value: '820000',
      label: '澳门特别行政区'
    });
  });
}

export default inlandFormTest;
