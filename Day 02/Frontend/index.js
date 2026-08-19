// Q8
// for(let i=1; i<=10;i++){
//     console.log(`5 * ${i} = ${5*i}`);
// }

// Q9
// let count = 0;
// for (let i = 1; i <= 15; i++) {
//     if (i > 8) {
//         count++;
//     }
// }
// console.log(count);

// Q10
// const password = "Myname";
// let userpass = prompt("Enter your password:");
// if (userpass === null) {
//     console.log("enter your password")
// } else {
//     if (password === userpass) {
//         console.log("matched");
//     } else {
//         console.log("u entered wrong password");
//     }
// }

// Q11
// const password = "my";
// let attempts = 0;
// while (attempts < 3) {
//     let userpass = prompt("Enter your password:");
//     if (password === userpass) {
//         console.log("matched");
//         break;
//     } else {
//         console.log("u entered wrong password");
//     }
//     attempts++;
// }
// if (attempts === 3) {
//     console.log("Account locked...");
// }

// Q12
// let count = 0;
// while (true) {
//     let a = prompt("Enter a word and to stop type 'stop'");
//     if (a === "stop") {
//         break;
//     }
//     if (a === "yes") {
//         count++;
//     }
//     console.log(a);
// }
// console.log(count);

// Q13
// for (let i = 1; i <= 50; i++) {
//      if (i % 7 == 0) {
//          console.log(i);
//      }
//  }

// Q14
// let sum = 0;
// for (let i = 1; i <= 30; i++) {
//     if (i % 2 !== 0) {
//         sum += i;
//     }
// }
// console.log(sum);

// Q15
// while (true) {
//     let a = Number(prompt("Enter a Even Number to stop"));
//     if (a % 2 === 0) {
//         break;
//     }
//     console.log(a);
// }

// Q16
// let a = Number(prompt("Enter Starting num"));
// let b = Number(prompt("Enter ending num"));
// for (let i = a; i <= b; i++) {
//     console.log(i);
// }

// Q17
// let count = 0;
// for (let i = 1; i <= 20; i++) {
//     if (i % 2 !== 0) {
//         console.log(i);
//         count++;
//     }
//     if (count == 3) {
//         break;
//     }
// }

// Q18
// let i = 0;
// let count = 0;
// while (i < 5) {
//     let a = Number(prompt("Enter a number"));
//     if (a > 0) {
//         count++;
//     }
//     i++;
// }
// console.log(count);

// Q19
// let balance = 1000;
// let amt1 = Number(prompt("Enter first amount to deduct"));
// let amt2 = Number(prompt("Enter second amount to deduct"));
// let amt3 = Number(prompt("Enter third amount to deduct"));
// let withdrawAmt = amt1 + amt2 + amt3;
// if (withdrawAmt > balance) {
//     console.log("Insufficient balance");
// } else {
//     balance = balance - withdrawAmt;
//     console.log(`Your Balance after deduction: ${balance}`);
// }

// Q20
// let attempts = 1;
// while (true) {
//     let a = Number(prompt("Enter a number btw 1 t0 10 to win!"));
//     let b = Math.floor(Math.random() * 10);
//     if (a === b) {
//         console.log("You won the Game!");
//         break;
//     }
//     if (attempts === 5) {
//         console.log("You Lost the game, you have used all your attempts!");
//         break;
//     }
//     attempts++;
// }

// Q21
// while (true) {
//     let a = prompt("Choose a symbol to perform the action: +, -, *, /, exit");
//     if (a === null) {
//         break;
//     }
//     if (a === "exit") {
//         break;
//     }
//     if (a === '+') {
//         let b = Number(prompt("Enter first numbers to add"));
//         let c = Number(prompt("Enter second numbers to add"));
//         console.log(`Sum is: ${b + c}`);
//     } else if (a === '-') {
//         let b = Number(prompt("Enter first numbers to subtract"));
//         let c = Number(prompt("Enter second numbers to subtract"));
//         console.log(`Difference is: ${b - c}`);
//     } else if (a === '*') {
//         let b = Number(prompt("Enter first numbers to multilpy"));
//         let c = Number(prompt("Enter second numbers to multilpy"));
//         console.log(`Product is: ${b * c}`);
//     } else if (a === '/') {
//         let b = Number(prompt("Enter first numbers to divide"));
//         let c = Number(prompt("Enter second numbers to divide"));
//         if (c === 0) {
//             alert("please enter a valid number to divide");
//             continue;
//         }
//         console.log(`Quitent is: ${Math.floor(b / c)}`);
//     }
//     else {
//         alert("Please choose a valid option");
//     }
// }

