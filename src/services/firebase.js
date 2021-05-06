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
