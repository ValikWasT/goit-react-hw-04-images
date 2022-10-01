import PropTypes from 'prop-types';
// import { nanoid } from 'nanoid';
import { Gallery } from './ImageGalleryStyled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
export const ImageGallery = ({ images, onImageClick }) => {
  return (
    <Gallery>
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          image={image}
          onImageClick={onImageClick}
        />
      ))}
    </Gallery>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape().isRequired).isRequired,
  onImageClick: PropTypes.func.isRequired,
};
