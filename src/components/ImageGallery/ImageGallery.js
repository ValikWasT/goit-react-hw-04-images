import { nanoid } from 'nanoid';
import { Gallery } from './ImageGalleryStyled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
export const ImageGallery = ({ images, onImageClick }) => {
  return (
    <Gallery>
      {images.map(image => (
        <ImageGalleryItem
          key={nanoid()}
          image={image}
          onImageClick={onImageClick}
        />
      ))}
    </Gallery>
  );
};
