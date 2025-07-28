import data from "../../data/data.json";
import dataTest from "../shared/dataTest";
import definedTest from "../shared/definedTest";

describe("data/data.json", () => {
  definedTest(data);
  dataTest(data);
});
