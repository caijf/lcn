import { DataType } from '../../src';

function citiesTest(data: DataType) {
  it('检查数据', () => {
    expect(data.length).toBe(342);
    // expect(data[0]).toEqual({ code: '110100', name: '北京市' });
    // expect(data[data.length - 1]).toEqual({ code: '659000', name: '自治区直辖县级行政区划' });
    // // 不包含区
    // expect(data).not.toContainEqual({ code: '110101', name: '东城区' });
    // // 不包含省
    // expect(data).not.toContainEqual({ code: '110000', name: '北京市' });
  });

  it('直辖市', () => {
    expect(data).toContainEqual({ code: '110100', name: '北京市' });
    expect(data).toContainEqual({ code: '120100', name: '天津市' });
    expect(data).toContainEqual({ code: '310100', name: '上海市' });
    expect(data).toContainEqual({ code: '500100', name: '重庆市' });
  });

  it('部分省补充县级行政区划', () => {
    expect(data).toContainEqual({ code: '469000', name: '省直辖县级行政区划' });
    expect(data).toContainEqual({
      code: '659000',
      name: '自治区直辖县级行政区划'
    });
  });
}

export default citiesTest;
