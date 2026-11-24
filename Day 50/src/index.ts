let message: string = "Hello, TypeScript!";
message = "Hello JS";
// console.log(message);

let scores: Array<Number> = [80, 90, 10];

let empty: null = null;
let notAssigned: undefined = undefined;

// Dont need to write types everywhere
let city = "Kolkata";
let marks = 90;
let isActive = true;

let data: any = 100;
data = "Hello";
data = true;

let greet: unknown = "Hello";
// if (typeof greet === "string") {
//     console.log(greet.toUpperCase());
// }

let userId: number | string;

userId = 101;
userId = "User";
// userId = true;

function throwError(message: string): never {
  throw new Error(message);
}
// throwError("Hello");

function intro(name: string, age?: number): void {
  console.log(name);
  if (age !== undefined) {
    console.log(age);
  }
}

// intro("Ramiz", 20);
// intro("Ramiz")

type User = {
  readonly id: number;
  name: string;
  isActive: boolean;
};

const user1: User = {
  id: 1,
  name: "Ramiz",
  isActive: true,
};

interface Product {
  readonly id: number;
  name: string;
}

const product: Product = {
  id: 101,
  name: "Keyboard",
};

product.name = "Hello";
// product.id = 10;

enum orderstatus {
  pending,
  shipped,
}

enum Role {
  Admin = "ADMIN",
  Teacher = "TEACHER",
}

let status: orderstatus = orderstatus.pending;

function indentity0(value: number): number {
  return value;
}

function indentity1(value: string): string {
  return value;
}

function indentity<T>(value: T): T {
  return value;
}

const numberResult = indentity<number>(10);
const stringResult = indentity<string>("Hello");

interface User1 {
  name: string;
  age: number;
  email: string;
}

function createUser(name: string, age: number, email: string): User1 {
  return {
    name,
    age,
    email,
  };
}

const user: User1 = createUser("John", 20, "john@example.com");
// console.log(user);

interface User2 {
  id: number;
  name: string;
  age: number;
}

const users: User2[] = [
  {
    id: 1,
    name: "Ramiz",
    age: 18,
  },
  {
    id: 2,
    name: "Ramiz",
    age: 10,
  },
];

function getAdult(users: User2[]): User2[] {
  return users.filter((user) => user.age >= 18);
}
// console.log(getAdult(users));

interface Post {
  id: number;
  title: string;
  body: string;
}

async function getPosts(): Promise<Post[]> {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=5",
  );

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  const data: unknown = await response.json();

  return data as Post[];
}

getPosts()
  .then((posts) => {
    console.log(posts);
  })
  .catch((error) => {
    console.log(error);
  });
