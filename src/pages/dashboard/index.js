import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link'
import { getLayout, Card, Meta, TrackRow } from '@components';
import { SpotifyContext } from '@contexts/SpotifyContext';

function Dashboard() {
  const [loaded, setLoaded] = useState(false);
  const { accessToken, data, loading, initDashboard } = useContext(SpotifyContext);

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    initDashboard();
  }, [accessToken]);
  
  if (!loaded) return null;

  const isLoading = loading || !data || !data.artists || !data.tracks || !data.recent;

  // hook so that when data comes back null, we go back to login

  return (
    <>
      <Meta 
        title="Home - Spotify Dashboard"
        href="/"
      />
      <div className="pt-4 lg:px-4 lg:py-8">
        <h1 className="text-3xl text-gray-700 font-semibold px-2 sm:px-4 lg:px-0">Dashboard</h1>
        <div className="mt-4 mb-8">
          <div className="flex justify-between items-center mb-4 px-2 sm:px-4 lg:px-0">
            <h2 className="text-xl text-gray-700 font-semibold">Top Artists</h2>
            <Link href="/dashboard/artists">See more</Link>
          </div>
          <div 
            className="grid grid-cols-5-overflow lg:grid-cols-5 grid-flow-row gap-x-2 sm:gap-x-4 overflow-x-scroll md:overflow-auto"
          >
            {isLoading ? (
              <>
                {Array(5).fill().map((i, idx) => (
                  <Card loading key={`i-${idx}`} /> 
                ))}
              </>
            ) : (
              <>
                {data.artists.map(({ id, name, images }) => (
                  <Card type="artist" key={id} info={{ name, image: images[0].url }} />
                ))}
              </>
            )}
          </div>
        </div>

        <div className="mt-4 mb-8">
          <div className="flex justify-between items-center mb-4 px-2 sm:px-4 lg:px-0">
            <h2 className="text-xl text-gray-700 font-semibold">Top Tracks</h2>
            <Link href="/dashboard/tracks">See more</Link>
          </div>
          <div className="grid grid-cols-5-overflow lg:grid-cols-5 grid-flow-row gap-x-2 sm:gap-x-4 overflow-x-scroll md:overflow-auto">
            {isLoading ? (
              <>
                {Array(5).fill().map((i, idx) => (
                  <Card loading key={`i-${idx}`} /> 
                ))}
              </>
            ) : (
              <>
                {data.tracks.map(({ id, name, album: { artists, images, name: albumName } }) => (
                  <Card type="track" key={id} info={{ name, artists, albumName, image: images[0].url }} />
                ))}
              </>
            )}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4 px-2 sm:px-4 lg:px-0">
            <h2 className="text-xl text-gray-700 font-semibold">Top Tracks</h2>
            <Link href="/dashboard/recent">See more</Link>
          </div>
          <div className="px-2 sm:px-4 lg:px-0">
            {isLoading ? (
              <>
                {Array(10).fill().map(
                  (i, idx) => (
                    <TrackRow loading key={`i-${idx}`} />
                  )
                )}
              </>
            ) : (
              <>
                {data.recent.map(({ track: { id, name, duration_ms, album: { artists, images, } } }, index) => (
                  <TrackRow
                    key={id}
                    index={index}
                    name={name}
                    image={images[0].url}
                    artists={artists}
                    length={duration_ms}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

Dashboard.getLayout = getLayout;

export default Dashboard;
