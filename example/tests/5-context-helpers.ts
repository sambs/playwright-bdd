import { expect } from "@playwright/test";
import { scenario, put } from "../../src";
import { createUser } from "../utils";

scenario("Working with context")
  .when('I create a user "one"', put("one", createUser))
  .and('I create a user "one"', put("two", createUser))
  .then("I expect user the users to have different ids", ({ one, two }) =>
    expect(one.id).not.toEqual(two.id)
  )
  .run();
