/*
  Exercise 3: Demonstrating the Use of Interfaces and Limitations of Types

  Create a User interface with the following properties and methods:

      •	Properties:
      •	username: The username of the user.
      •	email: The email address of the user.
      •	Methods:
      •	login(): Prints a message that the user has logged in.
      •	logout(): Prints a message that the user has logged out.

  Create another interface Admin that extends User and adds a method deleteUser(username: string): which prints a message that a user has been deleted.

  Attempt to create the same structure using type, and explain why you can’t extend type like you can extend an interface.
  */

// Define the User interface

// Define the Admin interface that extends User

// Implement the Admin interface in a class
// like class SuperAdmin implements Admin {}

// Example usage

/**
 * Now, let's try to do the same thing with `type`.
 */

// Define the User type

// Attempt to define Admin type extending UserType (This is not allowed in TypeScript)
// type AdminType = UserType & {
//   deleteUser(username: string): void;
// };

/**
 * Explanation:
 * - In TypeScript, interfaces can be extended using the `extends` keyword, allowing you to build on existing structures.
 * - Types cannot be extended in the same way, though you can use intersection types (`&`) to combine types, this is not the same as extending.
 * - Interfaces are more suited for defining contracts and extending them, whereas types are better for defining data structures or unions of types.
 */
