import { GalleryButton } from './ButtonStyled';
export const LoadMoreButton = ({ onClick }) => {
  return (
    <GalleryButton type="button" onClick={onClick}>
      Load more
    </GalleryButton>
  );
};
