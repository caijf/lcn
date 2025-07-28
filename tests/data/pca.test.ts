import pca from "../../data/pca.json";
import pcaTest from "../shared/pcaTest";
import definedTest from "../shared/definedTest";

describe("data/pc.json", () => {
  definedTest(pca);
  pcaTest(pca);
});
