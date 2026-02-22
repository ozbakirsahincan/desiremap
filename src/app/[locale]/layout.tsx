import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Toaster } from '@/components/ui/toaster'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })
const siteUrl = 'https://desiremap.de'
const locales = ['de', 'en', 'ar', 'tr']

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#0a0a0f' }

const localeTitles: Record<string, string> = { de: 'DesireMap - Premium Erotik Guide Deutschland', en: 'DesireMap - Premium Erotic Guide Germany', tr: 'DesireMap - Almanya Erotik Rehberi', ar: 'DesireMap - دليل الإروتيك الألماني' }
const localeDescriptions: Record<string, string> = { de: 'Exklusive FKK Clubs, Bordelle und Laufhäuser in Deutschland. Diskrete, verifizierte Adressen.', en: 'Exclusive FKK clubs, brothels and laufhaus in Germany. Discreet, verified addresses.', tr: 'Almanya\'da özel FKK kulüpleri, genelevler ve laufhaus. Gizli, doğrulanmış adresler.', ar: 'أندية FKK حصرية وبيوت الدعارة في ألمانيا. عناوين سرية وموثقة.' }
const ogLocales: Record<string, string> = { de: 'de_DE', en: 'en_US', ar: 'ar_SA', tr: 'tr_TR' }

function getLocaleData(locale: string) {
  return { title: localeTitles[locale] || localeTitles.de, description: localeDescriptions[locale] || localeDescriptions.de, ogLocale: ogLocales[locale] || ogLocales.de }
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const { title, description, ogLocale } = getLocaleData(locale)
  return {
    metadataBase: new URL(siteUrl),
    title: { default: title, template: '%s | DesireMap' },
    description,
    alternates: { canonical: `/${locale}`, languages: { de: '/de', en: '/en', tr: '/tr', ar: '/ar', 'x-default': '/de' } },
    openGraph: { type: 'website', locale: ogLocale, url: `${siteUrl}/${locale}`, siteName: 'DesireMap', title, description, images: [{ url: '/hero-bg.jpg', width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title, description, images: ['/hero-bg.jpg'] }
  }
}

export function generateStaticParams() { return locales.map((locale) => ({ locale })) }

const listingSchemas = [
  { '@type': 'LocalBusiness', '@id': `${siteUrl}/#listing-1`, name: 'Artemis', description: 'Berlins größtes FKK Club', telephone: '+49 30 123456', address: { '@type': 'PostalAddress', addressLocality: 'Berlin', addressCountry: 'DE' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: 4.8, reviewCount: 1247 } },
  { '@type': 'LocalBusiness', '@id': `${siteUrl}/#listing-2`, name: 'Pascha', description: 'Europas größtes Laufhaus', telephone: '+49 221 123456', address: { '@type': 'PostalAddress', addressLocality: 'Köln', addressCountry: 'DE' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: 4.6, reviewCount: 892 } },
  { '@type': 'LocalBusiness', '@id': `${siteUrl}/#listing-3`, name: 'Café del Sol', description: 'Exklusives Bordell Hamburg', telephone: '+49 40 123456', address: { '@type': 'PostalAddress', addressLocality: 'Hamburg', addressCountry: 'DE' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: 4.5, reviewCount: 423 } },
  { '@type': 'LocalBusiness', '@id': `${siteUrl}/#listing-4`, name: 'Paradise', description: 'Premium FKK Stuttgart', telephone: '+49 711 123456', address: { '@type': 'PostalAddress', addressLocality: 'Stuttgart', addressCountry: 'DE' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: 4.7, reviewCount: 678 } },
  { '@type': 'LocalBusiness', '@id': `${siteUrl}/#listing-5`, name: 'Royal', description: 'Laufhaus München', telephone: '+49 89 123456', address: { '@type': 'PostalAddress', addressLocality: 'München', addressCountry: 'DE' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: 4.4, reviewCount: 312 } },
  { '@type': 'LocalBusiness', '@id': `${siteUrl}/#listing-6`, name: 'Diamond', description: 'VIP Frankfurt', telephone: '+49 69 123456', address: { '@type': 'PostalAddress', addressLocality: 'Frankfurt', addressCountry: 'DE' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: 4.6, reviewCount: 534 } }
]

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'Organization', '@id': `${siteUrl}/#organization`, name: 'DesireMap', url: siteUrl, logo: `${siteUrl}/logo.svg` },
    { '@type': 'WebSite', '@id': `${siteUrl}/#website`, url: siteUrl, name: 'DesireMap', publisher: { '@id': `${siteUrl}/#organization` }, potentialAction: { '@type': 'SearchAction', target: `${siteUrl}/?q={search_term_string}`, 'query-input': 'required name=search_term_string' } },
    { '@type': 'ItemList', '@id': `${siteUrl}/#featured-listings`, name: 'Featured Listings', itemListElement: listingSchemas.map((item, index) => ({ '@type': 'ListItem', position: index + 1, item })) }
  ]
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!locales.includes(locale)) {
    notFound()
  }

  const messages = await getMessages({ locale })

  return (
    <html lang={locale} className="dark" suppressHydrationWarning dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <NextIntlClientProvider messages={messages}>
          {children}
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
