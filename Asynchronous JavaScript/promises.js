//===============================> Callback Function <================

//function 1

const fetchUser = (username) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ username: username }); //means Succesfully Data Resolved
      // reject('Failed to fetch user'); //means Failed to Resolve Data
    }, 2000);
  });
};

//function 2
const fetUserPhotos = (username) => {
  return new Promise((resolve, reject) => {
    console.log('Now fetching photos...');
    setTimeout(() => {
      console.log(`Now we have photos of ${username}`);
      resolve(['ph1', 'ph2', 'ph3']);
    }, 2000);
  });
};

//function 3
const fetPhotoDetails = (photo) => {
  return new Promise((resolve, reject) => {
    console.log('Fetching photo details...');
    setTimeout(() => {
      console.log(`Now we have details of ${photo}`);
      resolve({ title: 'Photo title' });
    }, 2000);
  });
};

//==================> this is Callback Hell <=========================
// fetchUser('Mirinda', (user) => {
//   //resolves 1st callback
//   console.log(`hello ${user} here`);
//   //second callback
//   fetUserPhotos(user.username, (photos) => {
//     console.log(`These are photos of ${user.username}:`, photos);
//     //third callback
//     fetPhotoDetails(photos[0], (details) => {
//       console.log(`Details of ${photos[0]}:`, details);
//     });
//   });
// });

//============> Promise < =================

fetchUser('Mirinda').then((user) => {
  fetUserPhotos(user.username).then((photos) => {
    fetPhotoDetails(photos[0]).then((details) => {
      console.log(`Details of ${photos[0]}:`, details);
    });
  });
});
