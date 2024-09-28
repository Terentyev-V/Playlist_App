import React, { useState } from 'react';
import SearchBar from './SearchBar';
import SearchResult from './SearchResult';
import Playlist from './Playlist';
import styles from './App.module.css'

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState('Enter Playlist Name');

  const handleSearch = (query) => {
    const dummyResults = [
      { id: 1, name: `Track 1 matching "${query}"`, artist: 'Artist 1', album: 'Album 1' },
      { id: 2, name: `Track 2 matching "${query}"`, artist: 'Artist 2', album: 'Album 2' },
      { id: 3, name: `Track 3 matching "${query}"`, artist: 'Artist 3', album: 'Album 3' },
    ];
    setSearchResults(dummyResults); // Update state with dummy results
  };

  const addTrackToPlaylist = (track) => {
    if (!playlistTracks.find((savedTrack) => savedTrack.id === track.id)) {
      setPlaylistTracks([...playlistTracks, track]);
    }
  };

  const removeTrackFromPlaylist = (track) => {
    setPlaylistTracks(playlistTracks.filter((savedTrack) => savedTrack.id !== track.id));
  };

  // Function to handle playlist name change
  const handleNameChange = (newName) => {
    setPlaylistName(newName); // Update the playlist name state
  };

  return (
    <div>
      <h1 className={styles.h1}>JAMMMING</h1>
      <SearchBar onSearch={handleSearch} />
      <div className={styles.div}>
        <SearchResult tracks={searchResults} onAdd={addTrackToPlaylist} />
        <Playlist
          name={playlistName}
          tracks={playlistTracks}
          onRemove={removeTrackFromPlaylist}
          onNameChange={handleNameChange} // Pass handleNameChange to Playlist component
        />
      </div>
    </div>
  );
}

export default App;
