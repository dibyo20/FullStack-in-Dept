// let age = 20;
// age = "Twenty";
// age = true;

// console.log(age);

function calculateTotal(price, quantity) {
  return price * quantity;
}

console.log(calculateTotal(10, 5)); //50
console.log(calculateTotal("hello", 5)); //NaN


function createUser(name, age, email) {
  return {
    name,
    age,
    email,
  }
}

const user = createUser("John", 20, "john@example.com");
console.log(user);