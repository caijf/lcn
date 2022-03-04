import { data, getPC, getPCA, splitPCA, parseAreaCode } from "../src";
import areasTest from "./shared/areasTest";
import citiesTest from "./shared/citiesTest";
import ProvincesTest from "./shared/provincesTest";
import dataTest from "./shared/dataTest";
import pcTest from "./shared/pcTest";
import pcFormTest from "./shared/pcFormTest";
import pcaTest from "./shared/pcaTest";
import pcaFormTest from "./shared/pcaFormTest";
import inlandTest from "./shared/inlandTest";
import inlandFormTest from "./shared/inlandFormTest";

import dataJson from "../data/data.json";
import areasJson from "../data/areas.json";
import citiesJson from "../data/cities.json";
import provincesJson from "../data/provinces.json";
import pcJson from "../data/pc.json";
import pcaJson from "../data/pca.json";

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
  const pcaAreas = [];
  pcaJson.forEach((item) => {
    if (item?.children) {
      item.children.forEach((subItem) => {
        if (subItem?.children) {
          pcaAreas.push(...subItem?.children);
        }
      });
    }
  });

  const diffAreas = [];

  areasJson.forEach((item) => {
    if (!pcaAreas.find((pcaItem) => pcaItem.code === item.code)) {
      diffAreas.push(item);
    }
  });

  console.log(diffAreas);
}

describe("module", () => {
  describe("data", () => {
    dataTest(data);

    it("equal data/data.json", () => {
      expect(data).toEqual(dataJson);

      // 测试级联数据数量
      const pcaLen = countCascadeDataLength(pcaJson);
      expect(pcaLen).toEqual(
        provincesJson.length + citiesJson.length + areasJson.length
      );

      // 测试级联数据数量
      const pcLen = countCascadeDataLength(pcJson);
      expect(pcLen).toEqual(provincesJson.length + citiesJson.length);
    });
  });

  describe("areas", () => {
    areasTest(areas);

    it("equal data/areas.json", () => {
      expect(areas).toEqual(areasJson);
    });
  });

  describe("cities", () => {
    citiesTest(cities);

    it("equal data/cities.json", () => {
      expect(cities).toEqual(citiesJson);
    });
  });

  describe("provinces", () => {
    ProvincesTest(provinces);

    it("equal data/provinces.json", () => {
      expect(provinces).toEqual(provincesJson);
    });
  });

  describe("getPC", () => {
    const pc = getPC();
    pcTest(pc);

    it("equal data/pc.json", () => {
      expect(pc).toEqual(pcJson);
    });

    const pcForm = getPC({ fieldNames: { code: "value", name: "label" } });
    pcFormTest(pcForm);
  });

  describe("getPC inland", () => {
    const pcInland = getPC({ inland: true });
    pcTest(pcInland);
    inlandTest(pcInland);

    const pcInlandForm = getPC({
      inland: true,
      fieldNames: { code: "value", name: "label" },
    });
    pcFormTest(pcInlandForm);
    inlandFormTest(pcInlandForm);
  });

  describe("getPCA", () => {
    const pca = getPCA();
    pcaTest(pca);

    it("equal data/pca.json", () => {
      expect(pca).toEqual(pcaJson);
    });

    const pcaForm = getPCA({ fieldNames: { code: "value", name: "label" } });
    pcaFormTest(pcaForm);
  });

  describe("getPCA inland", () => {
    const pca = getPCA({ inland: true });
    pcaTest(pca);
    inlandTest(pca);

    const pcaForm = getPCA({
      inland: true,
      fieldNames: { code: "value", name: "label" },
    });
    pcaFormTest(pcaForm);
    inlandFormTest(pcaForm);
  });

  describe("parseAreaCode", () => {
    it("success", () => {
      const parseAreas = parseAreaCode("410102");
      const results = [
        { code: "410000", name: "河南省" },
        { code: "410100", name: "郑州市" },
        { code: "410102", name: "中原区" },
      ];

      expect(parseAreas.length).toBe(3);
      expect(parseAreas[0]).toEqual(results[0]);
      expect(parseAreas[1]).toEqual(results[1]);
      expect(parseAreas[2]).toEqual(results[2]);
    });
    it("not area", () => {
      const parseAreas = parseAreaCode("410100");
      const results = [
        { code: "410000", name: "河南省" },
        { code: "410100", name: "郑州市" },
        null,
      ];

      expect(parseAreas.length).toBe(3);
      expect(parseAreas[0]).toEqual(results[0]);
      expect(parseAreas[1]).toEqual(results[1]);
      expect(parseAreas[2]).toEqual(results[2]);
    });
    it("not city", () => {
      const parseAreas = parseAreaCode("410000");
      const results = [{ code: "410000", name: "河南省" }, null, null];

      expect(parseAreas.length).toBe(3);
      expect(parseAreas[0]).toEqual(results[0]);
      expect(parseAreas[1]).toEqual(results[1]);
      expect(parseAreas[2]).toEqual(results[2]);
    });
    it("fail", () => {
      const parseAreas = parseAreaCode("100000");
      const results = [null, null, null];

      expect(parseAreas.length).toBe(3);
      expect(parseAreas[0]).toEqual(results[0]);
      expect(parseAreas[1]).toEqual(results[1]);
      expect(parseAreas[2]).toEqual(results[2]);
    });
  });
});
