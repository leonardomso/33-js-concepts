/* 
    33 JavaScript Concepts is a project created to help JavaScript developers master their skills. It is a compilation of fundamental JavaScript concepts that are important and fundamental. 

    This project was inspired by an article written by Stephen Curtis. 

    Any kind of contribution is welcome. Feel free to contribute.
*/

// Modern JavaScript Tips & Tricks
// ===============================

// 1. Optional Chaining (?.) - Safe property access
const user = { profile: { name: "John" } };
const userName = user?.profile?.name; // "John" or undefined
const userAge = user?.profile?.age; // undefined (no error thrown)

// 2. Nullish Coalescing (??) - Default values for null/undefined
const theme = user?.preferences?.theme ?? 'light'; // 'light' if null/undefined

// 3. Template Literals with Tagged Templates
function highlight(strings, ...values) {
    return strings.reduce((result, string, i) => {
        return result + string + (values[i] ? `<mark>${values[i]}</mark>` : '');
    }, '');
}
const name = "JavaScript";
const message = highlight`Hello ${name}, welcome to modern JS!`;

// 4. Destructuring with Default Values
const { name: userName = 'Anonymous', age = 0 } = user?.profile || {};

// 5. Array Methods Chaining
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evenSquares = numbers
    .filter(n => n % 2 === 0)
    .map(n => n * n)
    .reduce((sum, n) => sum + n, 0);

// 6. Dynamic Property Names
const prop = 'dynamic';
const obj = {
    [prop]: 'value',
    [`${prop}Key`]: 'another value'
};

// 7. Async/Await with Error Handling
async function fetchUserData(id) {
    try {
        const response = await fetch(`/api/users/${id}`);
        if (!response.ok) throw new Error('User not found');
        return await response.json();
    } catch (error) {
        console.error('Error fetching user:', error.message);
        return null;
    }
}

// 8. Object.freeze() for Immutability
const config = Object.freeze({
    apiUrl: 'https://api.example.com',
    timeout: 5000
});
// config.apiUrl = 'new-url'; // This will be ignored in strict mode

// 9. Set and Map for Better Data Structures
const uniqueIds = new Set([1, 2, 2, 3, 3, 4]); // [1, 2, 3, 4]
const userCache = new Map();
userCache.set('user1', { name: 'John', age: 30 });

// 10. Modern Array Methods
const users = [
    { id: 1, name: 'John', active: true },
    { id: 2, name: 'Jane', active: false },
    { id: 3, name: 'Bob', active: true }
];

const activeUsers = users.filter(user => user.active);
const userNames = users.map(user => user.name);
const hasActiveUsers = users.some(user => user.active);
const allUsersActive = users.every(user => user.active);

console.log('Modern JavaScript Tips loaded successfully! 🚀');