// Q22
// let arr = [];
// for (let i = 0; i < 5; i++) {
//     let a = Number(prompt("Enter marks of 5 subjects"));
//     arr.push(a);
// }
// let total = arr.reduce((res, el) => res + el);
// let average = total / arr.length;
// console.log(`Your marks are: ${arr} and you have scored ${total} out of 500 and your average marks is ${average}`);
// if (average > 60 && average <= 70) {
//     console.log("Grade: C");
// } else if (average > 70 && average <= 80) {
//     console.log("Grade: B");
// } else if (average > 80 && average <= 90) {
//     console.log("Grade: A");
// } else if (average > 90) {
//     console.log("Grade: A+");
// } else {
//     console.log("You have been promoted!");
// }

// Q23
// let balance = 5000;
// while (true) {
//     let a = prompt("choose what u want to perfom: Check balance, Deposit, Withdraw, Exit");
//     a = a.toLowerCase();
//     if (a === "check balance") {
//         console.log(`Your available balance is: ${balance}`);
//     } else if (a === "deposit") {
//         let b = Number(prompt("Enter amount to be deposited"));
//         balance = balance + b;
//         console.log(`Your available balance after deposition of ${b} is: ${balance}`);
//     } else if (a === "withdraw") {
//         let c = Number(prompt("Enter amount to withdraw"));
//         balance = balance - c;
//         console.log(`Your available balance after withdraw of ${c} is: ${balance}`);
//     } else if (a === "exit") {
//         break;
//     } else {
//         alert("Please enter a valid option to procced");
//     }
// }

// Q24
// let a = prompt("Enter a word");
// a = a.toLowerCase();
// let i = 0;
// let count = 0;
// while (i < a.length) {
//     let ch = a.charAt(i);
//     if (ch === 'a' || ch === 'e' || ch === 'i' || ch === 'o' || ch === 'u') {
//         count++;
//     }
//     i++;
// }
// console.log(count);

// Q25
// let arr = [];
// for (let i = 0; i < 10; i++) {
//     let a = Number(prompt("Enter 10 numbers"));
//     arr.push(a);
// }
// let maxNum = -1;
// for (let i = 0; i < arr.length; i++) {
//     if (arr[i] > maxNum) {
//         maxNum = arr[i];
//     }
// }
// console.log(arr);
// console.log(maxNum);

// Q26
// let a = Number(prompt("Enter a number"));
// let rev = 0;
// while (a > 0) {
//     let b = a % 10;
//     a = Math.floor(a / 10);
//     rev = rev * 10 + b;
// }
// console.log(rev);

// Q27

// Q28
// let sum = 0;
// for (let i = 0; i < 5; i++) {
//     let a = Number(prompt("Enter prices of 5 items"));
//     sum = sum + a;
// }
// if (sum >= 1000) {
//     sum = sum - (sum * 0.25);
//     console.log(`Your total bill after discount of 25% is: ${sum}`);
// } else {
//     console.log(`Your total bill is: ${sum}`);
// }

// Q29
// let a = Number(prompt("Enter a number"));
// function isPrime(a) {
//     if (a === 0 || a === 1) {
//         return false;
//     }
//     if (a === 2) {
//         return true;
//     }
//     for (let i = 2; i < a - i; i++) {
//         if (a % i === 0) {
//             return false;
//         }
//     }
//     return true;
// }
// let b = isPrime(a);
// if (b) {
//     console.log("Is Prime");
// } else {
//     console.log("Is not Prime");
// }

// Q30
// let n = Number(prompt("Enter a number within 1 - 10"));
// if (n <= 10) {
//     for (let i = 1; i <= 10; i++) {
//         console.log(`${n} * ${i} = ${n * i}`);
//     }
// } else {
//     console.log("Enter a number between 1 to 10");
// }





