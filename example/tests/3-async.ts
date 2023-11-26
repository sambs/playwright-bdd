import { scenario } from "../../src";
import {
  addOneAsync,
  createRandomNumber,
  greaterThanOrEqualTo,
} from "../utils";

scenario("Promises are unwrapped")
  .when("I create a random number", createRandomNumber)
  .and("I add one to it", addOneAsync)
  .then("It should be great than or equal to one", (x) =>
    greaterThanOrEqualTo(x, 1)
  )
  .run();
