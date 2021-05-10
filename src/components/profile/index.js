import PropTypes from 'prop-types';
import { useReducer, useEffect } from 'react';
import { getUserByUsername, getUserPhotosByUsername } from '../../services/firebase';
import Header from './header';

export default function UserProfile({ user }) {
  const reducer = (state, newState) => ({ ...state, ...newState });
  const initialState = {
    profile: {},
    photosCollection: [],
    followerCount: 0
  };

  const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function getProfileInfoAndPhotos() {
      // const [user] = await getUserByUsername(username);
      // console.log(user);
      const photos = await getUserPhotosByUsername(user.username);
      console.log(photos);
      // dispatch({ profile: user, photosCollection: photos, followerCount: user.followers?.length });
    }

    if (user.username) {
      getProfileInfoAndPhotos();
    }
  }, [user.username]);

  return (
    <>
      <Header />
      <p>Hello {user.username}</p>
    </>
  );
}

UserProfile.propTypes = {
  user: PropTypes.shape({
    dateCreated: PropTypes.number,
    emailAddress: PropTypes.string.isRequired,
    followers: PropTypes.array.isRequired,
    following: PropTypes.array.isRequired,
    fullName: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
  }).isRequired
};
