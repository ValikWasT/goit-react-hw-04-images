import PropTypes from 'prop-types';
import { GalleryButton } from './ButtonStyled';
export const LoadMoreButton = ({ onClick }) => {
  return (
    <GalleryButton type="button" onClick={onClick}>
      Load more
    </GalleryButton>
  );
};

LoadMoreButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
