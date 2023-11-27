import { expect } from "@playwright/test";
import { scenario } from "../../src";
import { addOneAsync, createRandomNumber } from "../utils";

scenario("Promises are unwrapped")
  .when("I create a random number", createRandomNumber)
  .and("I add one to it", addOneAsync)
  .then("It should be great than or equal to one", (x) =>
    expect(x).toBeGreaterThanOrEqual(1)
  )
  .run();
