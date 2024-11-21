import styles from './LoadMoreBtn.module.css';

interface LoadMoreBtnProps {
    onClick: () => void;
}

function LoadMoreBtn({ onClick }: LoadMoreBtnProps) {
    return (
        <button onClick={onClick} className={styles.loadMoreButton} aria-label="Load more images">
            Load more
        </button>
    );
}

export default LoadMoreBtn;
