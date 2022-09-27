import { GalleryItem, GalleryItemImage } from './ImageGalleryItemStyled';
export const ImageGalleryItem = ({ image }) => {
  return (
    <GalleryItem>
      <GalleryItemImage src={image.webformatURL} alt={image.tags} />
    </GalleryItem>
  );
};
