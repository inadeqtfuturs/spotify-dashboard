import React from 'react';

function Card({ loading, type, info }) {
  return (
    <div className="grid auto-rows-min">
      <div className="h-0 pt-100 relative rounded-xl lg:rounded-3xl overflow-hidden shadow hover:shadow-lg transition-shadow">
        {loading && (
          <div className={`bg-gray-200 h-full absolute inset-0 ${loading && `animate-pulse`}`} />
        )}
        {!loading && (
          <div style={{ backgroundImage: `url(${info.image}`}} className="h-full bg-cover bg-center absolute inset-0" />
        )}
      </div>
      <div className="mt-4 truncate">
        <div className={`${loading && `bg-gray-300 w-8/12 h-6`} truncate`}>
          {!loading && (
            <p className="m-0 text-gray-700 font-semibold text-xs md:text-md lg:text-md">{type === 'more' ? 'show more...' : info.name}</p>
          )}
        </div>
        {type === 'track' && (
          <div className={`${loading && `bg-gray-300 w-8/12 h-6 mt-2`} truncate`}>
            {!loading && (
              <p className="m-0 text-gray-500 text-xs">{info.artists.map(artist => artist.name).join(', ')}</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

Card.defaultProps = {
  loading: false
}

export default Card;
