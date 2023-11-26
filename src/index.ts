import { test } from "@playwright/test";

export type StepType = "Scenario" | "Given" | "When" | "Then" | "And";
export type StepFn<I, O> = (context: I) => O;

export class Step<I, O, P> {
  private type: StepType;
  private title: string;
  private parent?: Step<P, I, any>;
  protected fn: StepFn<I, O>;

  constructor(
    type: StepType,
    title: string,
    fn: StepFn<I, O>,
    parent?: Step<P, I, any>
  ) {
    this.type = type;
    this.title = title;
    this.fn = fn;
    this.parent = parent;
  }

  given<N>(title: string, step: StepFn<O, N>): Step<O, N, I> {
    return new Step("Given", title, step, this);
  }

  when<N>(title: string, step: StepFn<O, N>): Step<O, N, I> {
    return new Step("When", title, step, this);
  }

  then<N>(title: string, step: StepFn<O, N>): Step<O, N, I> {
    return new Step("Then", title, step, this);
  }

  and<N>(title: string, step: StepFn<O, N>): Step<O, N, I> {
    return new Step("And", title, step, this);
  }

  run(children?: Array<Step<any, any, any>>) {
    if (this.parent) {
      this.parent.run(children ? [this, ...children] : [this]);
    } else if (children) {
      test(this.title, async () => {
        let context: any;

        for (let step of children) {
          context = await test.step(`${step.type} ${step.title}`, () =>
            step.fn(context));
        }
      });
    }
  }
}

export const scenario = (title: string) =>
  new Step("Scenario", title, () => {});
