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
