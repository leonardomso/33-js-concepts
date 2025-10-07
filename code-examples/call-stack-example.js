/**
 * Call Stack Example
 * 
 * The call stack is a mechanism that the JavaScript interpreter uses to keep track of function execution within a program.
 * It follows the Last In, First Out (LIFO) principle.
 */

console.log('1. Script execution starts');

function firstFunction() {
    console.log('3. Inside firstFunction');
    secondFunction();
    console.log('5. Back to firstFunction');
}

function secondFunction() {
    console.log('4. Inside secondFunction');
}

// Execution starts here
firstFunction();
console.log('6. Script execution ends');

/*
 * Call Stack Visualization:
 * 
 * At each step, the call stack looks like this:
 * 
 * Step 1: console.log('1. Script execution starts') -> []
 * Step 2: firstFunction() -> [firstFunction]
 * Step 3: console.log('3. Inside firstFunction') -> [firstFunction]
 * Step 4: secondFunction() -> [firstFunction, secondFunction]
 * Step 5: console.log('4. Inside secondFunction') -> [firstFunction, secondFunction]
 * Step 6: secondFunction() returns -> [firstFunction]
 * Step 7: console.log('5. Back to firstFunction') -> [firstFunction]
 * Step 8: firstFunction() returns -> []
 * Step 9: console.log('6. Script execution ends') -> []
 */

// Example of call stack with recursion
function factorial(n) {
    if (n <= 1) {
        return 1;
    }
    return n * factorial(n - 1); // This creates multiple stack frames
}

console.log('Factorial of 5:', factorial(5));

// Example of call stack overflow
function stackOverflow() {
    console.log('This will cause a stack overflow');
    stackOverflow(); // Recursive call without termination condition
}

// Uncomment the next line to see the stack overflow error
// stackOverflow();
