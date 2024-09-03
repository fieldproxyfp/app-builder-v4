import { useEffect, useState } from 'react';
import { Helmet, HelmetData } from 'react-helmet-async';

type HeadProps = {
  title?: string;
  description?: string;
};

const helmetData = new HelmetData({});

const getFaviconPath = (isDarkMode = false) => {
  return `/favicon${isDarkMode ? '-dark' : ''}.ico`;
};

export const Head = ({ title = '', description = '' }: HeadProps = {}) => {
  const [faviconHref, setFaviconHref] = useState('/favicon-light.png');

  useEffect(() => {
    // Get current color scheme.
    const matcher = window.matchMedia('(prefers-color-scheme: dark)');
    // Set favicon initially.
    setFaviconHref(getFaviconPath(matcher.matches));
    // Change favicon if the color scheme changes.
    matcher.onchange = () => setFaviconHref(getFaviconPath(matcher.matches));
  }, [faviconHref]);

  return (
    <Helmet
      helmetData={helmetData}
      title={title ? `${title} | Fieldproxy` : undefined}
      defaultTitle="Fieldproxy"
    >
      <meta name="description" content={description} />
      <link rel="icon" href={faviconHref} />

    </Helmet>
  );
};
