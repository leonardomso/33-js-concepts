// Example: Promises and async/await
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  console.log('before await');
  await wait(50);
  console.log('after await');
}

run();
