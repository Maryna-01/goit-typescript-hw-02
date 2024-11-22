import ImageCard from '../ImageCard/ImageCard';
import styles from './ImageGallery.module.css';



interface Image {
    id: string;
    urls: { small: string };
    alt_description?: string;
}

interface ImageGalleryProps {
    images: Image[];
    onImageClick: (image: Image) => void;
}

function ImageGallery({ images, onImageClick }: ImageGalleryProps) {
    return (
        <ul className={styles.gallery}>
            {images.map(image => (
                <li key={image.id} className={styles.galleryItem}>
                    <ImageCard image={image} onClick={() => onImageClick(image)} />
                </li>
            ))}
        </ul>
    );
}

export default ImageGallery;
