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

// 7. any
// The any type is a powerful way to describe types, but rather don't use it, because
// it is too broad and it will disable type checking of typescript.
let notSure: any = 4; // number
notSure = "hello"; // here the type inference will automatically put the variable into a string type
notSure = { color: "blue" }; // now it is an object

// 8. Void
// The void type is used for functions that do not return a value
function warnUser() {
  console.log("This function does not return a value");
  // return 42; // this will cause a compiler error, because we can't return anything from the void function
}

// Explanation: The void type is commonly used for functions that perform
// an action but do not return a value. For example, a function that logs a message to the console

// 9. null und undefined
// TypeScript has two special types: null and undefined.
// They have their respective values: null = null and undefined = undefined.
// The null type is used to represent the absence of a value
// while the undefined type is used to represent a variable that has not been assigned a value.
let u1: undefined = undefined; // Explicitly setting the undefined
let u2: null = null; // Explicitly setting the null
// u1 = null; // a undefine variable can not assigne a null value
// u2 = undefined; // an undefined variable can not assigne a null value
let canBeNullOrUndefiend: string | null | undefined = "hello";
canBeNullOrUndefiend = null; // canBeNullOrUndefiend is now null
canBeNullOrUndefiend = undefined; // canBeNullOrUndefiend is now undefined

// 10. Objects
// the object type represents any non-primitive type.
// that means it's neither a string, number, boolean, symbol, nor null or undefined.
let obj: {} = { name: "John" };
let obj2: object = { surname: "Doe" };
// let obj3: { name: string; age: number } = { name: "John", age: 25, surname: "Doe" }; // this is not possible, because surname doesn't exist
let obj4: { name: string; age: number } = { name: "John", age: 25 };

// 11. Union Types
// Union types allow you to combine multiple types into a single type.
// A variable with a union type can hold a value of any of the types specified in the union.
let id: number | string;
id = 101; // id is now a number
id = "asd293-asd92-asd"; // id is now a string

// Union types are a powerful way to combine multiple types into a single type.
// For example, in a web form, the input can be either a string or a number
// TypeScript will enforce that the value assignied to a union type mathers one of the types in the union
