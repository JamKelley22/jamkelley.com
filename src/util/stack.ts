export class Stack<T> {
  items: T[];

  constructor() {
    this.items = [];
  }

  push = (element: T): T => {
    this.items.push(element);
    return element;
  };

  pop = (): T | undefined => {
    if (this.items.length === 0) throw new Error("Stack Empty");
    return this.items.pop();
  };

  peek = (): T => {
    return this.items[this.items.length - 1];
  };

  isEmpty = (): boolean => {
    return this.items.length === 0;
  };

  toStringArr = (printElementFn: (elem: T) => string): string[] => {
    return this.items.map((item: T) => printElementFn(item));
  };

  size = (): number => this.items.length;
}
