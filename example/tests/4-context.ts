import { expect } from "@playwright/test";
import { scenario } from "../../src";
import { createUser } from "../utils";

scenario("Working with context")
  .when('I create a user "one"', () =>
    createUser().then((user) => ({ one: user }))
  )
  .when('I create another user "two"', ({ one }) =>
    createUser().then((user) => ({ one, two: user }))
  )
  .then("I expect user the users to have different ids", ({ one, two }) =>
    expect(one.id).not.toEqual(two.id)
  )
  .run();
