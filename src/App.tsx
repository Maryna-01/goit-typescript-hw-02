import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import './App.css';

const UNSPLASH_API_KEY = '4qQheWHsHKHeYvDAj-BNWvya435vNCcSFFKJVL0xnT8';
const UNSPLASH_API_URL = 'https://api.unsplash.com/search/photos';

interface Image {
    id: string;
    urls: { small: string; regular: string };
    alt_description?: string;
}

function App() {
    const [images, setImages] = useState<Image[]>([]);
    const [query, setQuery] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [modalImage, setModalImage] = useState<Image | null>(null);

    const fetchImages = async (searchQuery: string, pageNum: number) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(UNSPLASH_API_URL, {
                params: {
                    query: searchQuery,
                    page: pageNum,
                    client_id: UNSPLASH_API_KEY,
                },
            });
            setImages(prevImages =>
                pageNum === 1 ? response.data.results : [...prevImages, ...response.data.results]
            );
        } catch (err) {
            console.error('Error:', err);
            setError('Failed to load images. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSearchSubmit = (newQuery: string) => {
        if (newQuery.trim() === '') {
            return;
        }
        setQuery(newQuery);
        setPage(1);
        fetchImages(newQuery, 1);
    };

    const loadMoreImages = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchImages(query, nextPage);
    };

    const openModal = (image: Image) => setModalImage(image);
    const closeModal = () => setModalImage(null);

    useEffect(() => {
        if (query) {
            fetchImages(query, page);
        }
    }, [query, page]);

    return (
        <div className="App">
            <SearchBar onSubmit={handleSearchSubmit} />
            {error && <ErrorMessage message={error} />}
            <ImageGallery images={images} onImageClick={openModal} />
            {loading && <Loader />}
            {images.length > 0 && !loading && <LoadMoreBtn onClick={loadMoreImages} />}
            {modalImage && <ImageModal imageUrl={modalImage.urls.regular} onClose={closeModal} />}
        </div>
    );
}

export default App;
