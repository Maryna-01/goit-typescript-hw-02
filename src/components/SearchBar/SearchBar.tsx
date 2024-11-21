import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './SearchBar.module.css';

interface SearchBarProps {
    onSubmit: (query: string) => void;
}

function SearchBar({ onSubmit }: SearchBarProps) {
    const [inputValue, setInputValue] = useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (inputValue.trim() === '') {
            toast.error('Please enter a search term.');
            return;
        }
        onSubmit(inputValue);
        setInputValue('');
    };

    return (
        <form onSubmit={handleSubmit} className={styles.searchForm}>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Search for images..."
                className={styles.searchInput}
            />
            <button type="submit" className={styles.searchButton}>
                Search
            </button>
            <ToastContainer position="top-right" autoClose={3000} />
        </form>
    );
}

export default SearchBar;
