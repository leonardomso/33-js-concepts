console.log('=== Example 1: Basic async/await ===');
async function basicAsync() {
  const result = await Promise.resolve('Hello from async');
  console.log(result);
  return 'Done';
}

basicAsync().then(result => console.log(result));

console.log('\n=== Example 2: async Returns Promise ===');
async function returnsPromise() {
  return 'This is wrapped in a Promise';
}

returnsPromise().then(result => console.log(result));

function returnsPromiseExplicit() {
  return Promise.resolve('This is wrapped in a Promise');
}

console.log('\n=== Example 3: Error Handling ===');
async function handleErrors() {
  try {
    const result = await Promise.reject('Error occurred');
    console.log(result);
  } catch (error) {
    console.log('Caught error:', error);
  } finally {
    console.log('Finally block executed');
  }
}

handleErrors();

console.log('\n=== Example 4: Sequential Execution ===');
function delay(ms, value) {
  return new Promise(resolve => setTimeout(() => resolve(value), ms));
}

async function sequential() {
  console.log('Starting sequential...');
  const start = Date.now();
  
  const result1 = await delay(100, 'First');
  console.log(result1);
  
  const result2 = await delay(100, 'Second');
  console.log(result2);
  
  const result3 = await delay(100, 'Third');
  console.log(result3);
  
  console.log(`Sequential took ${Date.now() - start}ms`);
}

sequential();

console.log('\n=== Example 5: Parallel Execution ===');
async function parallel() {
  console.log('Starting parallel...');
  const start = Date.now();
  
  const [result1, result2, result3] = await Promise.all([
    delay(100, 'First'),
    delay(100, 'Second'),
    delay(100, 'Third')
  ]);
  
  console.log(result1, result2, result3);
  console.log(`Parallel took ${Date.now() - start}ms`);
}

setTimeout(() => parallel(), 500);

console.log('\n=== Example 6: Simulated API Call ===');
async function fetchUser(id) {
  await delay(200, null);
  return { id, name: `User ${id}`, email: `user${id}@example.com` };
}

async function getUserData() {
  try {
    console.log('Fetching user...');
    const user = await fetchUser(1);
    console.log('User:', user);
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
  }
}

setTimeout(() => getUserData(), 1000);

console.log('\n=== Example 7: Multiple Async Operations ===');
async function fetchUserPosts(userId) {
  const user = await fetchUser(userId);
  console.log('Fetched user:', user.name);
  
  await delay(200, null);
  const posts = [
    { id: 1, title: 'Post 1' },
    { id: 2, title: 'Post 2' }
  ];
  
  console.log('Fetched posts:', posts);
  return { user, posts };
}

setTimeout(() => fetchUserPosts(1), 1500);

console.log('\n=== Example 8: Async Loops ===');
async function processItems() {
  const items = [1, 2, 3, 4, 5];
  
  console.log('Processing sequentially:');
  for (const item of items) {
    const result = await delay(100, item * 2);
    console.log('Processed:', result);
  }
  
  console.log('Processing in parallel:');
  const results = await Promise.all(
    items.map(item => delay(100, item * 2))
  );
  console.log('All results:', results);
}

setTimeout(() => processItems(), 2000);

console.log('\n=== Example 9: Async with Array Methods ===');
async function processArray() {
  const numbers = [1, 2, 3, 4, 5];
  
  console.log('Using forEach (doesn\'t wait):');
  numbers.forEach(async (num) => {
    const result = await delay(100, num * 2);
    console.log('forEach result:', result);
  });
  
  console.log('Using for...of (waits):');
  for (const num of numbers) {
    const result = await delay(100, num * 2);
    console.log('for...of result:', result);
  }
}

setTimeout(() => processArray(), 3000);

console.log('\n=== Example 10: Async IIFE ===');
(async () => {
  console.log('Async IIFE start');
  await delay(100, null);
  console.log('Async IIFE end');
})();

console.log('\n=== Example 11: Top-level await ===');
console.log('Top-level await is available in ES modules');

console.log('\n=== Example 12: Error Propagation ===');
async function mightFail() {
  throw new Error('Operation failed');
}

async function handleFailure() {
  try {
    await mightFail();
  } catch (error) {
    console.log('Handled error:', error.message);
    throw error;
  }
}

handleFailure().catch(error => {
  console.log('Caught propagated error:', error.message);
});

console.log('\n=== Example 13: Best Practices ===');
async function bestPractices() {
  try {
    await someAsyncOperation();
  } catch (error) {
    console.error('Error:', error);
  }
  
  const [result1, result2] = await Promise.all([
    operation1(),
    operation2()
  ]);
  
  
  console.log('Best practices demonstrated');
}

function someAsyncOperation() {
  return Promise.resolve('Success');
}

function operation1() {
  return Promise.resolve('Op1');
}

function operation2() {
  return Promise.resolve('Op2');
}

setTimeout(() => bestPractices(), 4000);
