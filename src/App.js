import React, { useState } from 'react';
import SearchBar from './SearchBar';
import SearchResult from './SearchResult';
import Playlist from './Playlist';
import Spotify from './Spotify';
import styles from './App.module.css';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState("Teren's Playlist");

  const handleSearch = (term) => {
    Spotify.search(term).then((tracks) => {
      setSearchResults(tracks);
    });
  };

  const addTrackToPlaylist = (track) => {
    if (!playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      setPlaylistTracks([...playlistTracks, track]);
    }
  };

  const removeTrackFromPlaylist = (track) => {
    setPlaylistTracks(playlistTracks.filter(savedTrack => savedTrack.id !== track.id));
  };

  const handleNameChange = (newName) => {
    setPlaylistName(newName);
  };

  const handleResetPlaylist = () => {
    setPlaylistTracks([]);
    setPlaylistName('Enter Playlist Name');
  };

  return (
    <div>
      <h1 className={styles.h1}>Jammming</h1>
      <h3 className={styles.h3}>by BlackT</h3>
      <SearchBar onSearch={handleSearch} />
      <div className={styles.div}>
      <SearchResult tracks={searchResults} onAdd={addTrackToPlaylist} />
      <Playlist
        name={playlistName}
        tracks={playlistTracks}
        onRemove={removeTrackFromPlaylist}
        onNameChange={handleNameChange}
        onReset={handleResetPlaylist}
      />
      </div>
    </div>
  );
}

export default App;
