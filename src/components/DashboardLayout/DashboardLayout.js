import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SpotifyContext } from '@contexts/SpotifyContext';

function DashboardButton({ href, children }) {
  const router = useRouter();

  const active = router.pathname === href;
  return (
    <Link href={href}>
      <a className={`text-sm lg:text-lg text-gray-600 py-1 px-2 lg:p-2 mx-1 lg:my-1 w-full text-center lg:text-left rounded-lg hover:bg-gray-300 transition-colors ${active && 'bg-gray-300'}`}>
        {children}
      </a>
    </Link>
  )
}

function DashboardLayout({ children }) {
  const [loaded, setLoaded] = useState(false);
  const { accessToken } = useContext(SpotifyContext);
  const router = useRouter();

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return null;

  const isAbout = router.pathname === '/about';

  if (accessToken) {
    return (
      <div className="flex flex-col-reverse lg:flex-row h-screen overflow-hidden">
        <div className="w-screen lg:w-1/6 p-2 lg:py-8 lg:px-4 bg-gray-200 lg:h-screen lg:z-10 shadow-2xl space-x-4 lg:space-x-0 lg:flex lg:flex-col lg:justify-between">
          <nav className="grid lg:flex grid-cols-4 justify-items-center lg:flex-row lg:flex-col">
            <DashboardButton href="/dashboard">Dashboard</DashboardButton>
            <DashboardButton href="/dashboard/artists">Artists</DashboardButton>
            <DashboardButton href="/dashboard/tracks">Tracks</DashboardButton>
            <DashboardButton href="/dashboard/recent">Recent</DashboardButton>
          </nav>
          <div className="hidden lg:contents">
            <DashboardButton href="/about">
              About{' '}
              <span role="img" aria-label="seedling">
                🌱
              </span>
            </DashboardButton>
          </div>
        </div>
        <main className={`flex flex-col justify-start lg:w-5/6 bg-gradient-to-b from-gray-50 to-gray-100 h-full overflow-scroll`} >
          {children}
          {!isAbout && (
            <div className="flex lg:hidden px-2 py-2 sm:px-4 justify-center">
              <Link href="/about">
                <a className="text-xs">
                  About this project{' '}
                  <span role="img" aria-label="seedling">
                    🌱
                  </span>
                </a>
              </Link>
            </div>
          )}
        </main>
      </div>
    );
  } else {
    return (
      <>{children}</>
    )
  }
}

export function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default DashboardLayout;
