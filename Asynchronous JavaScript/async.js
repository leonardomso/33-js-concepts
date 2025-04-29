//====================> Synchronous code <===========

const f1 = () => {
  console.log('f1 is executing');
  f2();
  console.log('f1 part 2 is executing');
};
const f2 = () => {
  console.log('f2 is executing');
};

f1();

//====================> Asynchronous code <===========

const f3 = () => {
  console.log('f3 is executing');
  f4();
  console.log('f3 part 3 is executing');
};

const f4 = () => {
  setTimeout(() => {
    console.log('f3 part 2 is executing');
  }, 2000);
};

f3();
