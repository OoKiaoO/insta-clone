/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import { getSuggestedProfiles } from '../../services/firebase';

export default function Suggestions({ userId, following }) {
  const [profiles, setProfiles] = useState(null);

  // get suggested profiles using firebase service (call using userId)
  // by calling an async function within useEffect and store it in state
  useEffect(() => {
    async function suggestedProfiles() {
      const response = await getSuggestedProfiles(userId, following);
      setProfiles(response);
    }

    console.log(userId);
    if (userId) {
      suggestedProfiles();
    }
  }, [userId]);

  // render the profiles (wait for the profiles with skeleton)
  return !profiles ? (
    <Skeleton count={1} height={150} className="mt-5" />
  ) : profiles.length > 0 ? (
    <div className="rounded flex flex-col">
      <div className="text-sm flex items-center align-items justify-between mb-2">
        <p className="font-bold text-gray-base ">Suggestions for you</p>
      </div>
    </div>
  ) : null;
}

Suggestions.propTypes = {
  userId: PropTypes.string,
  following: PropTypes.array
};