import React, { useState, useEffect, useReducer } from 'react'
import { DateTime } from 'luxon';

const TOP_ENDPOINT = `https://api.spotify.com/v1/me/top/`;
const RECENT_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played/`;

const SpotifyContext = React.createContext();

const initialToken = process.browser ? localStorage.getItem('accessToken') || '' : '';

const SpotifyProvider = (props) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState(initialToken);
  const [refreshToken, setRefreshToken] = useState('');

  async function initDashboard() {
    try {
      setLoading(true);
      const response = await Promise.all([getTopTracks(), getTopArtists(), getRecent()]);
      const respObj = { tracks: response[0], artists: response[1], recent: response[2] }
      setData(respObj);
    } catch(e) {
      console.log('error', e);
    } finally {
      setLoading(false);
    }
  }

  async function getTopTracks(limit = 5, time_range='long_term') {
    try {
      setLoading(true);
      const response = await fetch(`${TOP_ENDPOINT}tracks?limit=${limit}&time_range=${time_range}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    
      const { items } = await response.json()
      return items;
    } catch(e) {
      console.log('error', e);
    } finally {
      setLoading(false);
    }
  }

  async function getTopArtists(limit = 5, time_range='long_term') {
    try {
      setLoading(true);
      const response = await fetch(`${TOP_ENDPOINT}artists?limit=${limit}&time_range=${time_range}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    
      const { items } = await response.json()
      return items;
    } catch(e) {
      console.log('error', e);
    } finally {
      setLoading(false);
    }
  }

  async function getRecent(limit = 10) {
    try {
      setLoading(true);
      const now = DateTime.local().toMillis();

      const response = await fetch(`${RECENT_ENDPOINT}?before=${now}&limit=${limit}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      const { items } = await response.json();
      return items;
    } catch(e) {
      console.log('error', e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SpotifyContext.Provider
      value={{
        data,
        setData,
        loading,
        refreshToken,
        setRefreshToken,
        accessToken,
        setAccessToken,
        getTopTracks,
        getTopArtists,
        getRecent,
        initDashboard
      }}
    >
      {props.children}
    </SpotifyContext.Provider>
  )
}

const SpotifyConsumer = SpotifyContext.Consumer;

export { SpotifyContext, SpotifyProvider, SpotifyConsumer };
