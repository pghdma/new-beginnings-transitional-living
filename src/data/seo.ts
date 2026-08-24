import { site } from './site';

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export interface SeoRoute {
  documentTitle: string;
  description: string;
  pageName: string;
  pageType: 'WebPage' | 'AboutPage' | 'ContactPage' | 'ProfilePage' | 'CollectionPage';
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
    documentTitle: 'New Beginnings | Pittsburgh Recovery Housing for Men & Women',
    description: 'New Beginnings provides structured recovery housing for adult men and women in Pittsburgh, grounded in peer support, accountability, and stable shared living.',
    pageName: 'New Beginnings Transitional Living Foundation',
    pageType: 'WebPage',
    image: '/images/og-default.jpg',
    imageAlt: 'New Beginnings recovery housing website in Pittsburgh',
    breadcrumbs: [],
    entity: 'organization',
  },
  '/about/': {
    documentTitle: 'About New Beginnings | Pittsburgh Recovery Housing',
    description: 'Learn about New Beginnings’ mission, founder, nonprofit governance, and practical approach to structured recovery housing in Pittsburgh.',
    pageName: 'About New Beginnings',
    pageType: 'AboutPage',
    image: '/images/social/about.jpg',
    imageAlt: 'Pittsburgh rowhouses in a residential neighborhood',
    breadcrumbs: [home, about],
    entity: 'organization',
  },
  '/about/board/': {
    documentTitle: 'Board of Directors | New Beginnings Pittsburgh',
    description: 'Meet the board members published on this website and learn how volunteer nonprofit governance supports the New Beginnings recovery-housing mission.',
    pageName: 'Board of Directors',
    pageType: 'CollectionPage',
    image: '/images/social/board.jpg',
    imageAlt: 'An empty meeting table prepared for a board conversation',
    breadcrumbs: [home, about, board],
    entity: 'board',
  },
  '/about/transparency/': {
    documentTitle: 'Credentials & Transparency | New Beginnings',
    description: 'Verify New Beginnings’ 501(c)(3) status, Pennsylvania recovery-house licensing, WestPARR inspection, public records, and privacy practices.',
    pageName: 'Credentials and Transparency',
    pageType: 'AboutPage',
    image: '/images/social/transparency.jpg',
    imageAlt: 'A professional meeting table with public-record paperwork',
    breadcrumbs: [home, about, { name: 'Credentials and Transparency', path: '/about/transparency/' }],
    entity: 'organization',
  },
  '/recovery-housing/': {
    documentTitle: 'How Recovery Housing Works | New Beginnings Pittsburgh',
    description: 'Learn how New Beginnings’ structured, peer-supported recovery housing helps adult men and women build stable routines in Pittsburgh.',
    pageName: 'Recovery Housing',
    pageType: 'WebPage',
    image: '/images/social/recovery-housing.jpg',
    imageAlt: 'A comfortable shared living room in a residential home',
    breadcrumbs: [home, housing],
    entity: 'recovery-housing',
  },
  '/recovery-housing/men/': {
    documentTitle: 'Men’s Recovery Housing in Pittsburgh | New Beginnings',
    description: 'Explore structured recovery housing for adult men in Pittsburgh-area communities, with peer connection, accountability, and stable shared living.',
    pageName: 'Men’s Recovery Housing',
    pageType: 'WebPage',
    image: '/images/social/mens-housing.jpg',
    imageAlt: 'A quiet, sunlit room in a residential home',
    breadcrumbs: [home, housing, { name: 'Men’s Recovery Housing', path: '/recovery-housing/men/' }],
    entity: 'mens-housing',
  },
  '/recovery-housing/women/': {
    documentTitle: 'Women’s Recovery Housing in Pittsburgh | New Beginnings',
    description: 'Explore recovery housing for adult women in Pittsburgh, centered on privacy, consistent routines, peer community, and shared responsibility.',
    pageName: 'Women’s Recovery Housing',
    pageType: 'WebPage',
    image: '/images/social/womens-housing.jpg',
    imageAlt: 'A bright shared bedroom in a residential home',
    breadcrumbs: [home, housing, { name: 'Women’s Recovery Housing', path: '/recovery-housing/women/' }],
    entity: 'womens-housing',
  },
  '/admissions/': {
    documentTitle: 'Recovery Housing Admissions | New Beginnings Pittsburgh',
    description: 'Learn how to begin a private recovery-housing inquiry with New Beginnings, what to share, and how staff discuss availability and next steps.',
    pageName: 'Admissions',
    pageType: 'WebPage',
    image: '/images/social/admissions.jpg',
    imageAlt: 'A welcoming teal front door at a residential home',
    breadcrumbs: [home, { name: 'Admissions', path: '/admissions/' }],
  },
  '/referrals/': {
    documentTitle: 'Professional Recovery Housing Referrals | New Beginnings',
    description: 'Referral information for treatment providers, case managers, courts, and community partners seeking Pittsburgh recovery housing.',
    pageName: 'Professional Referrals',
    pageType: 'WebPage',
    image: '/images/social/referrals.jpg',
    imageAlt: 'A bright shared bedroom in a residential home',
    breadcrumbs: [home, { name: 'Professional Referrals', path: '/referrals/' }],
  },
  '/support-us/': {
    documentTitle: 'Support Recovery Housing in Pittsburgh | New Beginnings',
    description: 'Learn how financial support, practical help, and community partnerships can strengthen nonprofit recovery housing in Pittsburgh.',
    pageName: 'Support Our Work',
    pageType: 'WebPage',
    image: '/images/social/support.jpg',
    imageAlt: 'Pittsburgh rowhouses in a residential neighborhood',
    breadcrumbs: [home, { name: 'Support Our Work', path: '/support-us/' }],
  },
  '/contact/': {
    documentTitle: 'Contact New Beginnings | Pittsburgh Recovery Housing',
    description: 'Contact New Beginnings about recovery-housing availability, professional referrals, nonprofit partnerships, or general organization questions.',
    pageName: 'Contact New Beginnings',
    pageType: 'ContactPage',
    image: '/images/social/contact.jpg',
    imageAlt: 'A bright shared dining and living space',
    breadcrumbs: [home, { name: 'Contact', path: '/contact/' }],
    entity: 'contact',
  },
  '/privacy/': {
    documentTitle: 'Privacy Policy | New Beginnings',
    description: 'Learn how the New Beginnings website handles general inquiry information, technical data, sensitive information, and residence privacy.',
    pageName: 'Privacy Policy',
    pageType: 'WebPage',
    image: '/images/og-default.jpg',
    imageAlt: 'New Beginnings recovery housing website in Pittsburgh',
    breadcrumbs: [home, { name: 'Privacy Policy', path: '/privacy/' }],
  },
  '/accessibility/': {
    documentTitle: 'Accessibility Statement | New Beginnings',
    description: 'Review the accessibility commitment, supported features, limitations, and contact options for the New Beginnings website.',
    pageName: 'Accessibility Statement',
    pageType: 'WebPage',
    image: '/images/og-default.jpg',
    imageAlt: 'New Beginnings recovery housing website in Pittsburgh',
    breadcrumbs: [home, { name: 'Accessibility Statement', path: '/accessibility/' }],
  },
  '/terms/': {
    documentTitle: 'Terms of Use | New Beginnings',
    description: 'Read the terms governing use of the New Beginnings website, including informational scope, privacy, external links, and residence safety.',
    pageName: 'Terms of Use',
    pageType: 'WebPage',
    image: '/images/og-default.jpg',
    imageAlt: 'New Beginnings recovery housing website in Pittsburgh',
    breadcrumbs: [home, { name: 'Terms of Use', path: '/terms/' }],
  },
  '/404/': {
    documentTitle: 'Page Not Found | New Beginnings',
    description: 'The page you requested could not be found. Return to the New Beginnings homepage or choose another useful page.',
    pageName: 'Page Not Found',
    pageType: 'WebPage',
    image: '/images/og-default.jpg',
    imageAlt: 'New Beginnings recovery housing website in Pittsburgh',
    breadcrumbs: [],
  },
};

