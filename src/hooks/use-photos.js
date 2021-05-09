import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/user';
import { getPhotos, getUserByUserId } from '../services/firebase';

export default function usePhotos() {
  const [photos, setPhotos] = useState(null);
  const {
    user: { uid: userId = '' } // renaming uid to userId and setting default value to empty string
  } = useContext(UserContext);

  useEffect(() => {
    async function getTimelinePhotos() {
      // destructuring the docs result of user to access directly the following array
      const [{ following }] = await getUserByUserId(userId);
      // let followedUserPhotos = [];
      let followedUserPhotos = [];

      if (following.length > 0) {
        followedUserPhotos = await getPhotos(userId, following);
        // console.log(followedUserPhotos);
      }

      followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
      setPhotos(followedUserPhotos);
    }
    getTimelinePhotos();
  }, [userId]);

  return { photos };
}
