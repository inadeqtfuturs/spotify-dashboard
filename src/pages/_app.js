import "tailwindcss/tailwind.css";
import { SpotifyProvider } from '@contexts/SpotifyContext';

import '@styles/styles.css';

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || (page => page);
  return (
    <SpotifyProvider>
      {getLayout(<Component {...pageProps} />)}
    </SpotifyProvider>
  )
}

export default MyApp;
