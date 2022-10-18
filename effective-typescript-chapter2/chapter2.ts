// Item 6: Use Your Editor to Interrogate the Explore the Type System

let num: number = 10;
function add(a: number, b: number) {
  return a + b;
}
function logMessage(message: string | null) {
  if (message) {
    message;
  }
}
const foo = {
  x: [1, 2, 3],
  bar: {
    name: "Fred",
  },
};


// Item 7: Think of Types as Sets of Values

type A = "A";
type B = "B";
type Twelve = 12;

// Union unit types
type AB = "A" | "B";
type AB12 = "A" | "B" | 12;

const a: AB = "A"; // OK, value 'A' is a member of the set {'A', 'B'}
// const c: AB = 'C'; Type 'C' is not assignable to type 'AB'

const ab: AB = Math.random() < 0.5 ? "A" : "B";
const ab12: AB12 = ab; // OK, {"A", "B"} is a subset of {"A", "B", 12}

declare let twelve: AB12;
// const back: AB = twelve; // Type '12' is not assignable to type 'AB'

interface Identified {
  id: string;
}
const identified: Identified = {
  id: "identified",
};
interface Person {
  firstName: string;
  lastName: string;
}
interface Lifespan {
  birth: Date;
  death?: Date;
}
type PersonSpan = Person & Lifespan;

const p: Person = {
  firstName: "Danny",
  lastName: "Phongsouthy",
};

const ps: PersonSpan = {
  firstName: "Alan",
  lastName: "Turing",
  birth: new Date("1912/06/23"),
  death: new Date("1954/06/07"),
}; // OK
console.log(ps.firstName + " " + "Birth " + ps.birth + "Death " + ps.death);


interface Vector1D {
  x: number;
}
interface Vector2D extends Vector1D {
  y: number;
}
interface Vector3D extends Vector2D {
  z: number;
}

function getKey<K extends string>(val: any, key: K) {}
getKey({}, "x"); // OK, 'x' extends string
getKey({}, Math.random() < 0.5 ? "a" : "b"); // OK, 'a'|'b' extends string
// getKey({}, 12); Type '12' is not assignable to a parameter of type 'string'

interface Point {
  x: number;
  y: number;
}
type PointKeys = keyof Point; // Type is "x"|"y"

function sortBy<K extends keyof T, T>(vals: T[], key: K) {
  // ...
}
const pts: Point[] = [
  { x: 1, y: 1 },
  { x: 2, y: 0 },
];
sortBy(pts, "x"); // OK, 'x' extends 'x'|'y' (aka keyof T)

type NonZeroNums = Exclude<number, 0>;
let ten: NonZeroNums = 10;
let zero: NonZeroNums = 0;

type tupleExample = [number, string, number];

let tupleExample1: tupleExample[] = [
  [1, "scoop", 1],
  [2, "bloop", 2],
];

console.log(tupleExample1[0] + " || " + tupleExample1[1]);


// Item 8: Know How to Tell Whether a Symbol Is in the Type Space or Value Space


interface Cylinder {
  radius: number;
  height: number;
}

class Cylinder {
  radius = 1;
  height = 1;
}

function calculateVolume(shape: unknown) {
  if (shape instanceof Cylinder) {
    shape; // OK, type is Cylinder
    shape.radius; // OK, type is number
  }
}

type T1 = typeof p; // Type is Person
type T2 = typeof ps; // Type is Person & Lifespan
const v1 = typeof p; // Value is "object"
const v2 = typeof calculateVolume; // Value is "function"


// Item 9: Prefer Type Declarations to Type Assertions


type regularPerson = {
  name: string;
};

// Type is Person. This is Type Declaration. This is more preferred
const alice: regularPerson = { name: "Alice" };

// Type is Person. This is Type Assertion
const bob = { name: "Bob" } as regularPerson;

// Type Assertion will silence errors by telling the type checker that, for whatever reason, you know better than it does.

// Example of how to do Type Declaration on a function
const people = ["alice", "bob", "jan"].map((name): regularPerson => ({ name }));

// Another Example of Type Declaration
const people1: regularPerson[] = ["alice", "bob", "jan"].map((name): regularPerson => ({ name }));



// Item11: Recognize the Limits of Excess Property Checking

interface Room {
  numDoors: number;
  ceilingHeightFt: number;
}

const obj = {
  numDoors: 1,
  ceilingHeightFt: 10,
  elephant: "present",
};
const r: Room = obj; // OK

interface Options {
  title: string;
  darkMode?: boolean;
}
function createWindow(options: Options) {
  if (options.darkMode) {
    setDarkMode();
  }
  // ...
}
function setDarkMode(): boolean {
  let darkMode: boolean = true;
  return darkMode;
}
createWindow({
  title: "Spider Solitaire",
  darkMode: true,
});

const o: Options = { darkMode: true, title: "Ski Free" };

const o1: Options = { darkmode: true, title: "Ski Free" } as Options; // OK


interface Options2 {
  darkMode?: boolean;
  [otherOptions: string]: unknown;
}
const o2: Options2 = { darkmode: true }; // OK



// Item12: Apply Types to Entire Function Expressions When Possible


function rollDice1(sides: number): number {
  /* ... */
  return 1;
} // Statement
const rollDice2 = function (sides: number): number {
  /* ... */
  return 2;
}; // Expression
const rollDice3 = (sides: number): number => {
  /* ... */
  return 3;
}; // Also Expression



type DiceRollFn = (sides: number) => number;
const rollDice: DiceRollFn = (sides) => {
  /* ... */
  return 4;
};

