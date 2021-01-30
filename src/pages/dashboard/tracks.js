import React, { useContext, useEffect, useState } from 'react';
import { getLayout, Meta, TrackRow } from '@components/';
import { SpotifyContext } from '@contexts/SpotifyContext';

const INIT_STATE = 'short_term'
const DEFAULT_LIMIT = 20

function Tracks() {
  const [loaded, setLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState(INIT_STATE);
  const { loading, getTopTracks, data, setData } = useContext(SpotifyContext);

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(async () => {
    const trackData = await getTopTracks(DEFAULT_LIMIT, INIT_STATE);
    setData({ tracks: { [INIT_STATE]: trackData } });
  }, []);

  async function fetchTerm(term) {
    if (term === activeTab) return;
    if (data.tracks.hasOwnProperty(term)) {
      setActiveTab(term);
      return
    };
    const fetchData = await getTopTracks(DEFAULT_LIMIT, term);
    setData({ tracks: { ...data.tracks, [term]: fetchData } });
    setActiveTab(term);
  }

  if (!loaded) return null;

  const isLoading = loading || !data || !data.tracks || !data.tracks[activeTab];

  return (
    <>
      <Meta 
        title="Tracks - Spotify Dashboard"
        href="/"
      />
      <div className="pt-4 lg:px-4 lg:py-8">
        <h1 className="text-3xl text-gray-700 font-semibold px-2 sm:px-4 lg:px-0">Top Tracks</h1>
        <div className="grid grid-cols-3 mt-4 lg:mt-8 space-x-2 lg:space-x-4 px-2 sm:px-4 lg:px-0">
          <button 
            className={`py-2 lg:py-4 hover:bg-gray-300 active:bg-gray-300 rounded-md ${activeTab === 'short_term' && 'bg-gray-200'}`}
            onClick={() => fetchTerm('short_term')}
          >
            This Month
          </button>
          <button
            className={`py-2 lg:py-4 hover:bg-gray-300 active:bg-gray-300 rounded-md ${activeTab === 'medium_term' && 'bg-gray-200'}`}
            onClick={() => fetchTerm('medium_term')}
          >
            This Year
          </button>
          <button
            className={`py-2 lg:py-4 hover:bg-gray-300 active:bg-gray-300 rounded-md ${activeTab === 'long_term' && 'bg-gray-200'}`}
            onClick={() => fetchTerm('long_term')}
          >
            All Time
          </button>
        </div>
        <div className="px-2 sm:px-4 lg:px-0">
          {isLoading ? (
            Array(15).fill().map((i, idx) => (
              <TrackRow loading key={`i-${idx}`} />
            ))
          ) : (
            <>
            {data.tracks[activeTab].map(({ id, name, duration_ms, album: { artists, images } }, idx) => (
              <TrackRow
                key={id}
                index={idx}
                name={name}
                artists={artists}
                image={images[0].url}
                length={duration_ms}
              />
            ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}

Tracks.getLayout = getLayout;

export default Tracks;
