// 1. Classes
// Classes are blueprints for creating objects.
// They encapsulate data (properties) and behaviors (methods) into a single entity.

class Animal {
  // Public property can be accessed from anywhere, even outside the class
  public name: string;

  // Private property can only be accessed from within the class
  private age: number;

  // Readonly property can only be assigned once during the initialization
  readonly species: string;

  // The constructor is a special method that is automaticalled called when
  // a new instance of the class is created.
  // it is used to initialize the properties of the class with values provided as arguments
  constructor(name: string, age: number, species: string) {
    // .this refers to the current instance of the class
    // this.name refers to the name property of the isntance being created
    this.name = name;
    this.age = age;
    this.species = species;
  }

  // public method that can be accessed from anywhere
  public getDetails(): string {
    return `Name: ${this.name}, Age: ${this.age}, Species: ${this.species}`;
  }

  // private method that can only be accessed from within the class
  private getAge(): number {
    return this.age;
  }

  // example of a method using 'this'
  public birthday(): void {
    console.log(`Happy birthday, ${this.name}!`);
    // we can access the private proprety age here because this method is inside the class
    this.age += 1;
  }
}

// usage
let myPet = new Animal("Buddy", 5, "Dog");
console.log(myPet.getDetails()); // Output: Name: Buddy, Age: 5, Species: Dog
// console.log(myPet.getAge());  this will not work, because the method is private and we are not inside the class

// 2. Types
// A type is a way to define a custom type in TypeScript.
// It can represent basic types, complex objects, or even union and intersections

type Point = {
  x: number;
  y: number;
  label?: string; // with the optional property operator "?", we can make a property optional
};

type Rectangle = {
  width: number;
  height: number;
  color?: string; // with the optional property operator "?", we can make a property optional
};

// An intersection of types is a type that represents the common properties of two or more types.
type Shape = Point & Rectangle;

// Usage
const myPoint: Point = { x: 10, y: 20 };
const myRectangle: Rectangle = { width: 10, height: 20, color: "red" };
const myShape: Shape = { x: 10, y: 20, width: 10, height: 20, label: "shape", color: "blue" };

// 3. Interfaces
// Interfaces are used to define contracts for classes and objects.
// They describe the shape of an object and look like types
interface Employee {
  employeeId: number;
  position: string;
  salary: number;
}

interface Person {
  name: string;
  surname: string;
  age: number;
}

// here we extend the EmployeeDetails interface with the Person and Employee interface
// This means, that the EmployeeDetails interface will have all the properties of the Person and Employee interfaces
// an on top of that it will also have the email property
interface EmployeeDetails extends Employee, Person {
  email: string;
}

// Explanation:
// You can actually always use interface instead of types, because with types you will be limitred
// to the properties of the type, but with interfaces you can extend them with other interfaces and types
// as well as adding and ignoring properties
