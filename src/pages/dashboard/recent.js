import React, { useContext, useEffect, useState } from 'react';
import { getLayout, Meta, TrackRow } from '@components/';
import { SpotifyContext } from '@contexts/SpotifyContext';

const DEFAULT_LIMIT = 50;

function Recent() {
  const [loaded, setLoaded] = useState(false);
  const { loading, getRecent, data, setData } = useContext(SpotifyContext);

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(async () => {
    const trackData = await getRecent(DEFAULT_LIMIT);
    setData({ trackData });
  }, []);

  if (!loaded) return null;

  const isLoading = loading || !data || !data.trackData

  return (
    <>
      <Meta 
        title="Recent - Spotify Dashboard"
        href="/"
      />
      <div className="pt-4 lg:px-4 lg:py-8">
        <h1 className="text-3xl text-gray-700 font-semibold px-2 sm:px-4 lg:px-0">Recently Played</h1>
        <div className="mt-4 lg:mt-8 px-2 sm:px-4 lg:px-0">
          {isLoading ? (
            Array(15).fill().map((i, idx) => (
              <TrackRow loading key={`i-${idx}`} />
            ))
          ) : (
            <>
            {data.trackData.map(({ track: { id, name, duration_ms, album: { artists, images } } }, idx) => (
              <TrackRow
                key={`${id}-${idx}`}
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

Recent.getLayout = getLayout;

export default Recent;
