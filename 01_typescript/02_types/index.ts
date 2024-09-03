/*
    TypeScript is a statically typed language built on top of JavaScript (superset)
    This means you define the type of variables, function parameters, etc.
*/

// 1. Boolean
// boolean type rrepresents a true/false value
let isDone1: boolean = true; // boolean is true
let isPending: boolean = false; // boolean is false
let hasCompleted: boolean = !!1; // !! forces a value to be of type boolean => converts to boolean => boolean is true

// 2. Number
// the number type is used for both integers and floating point numbers
let decimal: number = 6.5;
let hex: number = 0xff;
let largeNumber: number = 1_000_000_000; // large numbers with underscore to increase readability

// 3. Strings
// string type is used for representing text
let color1: string = "blue";
let fullname: string = "John Doe";
let sentence: string = `Hello, my name is ${fullname} and I am ${decimal} years old`; // template strings

// 4. Arrays
// The array tyoe is a collection of values of a single type
// Arrays can be declared using the `tyep[]` syntax or the `Array<type>` syntax
// Both declarations are functionally equivalent
let list1: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
let list2: string[] = ["one", "two", "three", "appple", "orange"];
let list3: Array<boolean> = [true, false, true, false, true]; // Another way to define an array

// 5. Tuple
// A tuple type allows you to express an array with a fixed number of elements
// where each element may have a different type
let tuple1: [string, number] = ["hello", 10];
let tuple2: [number, string, boolean] = [1, "world", true];

// 6. Enum
// Enums are a way of giving more friendly names to sets of numeric values
enum Color {
  RED = "red",
  GREEN = "green",
  BLUE = "blue",
}
let c1: Color = Color.RED; // c1 is now a Color.RED with the value of "red"
let c2: Color = Color.BLUE; // c2 is now a Color.BLUE with the value of "blue"
let colorName: string = Color.GREEN; // colorName is now a string with the value of "green"
// Enums allow you to define a set of named constants
// by default, enums are numeric, starting at 0, but you can assign different values to each constant
