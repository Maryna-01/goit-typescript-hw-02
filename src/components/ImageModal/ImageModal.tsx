import Modal from 'react-modal';

import styles from './ImageModal.module.css';

interface ImageModalProps {
    imageUrl: string | null;
    onClose: () => void;
}

Modal.setAppElement('#root');

function ImageModal({ imageUrl, onClose }: ImageModalProps) {
    return (
        <Modal
            isOpen={!!imageUrl}
            onRequestClose={onClose}
            className={styles.modalContent}
            overlayClassName={styles.modalOverlay}
        >
            <div onClick={onClose}>
                {imageUrl && <img src={imageUrl} alt="Large view" className={styles.modalImage} />}
            </div>
        </Modal>
    );
}

export default ImageModal;
