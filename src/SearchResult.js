import React from 'react';
import Tracklist from './Tracklist';
import styles from './SearchResult.module.css';

function SearchResult({ tracks, onAdd }) {
  return (
    <div className={styles.div}>
      <h2 className={styles.h2}>Search Results</h2>
      {tracks.length > 0 ? (
        <Tracklist tracks={tracks} onAction={onAdd} actionLabel="➕" />
      ) : (
        <p>No search results found.</p>
      )}
    </div>
  );
}

export default SearchResult;
