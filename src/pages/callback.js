import { useContext } from 'react';
import { useRouter } from 'next/router'
import { Meta } from '@components';
import { SpotifyContext } from '@contexts/SpotifyContext';

const SPOTIFY_CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const basic = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');

const getAccessToken = async ({ code }) => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=authorization_code&code=${code}&redirect_uri=${REDIRECT_URI}`
  });

  return response.json();
};

function Callback({ resp }) {
  const { setAccessToken, setRefreshToken, accessToken, refreshToken } = useContext(SpotifyContext);
  const router = useRouter();
  if (resp.access_token) {
    setAccessToken(resp.access_token);
    setRefreshToken(resp.refresh_token);
    if (accessToken && refreshToken) {
      localStorage.setItem('accessToken', resp.access_token);
      localStorage.setItem('refreshToken', resp.refresh_token);
      router.push('/dashboard')
    }
  }

  return (
    <div className="grid grid-rows-home flex-col justify-center items-center h-screen bg-gray-100 index-bg">
      <Meta 
        title="Spotify Dashboard - Loading"
        href="/"
      />
      <span>one sec. redirecting... </span>
    </div>
  );
}

export default Callback;

Callback.getInitialProps = async (ctx) => {
  const { query: { code } } = ctx;
  if (code) {
    const resp = await getAccessToken({ code });
    return { resp }
  }
  return { resp: null }
}
