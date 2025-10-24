const { expectOutput } = require('./test-utils');

function testClosures() {
  return expectOutput(() => {
    require('./closures');
  }, [
    'closure: 1',
    'closure: 2'
  ]);
}

module.exports = testClosures;