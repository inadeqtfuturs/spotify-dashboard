import Head from 'next/head';

const TITLE = "Spotify Dashboard"
const DESC = "A dashboard for your favorite artists and recently played tracks"

function Meta({ title, href }) {
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
      <meta name="description" content={TITLE} />
      <meta property="og:type" content="website" />
      <meta name="og:title" property="og:title" content={TITLE} />
      <meta name="og:description" property="og:description" content={DESC} />
      <meta property="og:site_name" content={TITLE} />
      <meta property="og:url" content="" />  
      <meta name="twitter:card" content="summary" /> 
      <meta name="twitter:title" content={TITLE} />
      <meta name="twitter:description" content={DESC} />
      <meta name="twitter:site" content="@speculative_dev" />
      <meta name="twitter:creator" content="@speculative_dev" />
      <link rel="icon" type="image/png" href="/public/favicon.ico" />
      <link rel="apple-touch-icon" href="/public/favicon.ico" />
      <meta property="og:image" content="/public/ogImage.jpg" />
      <meta name="twitter:image" content="/public/ogImage.jpg" />
      <link rel="canonical" href={href} />
    </Head>
  );
}

Meta.defaultProps = {
  title: TITLE,
  href: '/'
}

export default Meta;
