// Simple test harness
function expectOutput(fn, expectedLines) {
  const originalLog = console.log;
  const actualOutput = [];
  
  console.log = (...args) => {
    // Handle object stringification consistently
    const formatted = args.map(arg => 
      typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
    ).join(' ');
    actualOutput.push(formatted);
  };

  try {
    fn();
    console.log = originalLog;
    
    const passed = expectedLines.every((expected, i) => {
      if (!actualOutput[i]) return false;
      // Normalize JSON strings and arrays for comparison
      const normalizedExpected = expected.replace(/[\s{}[\]]/g, '');
      const normalizedActual = actualOutput[i].replace(/[\s{}[\]]/g, '');
      return normalizedActual.includes(normalizedExpected);
    });
    
    if (passed) {
      console.log('\x1b[32m✓\x1b[0m', fn.name || 'Test passed');
      return true;
    } else {
      console.log('\x1b[31m✗\x1b[0m', fn.name || 'Test failed');
      console.log('Expected:', expectedLines);
      console.log('Got:', actualOutput);
      return false;
    }
  } catch (err) {
    console.log = originalLog;
    console.error('\x1b[31m✗\x1b[0m Test error:', err);
    return false;
  }
}

// For async tests
function expectOutputAsync(fn, expectedLines, timeout = 1000) {
  return new Promise((resolve) => {
    const originalLog = console.log;
    const actualOutput = [];
    
    console.log = (...args) => {
      const formatted = args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
      ).join(' ');
      actualOutput.push(formatted);
    };

    fn();

    // Wait for all async operations to complete
    setTimeout(() => {
      console.log = originalLog;
      
      const passed = expectedLines.every((expected, i) => {
        if (!actualOutput[i]) return false;
        const normalizedExpected = expected.replace(/[\s{}[\]]/g, '');
        const normalizedActual = actualOutput[i].replace(/[\s{}[\]]/g, '');
        return normalizedActual.includes(normalizedExpected);
      });
      
      if (passed) {
        console.log('\x1b[32m✓\x1b[0m', fn.name || 'Test passed');
        resolve(true);
      } else {
        console.log('\x1b[31m✗\x1b[0m', fn.name || 'Test failed');
        console.log('Expected:', expectedLines);
        console.log('Got:', actualOutput);
        resolve(false);
      }
    }, timeout);
  });
}

module.exports = { expectOutput, expectOutputAsync };