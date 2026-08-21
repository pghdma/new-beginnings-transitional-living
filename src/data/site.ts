export const site = {
  name: 'New Beginnings Transitional Living Foundation',
  shortName: 'New Beginnings',
  url: 'https://newbeginningspgh.org',
  phone: '412-628-0403',
  phoneHref: 'tel:+14126280403',
  ein: '81-2901849',
  neighborhoods: ['Sheraden', 'Brighton Heights', 'McKees Rocks'],
  description: 'Structured recovery housing for men and women in Pittsburgh, grounded in peer support, accountability, and connection to recovery services.'
};

export const nav = [
  {
    label: 'About',
    href: '/about/',
    children: [
      { label: 'About New Beginnings', href: '/about/' },
      { label: 'Board of Directors', href: '/about/board/' },
      { label: 'Credentials & Transparency', href: '/about/transparency/' }
    ]
  },
  {
    label: 'Recovery Housing',
    href: '/recovery-housing/',
    children: [
      { label: 'Recovery Housing Overview', href: '/recovery-housing/' },
      { label: 'Men’s Recovery Housing', href: '/recovery-housing/men/' },
      { label: 'Women’s Recovery Housing', href: '/recovery-housing/women/' }
    ]
  },
  { label: 'Admissions', href: '/admissions/' },
  { label: 'For Professionals', href: '/referrals/' },
  { label: 'Support Us', href: '/support-us/' },
  { label: 'Contact', href: '/contact/' }
] as const;
