import cities from "../../data/cities.json";
import citiesTest from "../shared/citiesTest";
import definedTest from "../shared/definedTest";

describe("data/cities.json", () => {
  definedTest(cities);
  citiesTest(cities);
});
