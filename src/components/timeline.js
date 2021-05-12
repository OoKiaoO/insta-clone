import { useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import LoggedInUserContext from '../context/logged-in-user';
import usePhotos from '../hooks/use-photos';
import Post from './post/index';

export default function Timeline() {
  // get logged in user's photos (context)
  const { user } = useContext(LoggedInUserContext);
  const { photos } = usePhotos(user);

  // console.log(photos);
  // use skeleton on photo loading
  // if we have photos render them (create post component)
  // if user has no posts, tell them to create some

  return (
    <div className="container col-span-2">
      {!photos ? (
        <Skeleton count={4} width={640} height={500} className="mb-5" />
      ) : (
        photos.map((content) => <Post key={content.docId} content={content} />)
      )}
    </div>
  );
}
