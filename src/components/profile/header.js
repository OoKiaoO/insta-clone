import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import useUser from '../../hooks/use-user';
import { isUserFollowingProfile, toggleFollow } from '../../services/firebase';
import UserContext from '../../context/user';

export default function Header({ photosCount, profile, followerCount, setFollowerCount }) {
  const { user: loggedInUser } = useContext(UserContext);
  const { user } = useUser(loggedInUser?.uid);
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  const activeBtnFollow = user?.username && user?.username !== profile.username;

  useEffect(() => {
    const isLoggedInUserFollowingProfile = async () => {
      // user.username = loggedInUser => useUser hook from auth info
      // profileUserId = user profile I am rendering/visiting => profile prop
      const isFollowing = await isUserFollowingProfile(user.username, profile.userId);
      setIsFollowingProfile(!!isFollowing);
    };

    if (user?.username && profile.userId) {
      isLoggedInUserFollowingProfile();
    }
  }, [user?.username, profile.userId]);

  const handleToggleFollow = async () => {
    setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
    setFollowerCount({
      followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1
    });
    await toggleFollow(isFollowingProfile, user.docId, profile.userId, profile.docId, user.userId);
  };

  return (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
      <div className="container flex justify-center items-center">
        {profile.username ? (
          // TODO: implement Skeleton for img loading
          <img
            className="rounded-full h-40 w-40 flex"
            alt={`${profile.username} profile`}
            src={`/images/avatars/${profile.username}.jpg`}
          />
        ) : (
          <img
            className="rounded-full h-40 w-40 flex"
            alt="Default profile"
            src="images/avatars/default.png"
          />
        )}
      </div>
      <div className="flex items-center justify-center flex-col col-span-2">
        <div className="container flex flex-items-center">
          <p className="text-2xl mr-4">{profile.username}</p>
          {activeBtnFollow && (
            <button
              className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
              type="button"
              onClick={handleToggleFollow}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleToggleFollow();
                }
              }}
            >
              {isFollowingProfile ? 'Unfollow' : 'Follow'}
            </button>
          )}
        </div>
        <div className="container flex mt-4">
          {profile.followers === undefined || profile.following === undefined ? (
            <Skeleton count={1} width={677} height={24} />
          ) : (
            <>
              <p className="mr-10">
                <span className="font-bold">{photosCount} </span>
                photos
              </p>
              <p className="mr-10">
                <span className="font-bold">{followerCount}</span>
                {profile.followers.length === 1 ? ' follower' : ' followers'}
              </p>
              <p className="mr-10">
                <span className="font-bold">{profile.following.length} </span>
                following
              </p>
            </>
          )}
        </div>
        <div className="container mt-4">
          <p className="font-medium">
            {!profile.fullName ? <Skeleton count={1} height={24} /> : profile.fullName}
          </p>
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  photosCount: PropTypes.number.isRequired,
  followerCount: PropTypes.number.isRequired,
  setFollowerCount: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    docId: PropTypes.string,
    userId: PropTypes.string,
    fullName: PropTypes.string,
    following: PropTypes.array,
    followers: PropTypes.array,
    username: PropTypes.string
  }).isRequired
};
