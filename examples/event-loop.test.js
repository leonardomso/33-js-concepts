const { expectOutputAsync } = require('./test-utils');

function testEventLoop() {
  return expectOutputAsync(() => {
    require('./event-loop');
  }, [
    'script start',
    'script end',
    'promise callback (microtask)',
    'timeout callback (macrotask)'
  ], 100);
}

module.exports = testEventLoop;