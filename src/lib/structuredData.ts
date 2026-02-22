const siteUrl = 'https://desiremap.de'

const listingSchemas = [
  { '@type': 'LocalBusiness', '@id': `${siteUrl}/#listing-1`, name: 'Artemis', description: 'Berlins größtes FKK Club', telephone: '+49 30 123456', address: { '@type': 'PostalAddress', addressLocality: 'Berlin', addressCountry: 'DE' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: 4.8, reviewCount: 1247 } },
  { '@type': 'LocalBusiness', '@id': `${siteUrl}/#listing-2`, name: 'Pascha', description: 'Europas größtes Laufhaus', telephone: '+49 221 123456', address: { '@type': 'PostalAddress', addressLocality: 'Köln', addressCountry: 'DE' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: 4.6, reviewCount: 892 } },
  { '@type': 'LocalBusiness', '@id': `${siteUrl}/#listing-3`, name: 'Café del Sol', description: 'Exklusives Bordell Hamburg', telephone: '+49 40 123456', address: { '@type': 'PostalAddress', addressLocality: 'Hamburg', addressCountry: 'DE' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: 4.5, reviewCount: 423 } },
  { '@type': 'LocalBusiness', '@id': `${siteUrl}/#listing-4`, name: 'Paradise', description: 'Premium FKK Stuttgart', telephone: '+49 711 123456', address: { '@type': 'PostalAddress', addressLocality: 'Stuttgart', addressCountry: 'DE' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: 4.7, reviewCount: 678 } },
  { '@type': 'LocalBusiness', '@id': `${siteUrl}/#listing-5`, name: 'Royal', description: 'Laufhaus München', telephone: '+49 89 123456', address: { '@type': 'PostalAddress', addressLocality: 'München', addressCountry: 'DE' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: 4.4, reviewCount: 312 } },
  { '@type': 'LocalBusiness', '@id': `${siteUrl}/#listing-6`, name: 'Diamond', description: 'VIP Frankfurt', telephone: '+49 69 123456', address: { '@type': 'PostalAddress', addressLocality: 'Frankfurt', addressCountry: 'DE' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: 4.6, reviewCount: 534 } }
]

function getOrganizationSchema() {
  return {
    '@type': 'Organization' as const,
    '@id': `${siteUrl}/#organization`,
    name: 'DesireMap',
    url: siteUrl,
    logo: { '@type': 'ImageObject' as const, url: `${siteUrl}/logo.svg`, width: 200, height: 60 },
    contactPoint: {
      '@type': 'ContactPoint' as const,
      telephone: '+49-30-123456',
      contactType: 'customer service',
      areaServed: 'DE',
      availableLanguage: ['German', 'English', 'Turkish', 'Arabic']
    }
  }
}

function getWebSiteSchema(locales: string[]) {
  return {
    '@type': 'WebSite' as const,
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: 'DesireMap',
    description: 'Deutschlands führendes Verzeichnis für exklusive Erotik-Clubs, Bordelle und FKK-Saunen',
    publisher: { '@id': `${siteUrl}/#organization` },
    inLanguage: locales,
    potentialAction: {
      '@type': 'SearchAction' as const,
      target: { '@type': 'EntryPoint' as const, urlTemplate: `${siteUrl}/de/search?q={search_term_string}` },
      'query-input': 'required name=search_term_string'
    }
  }
}

function getWebPageSchema(locale: string, title: string, description: string) {
  const pageUrl = `${siteUrl}/${locale}`
  return {
    '@type': 'WebPage' as const,
    '@id': `${pageUrl}/#webpage`,
    url: pageUrl,
    name: title,
    description,
    isPartOf: { '@id': `${siteUrl}/#website` },
    about: { '@id': `${siteUrl}/#organization` },
    inLanguage: locale,
    primaryImageOfPage: { '@type': 'ImageObject' as const, url: `${siteUrl}/hero-bg.jpg`, width: 1200, height: 630 }
  }
}

function getBreadcrumbSchema(locale: string) {
  const pageUrl = `${siteUrl}/${locale}`
  return {
    '@type': 'BreadcrumbList' as const,
    '@id': `${pageUrl}/#breadcrumb`,
    itemListElement: [{ '@type': 'ListItem' as const, position: 1, name: 'Home', item: pageUrl }]
  }
}

function getItemListSchema() {
  return {
    '@type': 'ItemList' as const,
    '@id': `${siteUrl}/#featured-listings`,
    name: 'Featured Listings',
    numberOfItems: listingSchemas.length,
    itemListElement: listingSchemas.map((item, index) => ({ '@type': 'ListItem' as const, position: index + 1, item }))
  }
}

export function getStructuredData(locale: string, title: string, description: string, locales: string[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      getOrganizationSchema(),
      getWebSiteSchema(locales),
      getWebPageSchema(locale, title, description),
      getBreadcrumbSchema(locale),
      getItemListSchema()
    ]
  }
}
