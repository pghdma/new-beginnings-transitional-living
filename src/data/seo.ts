import { site } from './site';

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export interface FaqEntry {
  question: string;
  answer: string;
}

export interface SeoRoute {
  documentTitle: string;
  description: string;
  pageName: string;
  pageType: 'WebPage' | 'AboutPage' | 'ContactPage' | 'ProfilePage' | 'CollectionPage' | 'FAQPage';
  image: string;
  imageAlt: string;
  breadcrumbs: BreadcrumbItem[];
  entity?: 'organization' | 'board' | 'recovery-housing' | 'mens-housing' | 'womens-housing' | 'contact';
}

const home = { name: 'Home', path: '/' };
const about = { name: 'About', path: '/about/' };
const board = { name: 'Board of Directors', path: '/about/board/' };
const housing = { name: 'Recovery Housing', path: '/recovery-housing/' };

export const seoRoutes: Record<string, SeoRoute> = {
  '/': {
    documentTitle: 'Recovery Housing in Pittsburgh | New Beginnings Sober Living',
    description: 'DDAP-licensed sober living homes for men and women in Pittsburgh. Nonprofit recovery housing in Sheraden, Brighton Heights, McKees Rocks, and Bellevue. Call 412-628-0403.',
    pageName: 'New Beginnings Transitional Living Foundation',
    pageType: 'WebPage',
    image: '/images/og-default.jpg',
    imageAlt: 'New Beginnings recovery housing in Pittsburgh',
    breadcrumbs: [],
    entity: 'organization',
  },
  '/about/': {
    documentTitle: 'About New Beginnings | Nonprofit Sober Living in Pittsburgh',
    description: 'New Beginnings is a Pittsburgh 501(c)(3) founded in 2016 by counselor Susan Rua to run safe, licensed recovery housing for men and women. Here’s who we are.',
    pageName: 'About New Beginnings',
    pageType: 'AboutPage',
    image: '/images/social/about.jpg',
    imageAlt: 'Pittsburgh rowhouses in a residential neighborhood',
    breadcrumbs: [home, about],
    entity: 'organization',
  },
  '/about/board/': {
    documentTitle: 'Board of Directors | New Beginnings Pittsburgh',
    description: 'Meet the board responsible for New Beginnings Transitional Living Foundation, a Pittsburgh nonprofit that runs licensed recovery housing for men and women.',
    pageName: 'Board of Directors',
    pageType: 'CollectionPage',
    image: '/images/social/board.jpg',
    imageAlt: 'An empty meeting table prepared for a board conversation',
    breadcrumbs: [home, about, board],
    entity: 'board',
  },
  '/about/transparency/': {
    documentTitle: 'Credentials & Licensing | New Beginnings Pittsburgh',
    description: 'Check New Beginnings yourself: 501(c)(3) status, Pennsylvania DDAP recovery house license, WestPARR certification, and IRS filings, with links to each public record.',
    pageName: 'Credentials and Licensing',
    pageType: 'AboutPage',
    image: '/images/social/transparency.jpg',
    imageAlt: 'A professional meeting table with public-record paperwork',
    breadcrumbs: [home, about, { name: 'Credentials and Licensing', path: '/about/transparency/' }],
    entity: 'organization',
  },
  '/recovery-housing/': {
    documentTitle: 'How Recovery Housing Works | Sober Living in Pittsburgh',
    description: 'What a sober living house is and how New Beginnings’ Pittsburgh recovery houses run: substance free, AA and NA based, drug screens, curfew, and a weekly house meeting.',
    pageName: 'Recovery Housing',
    pageType: 'WebPage',
    image: '/images/social/recovery-housing.jpg',
    imageAlt: 'A comfortable shared living room in a residential home',
    breadcrumbs: [home, housing],
    entity: 'recovery-housing',
  },
  '/recovery-housing/men/': {
    documentTitle: 'Men’s Sober Living in Pittsburgh | New Beginnings',
    description: 'DDAP-licensed recovery houses for men in McKees Rocks, Observatory Hill, Brighton Heights, and Sheraden, including one for men on parole. Call 412-628-0403.',
    pageName: 'Men’s Recovery Housing',
    pageType: 'FAQPage',
    image: '/images/social/mens-housing.jpg',
    imageAlt: 'A quiet, sunlit room in a residential home',
    breadcrumbs: [home, housing, { name: 'Men’s Recovery Housing', path: '/recovery-housing/men/' }],
    entity: 'mens-housing',
  },
  '/recovery-housing/women/': {
    documentTitle: 'Women’s Sober Living in Pittsburgh | New Beginnings',
    description: 'A DDAP-licensed recovery house for women in Bellevue, just north of Pittsburgh, with privacy, structure, and housemates in recovery. AA and NA based. Call 412-628-0403.',
    pageName: 'Women’s Recovery Housing',
    pageType: 'FAQPage',
    image: '/images/social/womens-housing.jpg',
    imageAlt: 'A bright shared bedroom in a residential home',
    breadcrumbs: [home, housing, { name: 'Women’s Recovery Housing', path: '/recovery-housing/women/' }],
    entity: 'womens-housing',
  },
  '/admissions/': {
    documentTitle: 'Apply for Recovery Housing in Pittsburgh | New Beginnings',
    description: 'Apply for a bed in a New Beginnings sober living house for men or women in Pittsburgh, or call 412-628-0403. No referral needed. We call you back.',
    pageName: 'Admissions',
    pageType: 'WebPage',
    image: '/images/social/admissions.jpg',
    imageAlt: 'A welcoming teal front door at a residential home',
    breadcrumbs: [home, { name: 'Admissions', path: '/admissions/' }],
  },
  '/referrals/': {
    documentTitle: 'Refer a Client to Recovery Housing in Pittsburgh | New Beginnings',
    description: 'How discharge planners, counselors, case managers, and probation and parole officers can place a client in DDAP-licensed sober living in Pittsburgh.',
    pageName: 'For Professionals',
    pageType: 'FAQPage',
    image: '/images/social/referrals.jpg',
    imageAlt: 'A bright shared bedroom in a residential home',
    breadcrumbs: [home, { name: 'For Professionals', path: '/referrals/' }],
  },
  '/support-us/': {
    documentTitle: 'Donate to Recovery Housing in Pittsburgh | New Beginnings',
    description: 'Help keep a sober house open in Pittsburgh. Give once or monthly to New Beginnings, a 501(c)(3) that runs licensed recovery housing for men and women.',
    pageName: 'Support New Beginnings',
    pageType: 'WebPage',
    image: '/images/social/support.jpg',
    imageAlt: 'Pittsburgh rowhouses in a residential neighborhood',
    breadcrumbs: [home, { name: 'Support New Beginnings', path: '/support-us/' }],
  },
  '/contact/': {
    documentTitle: 'Contact New Beginnings | Recovery Housing in Pittsburgh',
    description: 'Call 412-628-0403 or send a message to New Beginnings about a bed in one of our Pittsburgh sober living houses, a client referral, a donation, or anything else.',
    pageName: 'Contact New Beginnings',
    pageType: 'ContactPage',
    image: '/images/social/contact.jpg',
    imageAlt: 'A bright shared dining and living space',
    breadcrumbs: [home, { name: 'Contact', path: '/contact/' }],
    entity: 'contact',
  },
  '/privacy/': {
    documentTitle: 'Privacy Policy | New Beginnings',
    description: 'How the New Beginnings website handles inquiry information, technical data, sensitive information, and residence privacy.',
    pageName: 'Privacy Policy',
    pageType: 'WebPage',
    image: '/images/og-default.jpg',
    imageAlt: 'New Beginnings recovery housing in Pittsburgh',
    breadcrumbs: [home, { name: 'Privacy Policy', path: '/privacy/' }],
  },
  '/accessibility/': {
    documentTitle: 'Accessibility Statement | New Beginnings',
    description: 'The accessibility commitment, supported features, known limitations, and contact options for the New Beginnings website.',
    pageName: 'Accessibility Statement',
    pageType: 'WebPage',
    image: '/images/og-default.jpg',
    imageAlt: 'New Beginnings recovery housing in Pittsburgh',
    breadcrumbs: [home, { name: 'Accessibility Statement', path: '/accessibility/' }],
  },
  '/terms/': {
    documentTitle: 'Terms of Use | New Beginnings',
    description: 'The terms governing use of the New Beginnings website, including informational scope, privacy, external links, and residence safety.',
    pageName: 'Terms of Use',
    pageType: 'WebPage',
    image: '/images/og-default.jpg',
    imageAlt: 'New Beginnings recovery housing in Pittsburgh',
    breadcrumbs: [home, { name: 'Terms of Use', path: '/terms/' }],
  },
  '/404/': {
    documentTitle: 'Page Not Found | New Beginnings',
    description: 'The page you requested could not be found. Return to the New Beginnings homepage or choose another page.',
    pageName: 'Page Not Found',
    pageType: 'WebPage',
    image: '/images/og-default.jpg',
    imageAlt: 'New Beginnings recovery housing in Pittsburgh',
    breadcrumbs: [],
  },
};

