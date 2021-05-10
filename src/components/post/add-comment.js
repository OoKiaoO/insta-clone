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

    return null;
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
