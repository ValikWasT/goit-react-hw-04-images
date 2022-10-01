import PropTypes from 'prop-types';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItemStyled';
export const ImageGalleryItem = ({ image, onImageClick }) => {
  return (
    <GalleryItem>
      <GalleryItemImage
        src={image.webformatURL}
        alt={image.tags}
        onClick={() => onImageClick(image.largeImageURL)}
      />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
  onImageClick: PropTypes.func.isRequired,
};
