import React, { useContext, useEffect, useState } from 'react';
import { getLayout, ArtistRow, Meta } from '@components/';
import { SpotifyContext } from '@contexts/SpotifyContext';

const INIT_STATE = 'short_term'
const DEFAULT_LIMIT = 20

function Artists() {
  const [loaded, setLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState(INIT_STATE);
  const { loading, getTopArtists, data, setData } = useContext(SpotifyContext);

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(async () => {
    const artistData = await getTopArtists(DEFAULT_LIMIT, INIT_STATE);
    setData({ [INIT_STATE]: artistData });
  }, []);

  async function fetchTerm(term) {
    if (term === activeTab) return;
    if (data.hasOwnProperty(term)) {
      setActiveTab(term);
      return
    };
    const fetchData = await getTopArtists(DEFAULT_LIMIT, term);
    setData({ ...data, [term]: fetchData });
    setActiveTab(term);
  }

  if (!loaded) return null;

  const isLoading = loading || !data || !data[activeTab];

  return (
    <>
      <Meta 
        title="Artists - Spotify Dashboard"
        href="/"
      />
      <div className="pt-4 lg:px-4 lg:py-8">
        <h1 className="text-3xl text-gray-700 font-semibold px-2 sm:px-4 lg:px-0">Top Artists</h1>
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
              <ArtistRow loading key={`i-${idx}`} />
            ))
          ) : (
            <>
            {data[activeTab].map(({ id, name, images, genres }, idx) => (
              <ArtistRow
                key={id}
                index={idx}
                name={name}
                image={images[0].url}
                genres={genres}
              />
            ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}

Artists.getLayout = getLayout;

export default Artists;
