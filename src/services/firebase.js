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

// create a function to retrieve user data by uid from firestore => return boolean
export async function getUserByUserId(userId) {
  const result = await firebase.firestore().collection('users').where('userId', '==', userId).get();

  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id // saving the individual doc id for just in case~
  }));

  return user;
}

export async function getUserByUsername(username) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id // saving the individual doc id in case we may need it to set key attr
  }));
}

export async function getSuggestedProfiles(userId, following) {
  // eslint-disable-next-line prettier/prettier
  const result = await firebase.firestore().collection('users').limit(10).get();

  return result.docs
    .map((user) => ({ ...user.data(), docId: user.id }))
    .filter((profile) => profile.userId !== userId && !following.includes(profile.userId));
}

export async function updateLoggedInUserFollowing(
  loggedInUserDocId, // currently logged in user document id
  profileId, // the user that is being sent the follow request for (userId)
  isFollowingProfile // boolean
) {
  return firebase
    .firestore()
    .collection('users')
    .doc(loggedInUserDocId)
    .update({
      following: isFollowingProfile
        ? FieldValue.arrayRemove(profileId)
        : FieldValue.arrayUnion(profileId)
    });
}

export async function updateFollowedUserFollowers(
  profileDocId, // followed user document id
  loggedInUserId, // currently logged in user Id
  isFollowingProfile
) {
  return firebase
    .firestore()
    .collection('users')
    .doc(profileDocId)
    .update({
      followers: isFollowingProfile
        ? FieldValue.arrayRemove(loggedInUserId)
        : FieldValue.arrayUnion(loggedInUserId)
    });
}

export async function getPhotos(userId, following) {
  const result = await firebase
    .firestore()
    .collection('photos')
    .where('userId', 'in', following) // 'userId' => the id of who created the post stored in firebase
    .get();

  const userFollowedPhotos = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id
  }));

  const photosWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async (photo) => {
      let userLikedPhoto = false;
      if (photo.likes.includes(userId)) {
        userLikedPhoto = true;
      }
      // retrieving user data from uid taken from photos.userId (full user info not included in photos info)
      // to be displayed on the post
      const user = await getUserByUserId(photo.userId);
      const { username } = user[0];
      return { username, ...photo, userLikedPhoto };
    })
  );

  return photosWithUserDetails; // array
}

export async function getUserPhotosByUsername(username) {
  const [user] = await getUserByUsername(username);
  const result = await firebase
    .firestore()
    .collection('photos')
    .where('userId', '==', user.userId)
    .get();

  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));
}

export async function isUserFollowingProfile(loggedInUserUsername, profileUserId) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', loggedInUserUsername)
    .where('following', 'array-contains', profileUserId)
    .get();

  const [response = {}] = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));
  return response.userId;
}

export async function toggleFollow(
  isFollowingProfile,
  activeUserDocId, // currently logged in user DOCUMENT-id !== userId
  profileId, // userId of the profile I want to follow/unfollow
  profileUserDocId, // profile DOCUMENT-id of user I want to follow/unfollow
  activeUserId // currently logged in user userId
) {
  await updateLoggedInUserFollowing(activeUserDocId, profileId, isFollowingProfile);
  await updateFollowedUserFollowers(profileUserDocId, activeUserId, isFollowingProfile);
}
