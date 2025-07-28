import areas from "../../data/areas.json";
import areasTest from "../shared/areasTest";
import definedTest from "../shared/definedTest";

describe("data/areas.json", () => {
  definedTest(areas);
  areasTest(areas);
});
