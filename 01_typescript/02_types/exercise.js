"use strict";
// BASIC TYPE ASSIGNMENTS (EASY)
// 1. Create a boolean variable called `isActive` and set it to `true`.
let isActive = true;
// 2. Create a number variable called `age` and set it to `25`.
let age = 25;
// 3. Create a string variable called `username` and set it to `"JohnDoe"`.
let username = "JohnDoe";
// 4. Create an array of numbers called `scores` containing [85, 90, 78].
let scores = [85, 90, 78];
// 5. Create a tuple called `user` containing a string and a number, e.g., `["JohnDoe", 25]`.
let user = [username, age];
// CREATING AND USING ENUMS (EASY TO MEDIUM)
// 6. Define an enum called `Day` representing the days of the week.
var Day;
(function (Day) {
    Day[Day["Monday"] = 0] = "Monday";
    Day[Day["Tuesday"] = 1] = "Tuesday";
    Day[Day["Wednesday"] = 2] = "Wednesday";
    Day[Day["Thursday"] = 3] = "Thursday";
    Day[Day["Friday"] = 4] = "Friday";
    Day[Day["Saturday"] = 5] = "Saturday";
    Day[Day["Sunday"] = 6] = "Sunday";
})(Day || (Day = {}));
// 7. Create a function called `isWeekend` that accepts a `Day` and returns a boolean indicating if it’s a weekend.
function isWeekend(day) {
    if (day === Day.Saturday || day === Day.Sunday) {
        return true;
    }
    return false;
}
// 8. Test the function with different days of the week.
console.log(isWeekend(Day.Monday)); // Output: false
console.log(isWeekend(Day.Saturday)); // Output: It's the weekend!
/*
Creating a Complex Object (Medium)

Create an object type called Library that contains the following properties:

    •    name (string): The name of the library.
    •    location (string): The location of the library.
    •    books (array of objects): Each object in the array should represent a book and contain:
    •    title (string)
    •    author (string)
    •    isAvailable (boolean)

Then, create a variable of type Library and initialize it with appropriate values. Finally, create a function isBookAvailable that takes the library object and a book title as parameters and returns a boolean indicating if the book is available.

Hint: Use array methods to search for the book title within the books array.
*/