export const normalizePathname = (pathname: string) => {
  if (pathname === '/404.html') return '/404/';
  if (pathname === '/') return '/';
  return `${pathname.replace(/\/+$/, '')}/`;
};

const absolute = (path: string) => new URL(path, site.url).toString();

export function buildStructuredData(route: SeoRoute, canonical: string, lastReviewed?: string) {
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
    alternateName: site.shortName,
    url: site.url,
    description: site.description,
    foundingDate: '2016',
    nonprofitStatus: 'https://schema.org/Nonprofit501c3',
    taxID: site.ein,
    telephone: '+1-412-628-0403',
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Pittsburgh and surrounding Allegheny County communities',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-412-628-0403',
      contactType: 'housing inquiries and general information',
      availableLanguage: 'English',
      areaServed: 'Pittsburgh and surrounding Allegheny County communities',
      url: `${site.url}/contact/`,
    },
    founder: {
      '@id': `${site.url}/about/board/#susan-rua`,
      '@type': 'Person',
      name: 'Susan Rua',
    },
    sameAs: ['https://projects.propublica.org/nonprofits/organizations/812901849'],
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

  const webpage: Record<string, unknown> = {
    '@type': route.pageType,
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
      name: 'Published New Beginnings board listing',
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

  const serviceNames: Record<string, { name: string; audience: string }> = {
    'recovery-housing': { name: 'Structured recovery housing', audience: 'Adults seeking recovery-focused shared housing' },
    'mens-housing': { name: 'Recovery housing for adult men', audience: 'Adult men seeking recovery-focused shared housing' },
    'womens-housing': { name: 'Recovery housing for adult women', audience: 'Adult women seeking recovery-focused shared housing' },
  };
  if (route.entity && route.entity in serviceNames) {
    const details = serviceNames[route.entity];
    const service = {
      '@type': 'Service',
      '@id': `${canonical}#service`,
      name: details.name,
      serviceType: 'Recovery housing',
      description: route.description,
      provider: { '@id': organizationId },
      areaServed: {
        '@type': 'AdministrativeArea',
        name: 'Pittsburgh and surrounding Allegheny County communities',
      },
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
    webpage.mainEntity = { '@id': `${canonical}#service` };
    graph.push(service);
  }

  if (route.entity === 'contact') {
    const contact = {
      '@type': 'ContactPoint',
      '@id': `${canonical}#contactpoint`,
      telephone: '+1-412-628-0403',
      contactType: 'housing inquiries and general information',
      availableLanguage: 'English',
      areaServed: 'Pittsburgh and surrounding Allegheny County communities',
      url: canonical,
    };
    webpage.mainEntity = { '@id': `${canonical}#contactpoint` };
    graph.push(contact);
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}
