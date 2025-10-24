const { expectOutput } = require('./test-utils');

function testThisCallBind() {
  return expectOutput(() => {
    require('./this-call-bind');
  }, [
    'direct method: Hello Alice',
    'extracted function (this lost): Hello undefined',
    'call -> Hello Bob',
    'bind -> Hello Carol'
  ]);
}

module.exports = testThisCallBind;