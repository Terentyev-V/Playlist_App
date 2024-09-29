import React, { useState } from 'react';
import Tracklist from './Tracklist';
import styles from './Playlist.module.css';
import Spotify from './Spotify';

function Playlist({ name, tracks, onRemove, onNameChange, onReset }) {
  const [playlistName, setPlaylistName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleNameChange = (e) => {
    setPlaylistName(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false); // Exit edit mode
    onNameChange(playlistName); // Call parent function to update the playlist name
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleBlur(); // Save name and exit edit mode when "Enter" is pressed
    }
  };

  // Collect track URIs from the current playlist
  const trackUris = tracks.map(track => track.uri);

  // Handle saving the playlist to Spotify
  const savePlaylist = () => {
    if (!playlistName || trackUris.length === 0) {
      alert('Please provide a valid name and add tracks to the playlist.');
      return;
    }

    setIsLoading(true); // Show loading indicator
    Spotify.savePlaylist(playlistName, trackUris).then(() => {
      setIsLoading(false); // Stop loading
      setIsSaved(true); // Show confirmation message
      setPlaylistName('BlackT Playlist'); // Reset playlist name
      onReset(); // Reset the playlist tracks
    });
  };

  return (
    <div className={styles.div}>
      {isEditing ? ( 
        <input
          className={styles.input}
          value={playlistName}
          onChange={handleNameChange}
          onBlur={handleBlur}  // When input loses focus, switch back to h2
          onKeyDown={handleKeyDown}  // Switch back to h2 when Enter is pressed
          autoFocus
        />
      ) : (
        <h2 onClick={() => setIsEditing(true)}>{playlistName}</h2>  // Switch to input on click
      )}

      <Tracklist tracks={tracks} onAction={onRemove} actionLabel="➖" />

      <button onClick={savePlaylist} className={styles.button} disabled={isLoading}>
        {isLoading ? 'Saving...' : 'SAVE TO SPOTIFY'}
      </button>

      {isSaved && <p className={styles.confirmation}>Playlist saved successfully!</p>}
    </div>
  );
}

export default Playlist;
