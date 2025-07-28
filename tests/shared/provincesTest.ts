import { CascadeData } from '../../src';

function provincesTest(data: CascadeData[]) {
  it('检查数据', () => {
    expect(data.length).toBe(34);
    expect(data[0]).toEqual({ code: '110000', name: '北京市' });
    expect(data[data.length - 1]).toEqual({
      code: '820000',
      name: '澳门特别行政区'
    });
    // 不包含区
    expect(data).not.toContainEqual({ code: '110101', name: '东城区' });
    // 不包含市
    expect(data).not.toContainEqual({ code: '110100', name: '北京市' });
  });

  it('港澳台', () => {
    expect(data).toContainEqual({ code: '710000', name: '台湾省' });
    expect(data).toContainEqual({ code: '810000', name: '香港特别行政区' });
    expect(data).toContainEqual({ code: '820000', name: '澳门特别行政区' });
  });
}

export default provincesTest;
