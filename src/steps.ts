import { test } from "@playwright/test";

export type StepType = "Scenario" | "Given" | "When" | "Then" | "And";
export type StepFn<I, O> = (context: I) => O;

export class Step<C> {
  private type: StepType;
  private title: string;
  private parent?: Step<C>;
  protected fn: StepFn<any, C>;

  constructor(
    type: StepType,
    title: string,
    fn: StepFn<any, C>,
    parent?: Step<any>
  ) {
    this.type = type;
    this.title = title;
    this.fn = fn;
    this.parent = parent;
  }

  given<N>(title: string, step: StepFn<Awaited<C>, N>): Step<N> {
    return new Step("Given", title, step, this);
  }

  when<N>(title: string, step: StepFn<Awaited<C>, N>): Step<N> {
    return new Step("When", title, step, this);
  }

  then<N>(title: string, step: StepFn<Awaited<C>, N>): Step<N> {
    return new Step("Then", title, step, this);
  }

  and<N>(title: string, step: StepFn<Awaited<C>, N>): Step<N> {
    return new Step("And", title, step, this);
  }

  run(children?: Array<Step<any>>) {
    if (this.parent) {
      this.parent.run(children ? [this, ...children] : [this]);
    } else if (children) {
      test(this.title, async () => {
        let context: any;

        for (let step of children) {
          context = await test.step(`${step.type} ${step.title}`, async () =>
            step.fn(context));
        }
      });
    }
  }
}

export const scenario = (title: string) =>
  new Step("Scenario", title, () => {});
