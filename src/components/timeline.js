/* eslint-disable no-nested-ternary */
import Skeleton from 'react-loading-skeleton';
import usePhotos from '../hooks/use-photos';
import Post from './post/index';

export default function Timeline() {
  // get logged in user's photos (hook)
  const { photos } = usePhotos();

  // console.log(photos);
  // use skeleton on photo loading
  // if we have photos render them (create post component)
  // if user has no posts, tell them to create some

  return (
    <div className="container col-span-2">
      {!photos ? (
        <Skeleton count={4} width={640} height={500} className="mb-5" />
      ) : photos?.length > 0 ? (
        photos.map((content) => <Post key={content.docId} content={content} />)
      ) : (
        <p className="text-center text-2xl">Follow people to see more photos!</p>
      )}
    </div>
  );
}
