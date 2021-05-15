/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-nested-ternary */
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { updateLoggedInUserFollowing, updateFollowedUserFollowers } from '../../services/firebase';

export default function SuggestedProfile({
  profileDocId,
  username,
  profileId,
  userId,
  loggedInUserDocId,
  avatar
}) {
  const [followed, setFollowed] = useState(false);

  async function handleFollowUser() {
    setFollowed(true); // to remove the followed user profile from the array of suggestions

    // firebase: cretae 2 service functions
    // update the following array of the logged in user
    await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);
    // update the followers array of the user who has been followed
    await updateFollowedUserFollowers(profileDocId, userId);
  }

  return !followed ? (
    <div className="flex flex-row items-center align-items justify-between">
      <div className="flex items-center justify-between">
        <img
          className="rounded-full w-8 flex mr-3"
          test={console.log('username', username)}
          src={
            username === 'kia' || username === 'mikiri'
              ? `/images/avatars/${username}.png`
              : !avatar
              ? `/images/avatars/default.png`
              : avatar
          }
          alt=""
        />
        <Link to={`/p/${username}`}>
          <p className="font-bold text-small">{username}</p>
        </Link>
      </div>
      <button
        className="text-xs font-bold text-blue-medium"
        type="button"
        onClick={handleFollowUser}
      >
        Follow
      </button>
    </div>
  ) : null;
}

SuggestedProfile.propTypes = {
  profileDocId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  loggedInUserDocId: PropTypes.string.isRequired,
  avatar: PropTypes.string
};
