import styles from './ImageCard.module.css';

interface Image {
    id: string;
    urls: { small: string };
    alt_description?: string;
}

interface ImageCardProps {
    image: Image;
    onClick: () => void;
}

function ImageCard({ image, onClick }: ImageCardProps) {
    return (
        <div className={styles.imageCard}>
            <img
                src={image.urls.small}
                alt={image.alt_description || 'Image'}
                className={styles.image}
                onClick={onClick}
            />
        </div>
    );
}

export default ImageCard;
