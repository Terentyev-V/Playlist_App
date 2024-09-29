const clientId = 'f82e090e4f6b427993467bd26c22769c'; 
const redirectUri = 'https://terentyev-v.github.io/Playlist_App/'; 
let accessToken;
let expiresIn;

const Spotify = {
  // Get access token
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const tokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (tokenMatch && expiresInMatch) {
      accessToken = tokenMatch[1];
      expiresIn = Number(expiresInMatch[1]);

      window.setTimeout(() => (accessToken = ''), expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public playlist-modify-private&redirect_uri=${encodeURIComponent(redirectUri)}`;
      window.location = accessUrl;
    }
  },

  // Search for tracks
  search(term) {
    const accessToken = Spotify.getAccessToken();
    if (!term) {
      return Promise.reject('Search term is empty.');
    }
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch search results');
        }
        return response.json();
      })
      .then(jsonResponse => {
        if (!jsonResponse.tracks) {
          return [];
        }
        return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }));
      })
      .catch(error => {
        console.error('Error fetching search results:', error);
      });
  },

  // Save a playlist
  savePlaylist(playlistName, trackUris) {
    if (!playlistName || !trackUris.length) {
      return;
    }

    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' };
    let userId;

    // Step 1: Get the User's Spotify ID
    return fetch('https://api.spotify.com/v1/me', { headers: headers })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch user ID');
        }
        return response.json();
      })
      .then(jsonResponse => {
        userId = jsonResponse.id;

        // Step 2: Create a New Playlist
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({
            name: playlistName,
            description: 'Created via Jammming app',
            public: true // true the playlist - public, false - private
          })
        });
      })
      .then(response => {
        if (!response.ok) {
          return response.json().then(errorData => {
            console.error('Error creating playlist:', errorData);
            throw new Error('Failed to create playlist');
          });
        }
        return response.json();
      })
      .then(jsonResponse => {
        const playlistId = jsonResponse.id;

        // Step 3: Add Tracks to the Playlist
        return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({
            uris: trackUris
          })
        });
      })
      .then(response => {
        if (!response.ok) {
          return response.json().then(errorData => {
            console.error('Error adding tracks to playlist:', errorData);
            throw new Error('Failed to add tracks to playlist');
          });
        }
        return response.json();
      })
      .catch(error => {
        console.error('Error saving playlist:', error);
      });
  }
};

export default Spotify;
