import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link'
import { getLayout, Meta } from '@components';
import { SpotifyContext } from '@contexts/SpotifyContext';

function About() {
  const [loaded, setLoaded] = useState(false);
  const { accessToken } = useContext(SpotifyContext);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return null;

  return (
    <div className="grid grid-rows-home flex-col justify-center items-center h-screen bg-gray-100 index-bg">
      <Meta 
        title="About - Spotify Dashboard"
        href="/"
      />

      <main className="flex flex-col px-4 max-w-md">
        <h1 className="text-2xl mb-4 text-gray-700 font-semibold">
          About Spotify Dashboard
        </h1>

        <p className="mb-2 text-lg">
          Spotify Dashboard was built with:
        </p>

        <ul className="list-disc list-inside text-gray-700">
          <li>
            <a className="underline" href="https://nextjs.org/" target="_blank">Next JS</a>
          </li>
          <li>
            <a className="underline" href="https://developer.spotify.com/documentation/web-api/" target="_blank">Spotify's API</a>
          </li>
          <li>
            <a className="underline" href="https://tailwindcss.com/" target="_blank">Tailwind</a>
          </li>
        </ul>

        <p className="text-xs mt-4">
          Originally envisioned as aggregator of weekly spotify statistics,
          this dashboard emerged due to the limits of Spotify's 'Recently Played'
          endpoint. In the meantime, you can use it to get an overview of your
          listening habits.
        </p>

        <p className="text-xs mt-4">
          This dashboard has no analytics and collects no personal data. The
          token authorized to make API calls is stored in state and localStorage.
        </p>

        <p className="text-xs mt-4 mb-8">
          Have fun and happy listening{' '}
          <span role="img" aria-label="peace sign">
            ✌️
          </span>
        </p>

        {!accessToken && (
          <Link href="/">
            <a
              className="w-full rounded-lg bg-green-500 text-white p-2 text-center shadow hover:shadow-sm transition-shadow"
            >
              back home
            </a>
          </Link>
        )}

      </main>

      <aside className="text-xs text-center">
        <a href="https://github.com/inadeqtfuturs/" target="_blank">
          dev / design by {' '}
          <span role="img" aria-label="seedling">
            🌱
          </span>
        </a>
      </aside>
    </div>
  )
}

About.getLayout = getLayout;

export default About;
