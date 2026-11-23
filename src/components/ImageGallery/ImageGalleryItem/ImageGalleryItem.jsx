import styles from "./ImageGalleryItem.module.css";

export function ImageGalleryItem({
  webformatURL,
  largeImageURL,
  tags,
  onImageClick,
}) {
  return (
    <li className={styles.item}>
      <img
        loading="lazy"
        className={styles.image}
        src={webformatURL}
        alt={tags}
        onClick={() => onImageClick({ largeImageURL, tags })}
      />
    </li>
  );
}
