//===============================> Callback Function <================

//function 1
const fetchUser = (username, callback) => {
  console.log('Fetching ...');

  setTimeout(() => {
    console.log('Now we Have the user');
    callback(username);
  }, 2000);
};
//function 2
const fetUserPhotos = (username, callback) => {
  console.log('Now fetching photos...');
  setTimeout(() => {
    console.log(`Now we have photos of ${username}`);
    callback(['ph1', 'ph2', 'ph3']);
  }, 2000);
};

//function 3
const fetPhotoDetails = (photo, callback) => {
  console.log('Fetching photo details...');
  setTimeout(() => {
    console.log(`Now we have details of ${photo}`);
    callback({ title: 'Photo title' });
  }, 2000);
};

//==================> this is Callback Hell <=========================
fetchUser('Mirinda', (user) => {
  //resolves 1st callback
  console.log(`hello ${user} here`);
  //second callback
  fetUserPhotos(user.username, (photos) => {
    console.log(`These are photos of ${user.username}:`, photos);
    //third callback
    fetPhotoDetails(photos[0], (details) => {
      console.log(`Details of ${photos[0]}:`, details);
    });
  });
});

//============> Promise < =================

// const fetchUser = new Promise((resolve, reject) => {
//   console.log('wait Fetching !!!');
//   setTimeout(() => {
//     resolve({ username: 'Michen' }); //means Succesfully Data Resolved
//     // reject('Failed to fetch user'); //means Failed to Resolve Data
//   }, 2000);
// });
// fetchUser
//   .then((user) => {
//     console.log(user.username);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
