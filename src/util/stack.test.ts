import Stack from "./stack";

describe("Stack Tests", () => {
  it("Adds an item to the stack", () => {
    const stack = new Stack<number>();
    stack.push(1);
    expect(stack.peek()).toBe(1);
  });
});
