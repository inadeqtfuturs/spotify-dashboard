import React from 'react';
import { useContainerSize } from '../../hooks';
import { randomWidth } from '../../utils';

function ArtistRow({ loading, index, image, name, genres }) {
  const container = useContainerSize();
  return (
    <div className={`grid grid-flow-row grid-cols-track-row gap-x-4 justify-between items-center w-full my-2 py-2 px-4 bg-white rounded-md shadow hover:shadow-md transition-shadow ${loading && `animate-pulse`}`}>
      <div className="flex items-center space-x-2 md:space-x-4">
        <div className={`${loading && `bg-gray-300 w-6 h-6`}`}>
          {!loading && (
            <p className="m-0 text-gray-800 font-semibold text-xs md:text-sm">
              {`${('0' + (index + 1)).slice(-2)}.`}
            </p>
          )}
        </div>
        <div className="h-0 pt-8 w-8 md:pt-16 md:w-16 relative rounded md:rounded-xl overflow-hidden">
          {loading ? (
            <div className="bg-gray-400 h-full absolute inset-0" />
          ) : (
            <div style={{ backgroundImage: `url(${image}`}} className="h-full bg-cover bg-center absolute inset-0" />
          )}
        </div>
      </div>
      <div className={`overflow-visible whitespace-nowrap md:truncate ${loading && `bg-gray-300 w-${randomWidth()}/12 h-6`}`}>
        {!loading && (
          <>
            <p className="m-0 text-gray-800 font-semibold text-xs md:text-lg">
              {name}
            </p>
            {container === 'sm' && (
              <p className="m-0 text-gray-500 text-sm md:text-md">
                {genres.slice(0, 2).join(', ')}
              </p>
            )}
          </>
        )}
      </div>
      <div className={`flex justify-end hidden md:contents ${loading && `bg-gray-300 w-12 h-6`}`}>
        {!loading && (
          <p className="m-0 text-gray-500 text-sm md:text-md">
            {genres.slice(0, 5).join(', ')}
          </p>
        )}
      </div>
    </div>
  );
}

ArtistRow.defaultProps = {
  loading: false
}

export default ArtistRow;
