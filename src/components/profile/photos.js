import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';

export default function Photos({ photos }) {
  return null;
}

Photos.propTypes = {
  photos: PropTypes.array.isRequired // even if empty we will still need to pass down an array
};
