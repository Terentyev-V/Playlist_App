import React from 'react';
import Tracklist from './Tracklist';
import styles from './SearchResult.module.css'

function SearchResult({ tracks, onAdd }) {
  return (
    <div className={styles.div}>
      <h2 className={styles.h2}>Search Results</h2>
      <Tracklist tracks={tracks} onAction={onAdd} actionLabel="➕" />
    </div>
  );
}

export default SearchResult;



