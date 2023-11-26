import { expect } from "@playwright/test";
import { scenario } from "../src";

function createRandomNumber() {
  return Math.random();
}

function uppercase(x: string) {
  return x.toUpperCase();
}

function greaterThanOrEqualTo(x: number, y: number) {
  expect(x).toBeGreaterThanOrEqual(y);
}

scenario("Typescript indicates errors with context")
  .when("I create a random number", createRandomNumber)
  .and("I uppercase it", uppercase)
  .then("It should be great than or equal to one", (x) =>
    greaterThanOrEqualTo(x, 1)
  )
  .run();
