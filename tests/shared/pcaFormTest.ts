import { CascadeData } from '../../src';

function pcaFormTest(data: CascadeData[]) {
  it("检查数据", () => {
    expect(data[0]!.children!.length).toBe(1);
    expect(data[0]!.children![0].children!.length).toBe(16);
  });

  it("直辖市", () => {
    const bj = data.find((item) => item.value === "110000");
    expect(bj!.children!.length).toBe(1);

    const tj = data.find((item) => item.value === "120000");
    expect(tj!.children!.length).toBe(1);

    const sh = data.find((item) => item.value === "310000");
    expect(sh!.children!.length).toBe(1);

    const cq = data.find((item) => item.value === "500000");
    expect(cq!.children!.length).toBe(2);
  });

  it("部分省补充县级行政区划", () => {
    const hn = data.find((item) => item.value === "460000");
    expect(hn!.children!.find((item) => item.value === "469000")).toBeTruthy();

    const xj = data.find((item) => item.value === "650000");
    expect(xj!.children!.find((item) => item.value === "659000")).toBeTruthy();
  });

  it("特殊地级市", () => {
    const gd = data.find((item) => item.value === "440000");
    const gd_dg = gd!.children!.find((item) => item.value === "441900");
    const gd_zs = gd!.children!.find((item) => item.value === "442000");
    expect((gd_dg!.children || []).length).toBe(0);
    expect((gd_zs!.children || []).length).toBe(0);

    const gs = data.find((item) => item.value === "620000");
    const gs_jgg = gs!.children!.find((item) => item.value === "620200");
    expect((gs_jgg!.children || []).length).toBe(0);

    const hn = data.find((item) => item.value === "460000");
    const hn_dz = hn!.children!.find((item) => item.value === "460400");
    expect((hn_dz!.children || []).length).toBe(0);
  });
}

export default pcaFormTest;
