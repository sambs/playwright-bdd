export function put<C, K extends string, O extends any>(
  key: K,
  fn: (context: C) => O
): (context: C) => Promise<{ [key in K]: Awaited<O> } & C> {
  return async (context: C) => {
    const result = await fn(context);
    const output = { [key]: result } as {
      [key in K]: Awaited<O>;
    };

    return {
      ...context,
      ...output,
    };
  };
}
