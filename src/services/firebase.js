import { firebase, FieldValue } from '../lib/firebase';

// it has to be an async function cause we are making a network call to firebase
export async function doesUsernameExist(username) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  return result.docs.map((user) => user.data().length > 0);
}

// create a function to retrieve user data by uid from auth()
export async function getUserByUserId(userId) {
  const result = await firebase.firestore().collection('users').where('userId', '==', userId).get();

  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id // saving the individual doc id for just in case~
  }));

  return user;
}

export async function getSuggestedProfiles(userId, following) {
  // eslint-disable-next-line prettier/prettier
  const result = await firebase.firestore().collection('users').where('userId', '==', userId).limit(10).get();
  // console.log(result);
  return result.docs
    .map((user) => ({ ...user.data(), docId: user.id }))
    .filter((profile) => profile.userId === userId && !following.includes(profile.userId));
}
