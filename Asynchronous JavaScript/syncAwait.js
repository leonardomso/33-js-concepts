//======================> Async Await <====================

const fxn = async (number) => {
  return number;
};

const numb = async () => {
  const data = await fxn(5);
  console.log(data);
};

numb(); // will print 5 as expected

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

const display = async () => {
  const user = await fetchUser('Mirinda');
  const photos = await fetUserPhotos(user.username);
  const details = await fetPhotoDetails(photos[0]);
  console.log(`Details of ${photos[0]}:`, details);
};

display();
