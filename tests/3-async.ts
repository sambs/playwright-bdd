import { expect } from "@playwright/test";
import { scenario } from "../src";

function createRandomNumber() {
  return Math.random();
}

async function addOne(x: number) {
  const expression = encodeURIComponent(`${x}+2`);
  const response = await fetch(`https://api.mathjs.org/v4/?expr=${expression}`);
  const text = await response.text();

  return parseInt(text);
}

function greaterThanOrEqualTo(x: number, y: number) {
  expect(x).toBeGreaterThanOrEqual(y);
}

scenario("Promises are unwrapped")
  .when("I create a random number", createRandomNumber)
  .and("I add one to it", addOne)
  .then("It should be great than or equal to one", (x) =>
    greaterThanOrEqualTo(x, 1)
  )
  .run();
