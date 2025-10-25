// Example: hoisting with var vs temporal dead zone (let)

function hoistingVar() {
  // var is hoisted and initialized to undefined
  try {
    // accessing 'a' before declaration returns undefined
    const before = a; // eslint-disable-line no-undef
    var a = 1;
    return { before, after: a };
  } catch (err) {
    return { error: err.message };
  }
}

function hoistingLet() {
  try {
    // accessing b before declaration throws ReferenceError
    const before = b; // eslint-disable-line no-undef
    let b = 2;
    return { before, after: b };
  } catch (err) {
    return { error: err.name };
  }
}

if (require.main === module) {
  console.log('hoistingVar:', hoistingVar());
  console.log('hoistingLet:', hoistingLet());
}

module.exports = { hoistingVar, hoistingLet };