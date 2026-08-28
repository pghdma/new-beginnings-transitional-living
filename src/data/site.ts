export const site = {
  name: 'New Beginnings Transitional Living Foundation',
  shortName: 'New Beginnings',
  url: 'https://newbeginningspgh.org',
  phone: '412-628-0403',
  phoneHref: 'tel:+14126280403',
  email: 'srua65@gmail.com',
  emailHref: 'mailto:srua65@gmail.com',
  office: {
    street: '20 Bailey Avenue, Suite 300',
    city: 'Pittsburgh',
    state: 'PA',
    zip: '15211',
    neighborhood: 'Mt. Washington',
    directionsHref: 'https://www.google.com/maps/dir/?api=1&destination=20%20Bailey%20Avenue%20Suite%20300%20Pittsburgh%20PA%2015211',
  },
  ein: '81-2901849',
  neighborhoods: ['North Side', 'West End', 'McKees Rocks', 'Mount Oliver'],
  description: 'Nonprofit recovery houses for men and women in Pittsburgh. DDAP-licensed, WestPARR-certified recovery housing on Pittsburgh’s North Side and in the West End, McKees Rocks, and Mount Oliver, run by a counselor who has done this work since 1999.'
};

export const nav = [
  {
    label: 'About',
    href: '/about/',
    children: [
      { label: 'About New Beginnings', href: '/about/', icon: 'info', description: 'Who we are and why the houses exist' },
      { label: 'Board of Directors', href: '/about/board/', icon: 'landmark', description: 'The people responsible for the nonprofit' },
      { label: 'Credentials & Licensing', href: '/about/transparency/', icon: 'badge-check', description: '501(c)(3), DDAP license, WestPARR, public records' }
    ]
  },
  {
    label: 'Recovery Housing',
    href: '/recovery-housing/',
    children: [
      { label: 'How Our Houses Work', href: '/recovery-housing/', icon: 'house', description: 'What sober living is and what every resident can expect' },
      { label: 'Men’s Recovery Housing', href: '/recovery-housing/men/', icon: 'users-round', description: 'Houses on the North Side and in the West End, McKees Rocks, and Mount Oliver' },
      { label: 'Women’s Recovery Housing', href: '/recovery-housing/women/', icon: 'heart-handshake', description: 'One house on Pittsburgh’s North Side' }
    ]
  },
  {
    label: 'Admissions',
    href: '/admissions/',
    children: [
      { label: 'Apply for Housing', href: '/admissions/', icon: 'clipboard-list', description: 'Three short steps, or just call' },
      { label: 'For Professionals', href: '/referrals/', icon: 'briefcase-business', description: 'Referring a client from treatment, court, or case management' }
    ]
  },
  { label: 'Donate', href: '/support-us/' },
  { label: 'Contact', href: '/contact/' }
] as const;
