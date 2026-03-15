import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'Jethro JayTee — Systems Strategist';
const DEFAULT_DESCRIPTION = 'I help founders turn ambiguity into structure, direction, and leverage. Systems thinking, product strategy, and operational clarity.';

export function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '',
  type = 'website',
  image,
  article,
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const url = path ? `${window.location.origin}${path}` : window.location.href;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={SITE_NAME} />
      {image && <meta property="og:image" content={image} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}

      {/* Article metadata for notes */}
      {article?.publishedTime && <meta property="article:published_time" content={article.publishedTime} />}
      {article?.tags?.map((tag, i) => (
        <meta key={i} property="article:tag" content={tag} />
      ))}
    </Helmet>
  );
}
