import styles from "./ImageGallery.module.css";
import { ImageGalleryItem } from "./ImageGalleryItem/ImageGalleryItem";

export function ImageGallery({ images, onImageClick }) {
  return (
    <ul className={styles.gallery}>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          tags={tags}
          onImageClick={onImageClick}
        />
      ))}
    </ul>
  );
}
