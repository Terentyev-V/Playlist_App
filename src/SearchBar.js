import React, { useState } from 'react';
import styles from './SearchBar.module.css'

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm); // Pass search term to parent component
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
      className={styles.input}
        type="text"
        placeholder="Enter a song name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className={styles.button1} type="submit">SEARCH</button>
    </form>
  );
}

export default SearchBar;
