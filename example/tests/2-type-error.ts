import { expect } from "@playwright/test";
import { scenario } from "../../src";
import { createRandomNumber, uppercase } from "../utils";

scenario("Typescript indicates errors with context")
  .when("I create a random number", createRandomNumber)
  .and("I uppercase it", uppercase)
  .then("It should be great than or equal to one", (x) =>
    expect(x).toBeGreaterThanOrEqual(1)
  )
  .run();
