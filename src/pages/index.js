import Link from 'next/link';
import { Meta } from '@components';

const SPOTIFY_CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;
const SCOPE = process.env.NEXT_PUBLIC_SCOPE;

export default function Home() {

  return (
    <div className="grid grid-rows-home flex-col justify-center items-center h-screen bg-gray-100 index-bg">
      <Meta 
        title="Spotify Dashboard"
        href="/"
      />

      <main className="flex flex-col px-4 items-center max-w-md	">
        <h1 className="text-2xl mb-4 text-gray-700 font-semibold">
          Welcome to Spotify Dashboard
        </h1>

        <p className="mb-8 text-center">
          Spotify Dashboard provides an overview of your listening
          habits. Get your favorite tracks and artists, and view a
          list of your most recent tracks.
        </p>

        <Link href="/about">
          <a
            className="w-full rounded-lg bg-gray-300 text-gray-800 p-2 mb-2 text-center shadow hover:shadow-sm transition-shadow"
          >
              about
          </a>
        </Link>
        <a
          className="w-full rounded-lg bg-green-500 text-white p-2 text-center shadow hover:shadow-sm transition-shadow"
          href={`https://accounts.spotify.com/authorize/?client_id=${SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}`}
        >
            login
        </a>

        <p className="text-xs text-center mt-4">
          Use this link to authorize Spotify's API. We request access
          to your top artists, top tracks, and recent tracks. You can
          read more about Spotify's API{' '}
          <a className="underline text-gray-700" href="https://developer.spotify.com/documentation/">here</a>.
        </p>

      </main>

      <footer className="text-xs text-center">
        <a href="https://github.com/inadeqtfuturs/" target="_blank">
          dev / design by {' '}
          <span role="img" aria-label="seedling">
            🌱
          </span>
        </a>
      </footer>
    </div>
  )
}
