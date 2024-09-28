import React, { useState } from 'react';
import Tracklist from './Tracklist';
import styles from './Playlist.module.css';

function Playlist({ name, tracks, onRemove, onNameChange }) {
  const [playlistName, setPlaylistName] = useState(name); // Local state for the playlist name
  const [isEditing, setIsEditing] = useState(false); // State to toggle editing mode

  // Handle playlist name input change
  const handleNameChange = (e) => {
    setPlaylistName(e.target.value); // Update the local state as user types
  };

  // Handle finishing editing (onBlur or Enter key)
  const handleBlur = () => {
    setIsEditing(false); // Exit editing mode
    onNameChange(playlistName); // Call parent function to update the playlist name
  };

  // Handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleBlur(); // Save when Enter is pressed
    }
  };

  return (
    <div className={styles.div}>
      {isEditing ? (
        <input
          className={styles.input}
          value={playlistName}
          onChange={handleNameChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <h2 onClick={() => setIsEditing(true)}>{playlistName}</h2>
      )}

      <Tracklist tracks={tracks} onAction={onRemove} actionLabel="➖" />
      <button className={styles.button}>SAVE TO SHOPIFY</button>
    </div>
  );
}

export default Playlist;