// As statement you would need to declare each variable type each time
function add1(a: number, b: number) {
  return a + b;
}
function sub1(a: number, b: number) {
  return a - b;
}
function mul1(a: number, b: number) {
  return a * b;
}
function div1(a: number, b: number) {
  return a / b;
}

// But as an expression you would just need to do it once
type BinaryFn = (a: number, b: number) => number;
const add2: BinaryFn = (a, b) => a + b;
const sub2: BinaryFn = (a, b) => a - b;
const mul2: BinaryFn = (a, b) => a * b;
const div2: BinaryFn = (a, b) => a / b;

console.log(add2(1, 2)); // 3
console.log(sub2(2, 1)); // 1
console.log(mul2(2, 2)); // 4



// Item13: Know the Differences Between type and interface


// If you want to defined a named type in TypeScript there are two options
type TState = {
  name: string;
  capital: string;
};

interface IState {
  name: string;
  capital: string;
}

// You could also use a class, but that is a JavaScript runtime concept that also introduces a value

// You can use index signature with both interface and type
type TDict = { [key: string]: string };
interface IDict {
  [key: string]: string;
}

// You can also define function types with either
type TFn = (x: number) => string;
interface IFn {
  (x: number): string;
}

const toStrT: TFn = (x) => "" + x; // OK
const toStrI: IFn = (x) => "" + x; // OK

type TFnWithProperties = {
  (x: number): number;
  prop: string;
};
interface IFnWithProperties {
  (x: number): number;
  prop: string;
}

// Both type and interfaces can be generic
type TPair<T> = {
  first: T;
  second: T;
};
interface IPair<T> {
  first: T;
  second: T;
}
let tpair: TPair<number> = { first: 1, second: 2 };
let ipair: IPair<string> = { first: "1", second: "2" };

// Interface can extend a type, and a type can extend an interface
interface IStateWithPop extends TState {
  population: number;
}
type TStateWithPop = IState & { population: number };

// The caveat between these two is that an Interface cannot extend a complex type like a union type. If you want to do that, you'll need to use type and &

// Class can also implement either an interface or a simple type:
class StateT implements TState {
  name: string = "";
  capital: string = "";
}
class StateI implements IState {
  name: string = "";
  capital: string = "";
  population: number = 0;
}

// Now the differences first start with union types, there are no union interfaces
type AorB = "a" | "b";

// If you have separate types for Input and Output variables and a mapping from name to variable
type Input = {
  /* ... */
};
type Output = {
  /* ... */
};
interface VariableMap {
  [name: string]: Input | Output;
}
// then you might want a type that attaches the name to the variable
type NamedVariable = (Input | Output) & { name: string };


type Pair = [number, number];
type StringList = string[];
type NamedNums = [string, ...number[]];

let pair: Pair = [1, 2];
let stringList: StringList = ["1", "2", "3", "4", "5"];
let namedNums = ["Named Numbers", 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
let namedNums1 = ["Named Numbers", [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]];

// You can express something like a tuple using interface:
interface Tuple {
  0: number;
  1: number;
  length: 2;
}
const t: Tuple = [10, 20]; // OK
// But this is not ideal as it drops all the tuple methods like concat
// So its better to use a type

// Interface can be augmented
interface IState {
  name: string;
  capital: string;
}
interface IState {
  population: number;
}
const wyoming: IState = {
  name: "Wyoming",
  capital: "Cheyenne",
  population: 500_000,
}; // OK
// This is otherwise known as "declaration merging"


// Item14: Use Type Operations and Generics to Avoid Repeating Yourself


function distance(a: { x: number; y: number }, b: { x: number; y: number }) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}
// create a name for the type and use that
interface Point2D {
  x: number;
  y: number;
}
function distance1(a: Point2D, b: Point2D) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}



interface Person {
  firstName: string;
  lastName: string;
}

// Instead of this
// interface PersonWithBirthDate {
//     firstName: string;
//     lastName: string;
//     birth: Date;
// }
// you can use:
interface PersonWithBirthDate extends Person {
  birth: Date;
}

// You can also use the & operator with types though this is less common
type PersonWithBirthDate1 = Person & { birth: Date };

interface State {
  userID: string;
  pageTitle: string;
  recentFiles: string[];
  pageContents: string;
}


// Although this is progress you can do better by using a mapped type
// type Pick<T, K> = { [k in K]: T[k] };
type TopNavState = Pick<State, "userID" | "pageTitle" | "recentFiles">;




interface SaveAction {
  type: "save";
  // ...
}
interface LoadAction {
  type: "load";
  // ...
}
type Action = SaveAction | LoadAction;
// type ActionType = 'save' | 'load'; // Repeated types!

type ActionType = Action["type"]; // Type is "save" | "load"
type ActionRec = Pick<Action, "type">; // {type: "save" | "load"}


interface OptionsArg {
  width: number;
  height: number;
  color: string;
  label: string;
}

class UIWidget {
  constructor(init: OptionsArg) {
    /* ... */
  }
 
  update(options: Partial<OptionsArg>) {
    /* ... */
  }
}

type OptionsUpdate = { [k in keyof OptionsArg]?: OptionsArg[k] };


type OptionsKeys = keyof Options;



const INIT_OPTIONS = {
  width: 640,
  height: 480,
  color: "#00FF00",
  label: "VGA",
};
interface Other_Options {
  width: number;
  height: number;
  color: string;
  label: string;
}

type TOther_Options = typeof INIT_OPTIONS;

