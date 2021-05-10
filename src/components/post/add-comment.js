import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import FirebaseContext from '../../context/firebase';
import UserContext from '../../context/user';

export default function AddComment({ docId, comments, setComments, commentInput }) {
  const [comment, setComment] = useState('');
  const { firebase, FieldValue } = useContext(FirebaseContext);
  // we need FieldValue becasue we will have to modify data inside firestore
  const {
    user: { displayName }
  } = useContext(UserContext);

  const handleSubmitComment = (event) => {
    event.preventDefault();

    setComments([{ displayName, comment }, ...comments]);
    // firebase comment structure => comments (array), each comment = obj with 2 keys
    // creating a new array with the new comment + the rest of the already existing comments array (spread)
    // N.B. setComments only works with state, to have this persist we have to pass it to firebase!

    setComment(''); // to clear out input field after posting a comment
    return firebase
      .firestore()
      .collection('photos')
      .doc(docId) // because we are modifying by docId (adding comments)
      .update({
        comments: FieldValue.arrayUnion({ displayName, comment })
      });
  };

  return (
    <div className="border-t border-gray-primary">
      <form
        method="POST"
        className="flex justify-between pl-0 pr-5"
        onSubmit={(event) =>
          comment.length >= 1 ? handleSubmitComment(event) : event.preventDefault()
        }
      >
        <input
          aria-label="Add a comment"
          autoComplete="off"
          className="text-smal text-gray-base w-full mr-3 py-5 px-4"
          type="text"
          name="add comment"
          placeholder="Add a comment.."
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          ref={commentInput}
        />
        <button
          className={`text-small font-bold text-blue-medium ${!comment && 'opacity-25'}`}
          type="button"
          disabled={comment.length < 1}
          onClick={handleSubmitComment}
        >
          Post
        </button>
      </form>
    </div>
  );
}

AddComment.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  setComments: PropTypes.func.isRequired,
  commentInput: PropTypes.object.isRequired
};
