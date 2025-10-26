console.log('=== Example 1: Creating a Promise ===');
const simplePromise = new Promise((resolve, reject) => {
  const success = true;
  
  if (success) {
    resolve('Promise resolved!');
  } else {
    reject('Promise rejected!');
  }
});

simplePromise
  .then(result => console.log(result))
  .catch(error => console.error(error));

console.log('\n=== Example 2: Promise States ===');

const pendingPromise = new Promise((resolve) => {
  setTimeout(() => resolve('Resolved after delay'), 1000);
});

console.log('Promise state: pending');
pendingPromise.then(result => {
  console.log('Promise state: fulfilled');
  console.log(result);
});

console.log('\n=== Example 3: Promise Chaining ===');
Promise.resolve(5)
  .then(num => {
    console.log('First then:', num);
    return num * 2;
  })
  .then(num => {
    console.log('Second then:', num);
    return num * 2;
  })
  .then(num => {
    console.log('Third then:', num);
  });

console.log('\n=== Example 4: Error Handling ===');
Promise.resolve('Start')
  .then(value => {
    console.log(value);
    throw new Error('Something went wrong!');
  })
  .then(value => {
    console.log('This will not execute');
  })
  .catch(error => {
    console.log('Caught error:', error.message);
  })
  .finally(() => {
    console.log('Finally block always executes');
  });

console.log('\n=== Example 5: Promise.all() ===');
const promise1 = Promise.resolve(1);
const promise2 = Promise.resolve(2);
const promise3 = Promise.resolve(3);

Promise.all([promise1, promise2, promise3])
  .then(results => {
    console.log('All promises resolved:', results);
  });

const failingPromise = Promise.reject('Failed');
Promise.all([promise1, failingPromise, promise3])
  .catch(error => {
    console.log('Promise.all rejected:', error);
  });

console.log('\n=== Example 6: Promise.race() ===');
const slow = new Promise(resolve => setTimeout(() => resolve('Slow'), 2000));
const fast = new Promise(resolve => setTimeout(() => resolve('Fast'), 500));

Promise.race([slow, fast])
  .then(result => {
    console.log('Race winner:', result);
  });

console.log('\n=== Example 7: Promise.allSettled() ===');
const promises = [
  Promise.resolve('Success 1'),
  Promise.reject('Error 1'),
  Promise.resolve('Success 2')
];

Promise.allSettled(promises)
  .then(results => {
    console.log('All settled:');
    results.forEach((result, index) => {
      console.log(`Promise ${index}:`, result);
    });
  });

console.log('\n=== Example 8: Promise.any() ===');
const promises2 = [
  Promise.reject('Error 1'),
  Promise.resolve('Success!'),
  Promise.reject('Error 2')
];

Promise.any(promises2)
  .then(result => {
    console.log('First fulfilled:', result);
  })
  .catch(error => {
    console.log('All rejected:', error);
  });

console.log('\n=== Example 9: Promisifying Callbacks ===');
function callbackFunction(value, callback) {
  setTimeout(() => {
    callback(null, value * 2);
  }, 100);
}

function promisify(fn) {
  return function(...args) {
    return new Promise((resolve, reject) => {
      fn(...args, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      });
    });
  };
}

const promisified = promisify(callbackFunction);
promisified(5)
  .then(result => console.log('Promisified result:', result));

console.log('\n=== Example 10: Sequential Promises ===');
function delay(ms, value) {
  return new Promise(resolve => setTimeout(() => resolve(value), ms));
}

delay(100, 'First')
  .then(result => {
    console.log(result);
    return delay(100, 'Second');
  })
  .then(result => {
    console.log(result);
    return delay(100, 'Third');
  })
  .then(result => {
    console.log(result);
  });

console.log('\n=== Example 11: Parallel vs Sequential ===');
const tasks = [
  () => delay(100, 'Task 1'),
  () => delay(100, 'Task 2'),
  () => delay(100, 'Task 3')
];

async function runSequential() {
  console.log('Sequential start');
  const start = Date.now();
  for (const task of tasks) {
    const result = await task();
    console.log(result);
  }
  console.log(`Sequential done in ${Date.now() - start}ms`);
}

async function runParallel() {
  console.log('Parallel start');
  const start = Date.now();
  const results = await Promise.all(tasks.map(task => task()));
  results.forEach(result => console.log(result));
  console.log(`Parallel done in ${Date.now() - start}ms`);
}

setTimeout(() => runSequential(), 1000);
setTimeout(() => runParallel(), 2000);

console.log('\n=== Example 12: Retry Logic ===');
function fetchWithRetry(url, retries = 3) {
  return new Promise((resolve, reject) => {
    function attempt(n) {
      console.log(`Attempt ${4 - n}`);
      const success = Math.random() > 0.7;
      if (success) {
        resolve('Data fetched');
      } else if (n > 0) {
        setTimeout(() => attempt(n - 1), 500);
      } else {
        reject('Failed after retries');
      }
    }
    attempt(retries);
  });
}

fetchWithRetry('api/data')
  .then(result => console.log(result))
  .catch(error => console.log(error));
