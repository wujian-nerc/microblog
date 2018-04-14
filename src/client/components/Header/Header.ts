type Alias = { num: number };
interface Interface {
  num: number;
}
declare function aliased (arg: Alias): Alias;
declare function interfaced (arg: Interface): Interface;

type Easing = 'ease-in' | 'ease-out' | 'ease-in-out';
class UIElement {
  animate (dx: number, dy: number, easing: Easing) {
    if (easing === 'ease-in') {
      // ...
    } else if (easing === 'ease-out') {
      // ...
    } else if (easing === 'ease-in-out') {
      // ...
    } else {
      // 
    }
  }
}

let button = new UIElement();
button.animate(0, 0, 'ease-in');
// button.animate(0, 0, 'uneasy');

function createElement (tagName: 'img'): HTMLImageElement;
function createElement (tagName: 'input'): HTMLInputElement;
function createElement (tagName: string): Element {
  // 
}

function foo (x: number) {
  if (x !== 1 || x !== 2) {

  }
}

interface Square {
  kind: 'square';
  size: number;
};
interface Rectangle {
  kind: 'rectangle';
  with: number;
  height: number;
}
interface Circle {
  kind: 'circle';
  radius: number;
}
interface Triangle {
  kind: 'triangle';
  base: number;
  height: number;
}

type Shape = Square | Rectangle | Circle | Triangle;

function assertNever (x: never): never {
  throw new Error('Unexpected object: ' + x);
}
function area (shape: Shape): number {
  switch(shape.kind) {
    case 'square': return shape.size * shape.size;
    case 'rectangle': return shape.with * shape.height;
    case 'circle': return Math.PI * shape.radius ** 2;
    default: return assertNever(shape);
  }
}

class BasicCalculator {
  public constructor (protected value: number = 0) {}
  public currentValue () {
    return this.value;
  }
  public add (operand: number): this {
    this.value += operand;
    return this;
  }
  public multiply (operand: number): this {
    this.value *= operand;
    return this;
  }
}

let v1 = new BasicCalculator(2)
            .multiply(5)
            .add(1)
            .currentValue();

class ScientificCalculator extends BasicCalculator {
  public constructor(value=0) {
    super(value);
  }
  public sin () {
    this.value = Math.sin(this.value);
    return this;
  }
}

let v2 = new ScientificCalculator(2)
            .multiply(5)
            .sin()
            .add(1)
            .currentValue();

interface MyMap<T> {
  [key: string]: T;
}
let keys: keyof MyMap<number>;
let value: MyMap<number>['foo'];

interface PersonPartial1 {
  name?: string;
  age?: number;
}

interface PersonReadonly1 {
  readonly name: string;
  readonly age: number;
}

type MyReadonly<T> = {
  readonly [P in keyof T]: T[P];
}

type MyPartial<T> = {
  [P in keyof T]?: T[P];
}

type Nullable<T> = {
  [P in keyof T]: T[P] | null;
}

interface Person {
  name: string;
  age: number;
}

type PersonPartial2 = MyPartial<Person>;
type PersonReadonly2 = MyReadonly<Person>;