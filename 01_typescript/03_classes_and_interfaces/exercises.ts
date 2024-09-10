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
interface UserInfo {
  username: string;
  email: string;
  login: () => void;
  logout: () => void;
}

// Define the Admin interface that extends User
interface Admin extends UserInfo {
  deleteUser(username: string): void;
}

// Implement the Admin interface in a class
// like class SuperAdmin implements Admin {}
class SuperAdmin implements Admin {
  username: string;
  email: string;

  constructor(username: string, email: string) {
    this.username = username;
    this.email = email;
  }

  login(): void {
    console.log(`${this.username} has logged in.`);
  }

  logout(): void {
    console.log(`${this.username} has logged out.`);
  }

  deleteUser(username: string): void {
    console.log(`${username} has been deleted.`);
  }
}

// Example usage
const admin = new SuperAdmin("admin1", "admin@example.com");
admin.login(); // Output: admin1 has logged in.
admin.logout(); // Output: admin1 has logged out.
admin.deleteUser("user123"); // User user123 has been deleted.

/**
 * Now, let's try to do the same thing with `type`.
 */

// Define the User type
type UserType = { username: string; email: string; login: () => void; logout: () => void };

// Attempt to define Admin type extending UserType (This is not allowed in TypeScript)
// type AdminType extends UserType = {} this will throw an error, because you can not extend a type
type AdminType = UserType & {
  deleteUser(username: string): void;
};

// Example of an omit
interface UserDetails {
  name: string;
  surname: string;
  age: number;
  email: string;
  phone: string;
}

type User = Omit<UserDetails, "phone">;
// User has now everything except phone

/**
 * Explanation:
 * - In TypeScript, interfaces can be extended using the `extends` keyword, allowing you to build on existing structures.
 * - Types cannot be extended in the same way, though you can use intersection types (`&`) to combine types, this is not the same as extending.
 * - Interfaces are more suited for defining contracts and extending them, whereas types are better for defining data structures or unions of types.
 */
