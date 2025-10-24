const { expectOutput } = require('./test-utils');

function testPrimitivesVsReferences() {
  return expectOutput(() => {
    require('./primitives-vs-references');
  }, [
    'primitives: {"a":1,"b":2}',
    'references: {"obj1":{"x":2},"obj2":{"x":2}}'
  ]);
}

module.exports = testPrimitivesVsReferences;