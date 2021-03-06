/* eslint-disable no-plusplus */
export function seedDatabase(firebase) {
  const users = [
    {
      userId: 'Vdsj3aOewkNTB3PKcC0Sa7h3ivk1',
      username: 'kia',
      fullName: 'Kia Kiakia',
      emailAddress: 'hola_kia@hotmail.it',
      following: ['2'],
      followers: ['2', '3', '4'],
      dateCreated: Date.now()
    },
    {
      userId: '2',
      username: 'raphael',
      fullName: 'Raffaello Sanzio da Urbino',
      emailAddress: 'raphael@sanzio.com',
      following: [],
      followers: ['Vdsj3aOewkNTB3PKcC0Sa7h3ivk1'],
      dateCreated: Date.now()
    },
    {
      userId: '3',
      username: 'dali',
      fullName: 'Salvador Dalí',
      emailAddress: 'salvador@dali.com',
      following: [],
      followers: ['Vdsj3aOewkNTB3PKcC0Sa7h3ivk1'],
      dateCreated: Date.now()
    },
    {
      userId: '4',
      username: 'orwell',
      fullName: 'George Orwell',
      emailAddress: 'george@orwell.com',
      following: [],
      followers: ['Vdsj3aOewkNTB3PKcC0Sa7h3ivk1'],
      dateCreated: Date.now()
    }
  ];

  // eslint-disable-next-line prefer-const
  for (let k = 0; k < users.length; k++) {
    firebase.firestore().collection('users').add(users[k]);
  }

  // eslint-disable-next-line prefer-const
  for (let i = 1; i <= 5; i++) {
    firebase
      .firestore()
      .collection('photos')
      .add([
        {
          photoId: 'i',
          userId: '2',
          imageSrc: `/images/users/kia/${i}.jpg`,
          caption: 'Saint George and the Dragon',
          likes: [],
          comments: [
            {
              displayName: 'dali',
              comment: 'Love this place, looks like my animal farm!'
            },
            {
              displayName: 'orwell',
              comment: 'Would you mind if I used this picture?'
            }
          ],
          userLatitude: '40.7128°',
          userLongitude: '74.0060°',
          dateCreated: Date.now()
        },
        {
          photoId: 'i',
          userId: '2',
          imageSrc: `/images/users/kia/.jpg`,
          caption: 'Saint George and the Dragon',
          likes: [],
          comments: [
            {
              displayName: 'dali',
              comment: 'Love this place, looks like my animal farm!'
            },
            {
              displayName: 'orwell',
              comment: 'Would you mind if I used this picture?'
            }
          ],
          userLatitude: '40.7128°',
          userLongitude: '74.0060°',
          dateCreated: Date.now()
        }
      ]);
  }
}
