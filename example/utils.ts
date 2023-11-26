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

export function createId() {
  return (Math.random() * 10 ** 10).toFixed();
}

type User = {
  id: string;
  gender: string;
  name: {
    first: string;
    last: string;
  };
};

type CreateUserResponse = {
  results: Array<Omit<User, "id">>;
};

export async function createUser(): Promise<User> {
  const response = await fetch("https://randomuser.me/api/");

  expect(response.status).toBe(200);

  const json = (await response.json()) as CreateUserResponse;

  return {
    id: createId(),
    ...json.results[0],
  };
}
