import { scenario } from "../src";
import { createRandomNumber, greaterThanOrEqualTo, uppercase } from "./utils";

scenario("Typescript indicates errors with context")
  .when("I create a random number", createRandomNumber)
  .and("I uppercase it", uppercase)
  .then("It should be great than or equal to one", (x) =>
    greaterThanOrEqualTo(x, 1)
  )
  .run();
