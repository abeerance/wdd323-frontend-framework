"use strict";
/*
    TypeScript is a statically typed language built on top of JavaScript (superset)
    This means you define the type of variables, function parameters, etc.
*/
// 1. Boolean
// boolean type rrepresents a true/false value
let isDone1 = true; // boolean is true
let isPending = false; // boolean is false
let hasCompleted = !!1; // !! forces a value to be of type boolean => converts to boolean => boolean is true
// 2. Number
// the number type is used for both integers and floating point numbers
let decimal = 6.5;
let hex = 0xff;
let largeNumber = 1000000000; // large numbers with underscore to increase readability
// 3. Strings
// string type is used for representing text
let color1 = "blue";
let fullname = "John Doe";
let sentence = `Hello, my name is ${fullname} and I am ${decimal} years old`; // template strings
// 4. Arrays
// The array tyoe is a collection of values of a single type
// Arrays can be declared using the `tyep[]` syntax or the `Array<type>` syntax
// Both declarations are functionally equivalent
let list1 = [1, 2, 3, 4, 5, 6, 7, 8];
let list2 = ["one", "two", "three", "appple", "orange"];
let list3 = [true, false, true, false, true]; // Another way to define an array
// 5. Tuple
// A tuple type allows you to express an array with a fixed number of elements
// where each element may have a different type
let tuple1 = ["hello", 10];
let tuple2 = [1, "world", true];
// 6. Enum
// Enums are a way of giving more friendly names to sets of numeric values
var Color;
(function (Color) {
    Color["RED"] = "red";
    Color["GREEN"] = "green";
    Color["BLUE"] = "blue";
})(Color || (Color = {}));
let c1 = Color.RED; // c1 is now a Color.RED with the value of "red"
let c2 = Color.BLUE; // c2 is now a Color.BLUE with the value of "blue"
let colorName = Color.GREEN; // colorName is now a string with the value of "green"
// Enums allow you to define a set of named constants
// by default, enums are numeric, starting at 0, but you can assign different values to each constant
