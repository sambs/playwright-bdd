import { expect } from "@playwright/test";
import { scenario } from "../../src";
import { addOne, createRandomNumber } from "../utils";

scenario("Testing some basic numbers")
  .when("I create a random number", createRandomNumber)
  .and("I add one to it", addOne)
  .then("It should be great than or equal to one", (x) =>
    expect(x).toBeGreaterThanOrEqual(1)
  )
  .run();