export const normalizePathname = (pathname: string) => {
  if (pathname === '/404.html') return '/404/';
  if (pathname === '/') return '/';
  return `${pathname.replace(/\/+$/, '')}/`;
};

const absolute = (path: string) => new URL(path, site.url).toString();

const serviceArea = [
  { '@type': 'City', name: 'Pittsburgh', sameAs: 'https://en.wikipedia.org/wiki/Pittsburgh' },
  { '@type': 'Place', name: 'Sheraden, Pittsburgh' },
  { '@type': 'Place', name: 'Observatory Hill, Pittsburgh' },
  { '@type': 'Place', name: 'Brighton Heights, Pittsburgh' },
  { '@type': 'Place', name: 'McKees Rocks, Pennsylvania' },
  { '@type': 'Place', name: 'Bellevue, Pennsylvania' },
  { '@type': 'AdministrativeArea', name: 'Allegheny County, Pennsylvania' },
];

export function buildStructuredData(route: SeoRoute, canonical: string, lastReviewed?: string, faq?: FaqEntry[]) {
  const organizationId = `${site.url}/#organization`;
  const websiteId = `${site.url}/#website`;
  const webpageId = `${canonical}#webpage`;
  const imageId = `${canonical}#primaryimage`;
  const graph: Record<string, unknown>[] = [];

  const organization = {
    '@type': 'Organization',
    '@id': organizationId,
    name: site.name,
    legalName: site.name,
    alternateName: [site.shortName, 'New Beginnings Transitional Living'],
    url: site.url,
    description: site.description,
    foundingDate: '2016',
    nonprofitStatus: 'https://schema.org/Nonprofit501c3',
    taxID: site.ein,
    telephone: '+1-412-628-0403',
    email: site.email,
    founder: {
      '@id': `${site.url}/about/board/#susan-rua`,
      '@type': 'Person',
      name: 'Susan Rua',
      jobTitle: 'President and Founder',
      honorificSuffix: 'CADC, MSPC, LPC',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.office.street,
      addressLocality: site.office.city,
      addressRegion: site.office.state,
      postalCode: site.office.zip,
      addressCountry: 'US',
    },
    areaServed: serviceArea,
    keywords: 'recovery housing Pittsburgh, sober living Pittsburgh, recovery house Pittsburgh, men’s sober living, women’s sober living, DDAP licensed recovery house, WestPARR',
    knowsAbout: ['Recovery housing', 'Sober living', 'Substance use recovery', 'Twelve-step recovery'],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-412-628-0403',
      email: site.email,
      contactType: 'housing inquiries and general information',
      availableLanguage: 'English',
      areaServed: 'Pittsburgh and Allegheny County, Pennsylvania',
      url: `${site.url}/contact/`,
    },
    sameAs: [
      'https://projects.propublica.org/nonprofits/organizations/812901849',
      'https://westparr.org/search-homes/',
    ],
    subjectOf: { '@id': `${site.url}/about/transparency/#webpage` },
  };

  const website = {
    '@type': 'WebSite',
    '@id': websiteId,
    url: `${site.url}/`,
    name: site.name,
    alternateName: site.shortName,
    description: site.description,
    publisher: { '@id': organizationId },
    inLanguage: 'en-US',
  };

  if (canonical === `${site.url}/`) graph.push(organization, website);

  const image = {
    '@type': 'ImageObject',
    '@id': imageId,
    url: absolute(route.image),
    contentUrl: absolute(route.image),
    width: 1200,
    height: 630,
    caption: route.imageAlt,
  };

  const hasFaq = Boolean(faq && faq.length);
  const pageType = route.pageType === 'FAQPage' && !hasFaq ? 'WebPage' : route.pageType;

  const webpage: Record<string, unknown> = {
    '@type': pageType,
    '@id': webpageId,
    url: canonical,
    name: route.documentTitle,
    headline: route.pageName,
    description: route.description,
    inLanguage: 'en-US',
    isPartOf: { '@id': websiteId },
    about: { '@id': organizationId },
    primaryImageOfPage: { '@id': imageId },
    publisher: { '@id': organizationId },
  };
  if (lastReviewed) webpage.lastReviewed = lastReviewed;

  if (route.breadcrumbs.length > 1) {
    const breadcrumbId = `${canonical}#breadcrumb`;
    webpage.breadcrumb = { '@id': breadcrumbId };
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': breadcrumbId,
      itemListElement: route.breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: absolute(item.path),
      })),
    });
  }

  graph.push(image, webpage);

  if (route.entity === 'organization' && canonical !== `${site.url}/`) {
    webpage.mainEntity = { '@id': organizationId };
  }

  if (route.entity === 'board') {
    const boardMembers = [
      { name: 'Susan Rua', url: `${canonical}#susan-rua`, role: 'President and Founder' },
      { name: 'Theresa Rem-Canofari', url: `${canonical}#theresa-rem-canofari`, role: 'Board Member' },
    ];
    const itemList = {
      '@type': 'ItemList',
      '@id': `${canonical}#board-list`,
      name: 'New Beginnings Board of Directors',
      itemListElement: boardMembers.map((member, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Person',
          name: member.name,
          jobTitle: member.role,
          url: member.url,
          memberOf: { '@id': organizationId },
        },
      })),
    };
    webpage.mainEntity = { '@id': `${canonical}#board-list` };
    graph.push(itemList);
  }

  const serviceNames: Record<string, { name: string; alternateName: string[]; audience: string }> = {
    'recovery-housing': {
      name: 'Recovery housing in Pittsburgh',
      alternateName: ['Sober living', 'Recovery residence', 'Sober house'],
      audience: 'Adults in recovery from substance use seeking a substance-free shared home',
    },
    'mens-housing': {
      name: 'Men’s recovery housing in Pittsburgh',
      alternateName: ['Men’s sober living Pittsburgh', 'Men’s recovery house'],
      audience: 'Adult men in recovery from substance use, including men on parole',
    },
    'womens-housing': {
      name: 'Women’s recovery housing in Pittsburgh',
      alternateName: ['Women’s sober living Pittsburgh', 'Women’s recovery house'],
      audience: 'Adult women in recovery from substance use',
    },
  };
  if (route.entity && route.entity in serviceNames) {
    const details = serviceNames[route.entity];
    const service = {
      '@type': 'Service',
      '@id': `${canonical}#service`,
      name: details.name,
      alternateName: details.alternateName,
      serviceType: 'Recovery housing',
      description: route.description,
      provider: { '@id': organizationId },
      areaServed: serviceArea,
      audience: { '@type': 'Audience', audienceType: details.audience },
      availableChannel: {
        '@type': 'ServiceChannel',
        serviceUrl: `${site.url}/admissions/`,
        servicePhone: {
          '@type': 'ContactPoint',
          telephone: '+1-412-628-0403',
          contactType: 'housing inquiries',
        },
      },
    };
    if (!hasFaq) webpage.mainEntity = { '@id': `${canonical}#service` };
    graph.push(service);
  }

  if (route.entity === 'contact') {
    const contact = {
      '@type': 'ContactPoint',
      '@id': `${canonical}#contactpoint`,
      telephone: '+1-412-628-0403',
      email: site.email,
      contactType: 'housing inquiries and general information',
      availableLanguage: 'English',
      areaServed: 'Pittsburgh and Allegheny County, Pennsylvania',
      url: canonical,
    };
    webpage.mainEntity = { '@id': `${canonical}#contactpoint` };
    graph.push(contact);
  }

  if (hasFaq && faq) {
    webpage.mainEntity = faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    }));
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}
