import React, { useState } from 'react';
import styles from './SearchBar.module.css';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm); // Trigger the search with the entered term
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
      className={styles.input}
        type="text"
        placeholder="Song / Artist"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button className={styles.button1} type="submit">SEARCH</button>
    </form>
  );
}

export default SearchBar;
