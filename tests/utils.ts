import { expect } from "@playwright/test";

export function createRandomNumber() {
  return Math.random();
}

export function addOne(x: number) {
  return x + 1;
}

export async function addOneAsync(x: number) {
  const expression = encodeURIComponent(`${x}+2`);
  const response = await fetch(`https://api.mathjs.org/v4/?expr=${expression}`);
  const text = await response.text();

  return parseInt(text);
}

export function uppercase(x: string) {
  return x.toUpperCase();
}

export function greaterThanOrEqualTo(x: number, y: number) {
  expect(x).toBeGreaterThanOrEqual(y);
}
