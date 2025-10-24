// Example: Call Stack (LIFO order)
function a() {
  console.log('a start');
  b();
  console.log('a end');
}

function b() {
  console.log('b start');
  c();
  console.log('b end');
}

function c() {
  console.log('c');
}

a();

// Expected output:
// a start
// b start
// c
// b end
// a end
