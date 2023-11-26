import { expect } from "@playwright/test";
import { scenario } from "../src";

function createRandomNumber() {
  return Math.random();
}

function addOne(x: number) {
  return x + 1;
}

function uppercase(x: string) {
  return x.toUpperCase();
}

function greaterThanOrEqualTo(x: number, y: number) {
  expect(x).toBeGreaterThanOrEqual(y);
}

scenario("Testing some basic numbers")
  .when("I create a random number", createRandomNumber)
  .and("I add one to it", addOne)
  // .and("I uppercase it", uppercase)
  .then("It should be great than or equal to one", (x) =>
    greaterThanOrEqualTo(x, 1)
  )
  .run();
