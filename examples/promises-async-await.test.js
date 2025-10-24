const { expectOutputAsync } = require('./test-utils');

function testPromisesAsyncAwait() {
  return expectOutputAsync(() => {
    require('./promises-async-await');
  }, [
    'before await',
    'after await'
  ], 100);
}

module.exports = testPromisesAsyncAwait;