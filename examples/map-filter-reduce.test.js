const { expectOutput } = require('./test-utils');

function testMapFilterReduce() {
  return expectOutput(() => {
    require('./map-filter-reduce');
  }, [
    'map -> squares: [1,4,9,16,25]',
    'filter -> evens: [2,4]',
    'reduce -> sum: 15'
  ]);
}

module.exports = testMapFilterReduce;