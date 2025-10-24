const { expectOutput } = require('./test-utils');

function testCallStack() {
  return expectOutput(() => {
    require('./call-stack');
  }, [
    'a start',
    'b start',
    'c',
    'b end',
    'a end'
  ]);
}

module.exports = testCallStack;