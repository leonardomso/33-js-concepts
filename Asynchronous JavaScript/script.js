//=================> Asynchronous JavaScript <=====================

//===============> Intervals , after certaimn time Code is Executed <========

const myInterval = setInterval(() => {
  console.log('Hi!'), 100;
});
// clearInterval(myInterval);

//==============> Set TimeOut <==================

//waits for Some time then executes the specified function

const timer = setTimeout(() => {
  console.log('this is gonna Execute After 5 sec');
}, 5000);
// clearTimeout(timer);
