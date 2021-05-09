import Skeleton from 'react-loading-skeleton';
import usePhotos from '../hooks/use-photos';

export default function Timeline() {
  // get logged in user's photos (hook)
  const { photos } = usePhotos();

  // console.log(photos);
  // use skeleton on photo loading
  // if we have photos render them (create post component)
  // if user has no posts, tell them to create some

  return (
    <div className="container col-span-2">
      <p>I am the timeline!</p>
    </div>
  );
}
