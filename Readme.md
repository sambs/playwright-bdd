# Playwright BDD

A lightweight wrapper for [Playwright](https://playwright.dev/) facilitating BDD style testing.

## Goals

- Make specs as readable as possible by encouraging minimal code within test files.
- Avoid breaking Typescript support.

## Implementation

Specs are written using a chaninable syntax. A step consists of a description and implementing function that receives the return value of the previous step. This is known as the test context and the Playwright BDD wrapper maintains type safety of the context between steps.

## Example

```typescript
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
```

## Tradeoffs

- It is not possible to pass test values from a step description due to the requirement of maintaining type safety.
- The final `.run()` call is a little awkward and could potentially be forgotten. However it necessary to accommodate async step functions.
