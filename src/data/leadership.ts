export type LeadershipGroup = 'organizational-leadership' | 'board';

export interface LeadershipProfile {
  slug: string;
  name: string;
  role: string;
  group: LeadershipGroup;
  published: boolean;
  servesOnBoard?: boolean;
  summary?: string;
  biography?: string[];
  credentials?: string[];
  education?: string[];
  experience?: string[];
  image?: {
    src: string;
    alt: string;
  };
}

export const organizationalLeadership: LeadershipProfile[] = [
  {
    slug: 'susan-rua',
    name: 'Susan Rua',
    role: 'President and Founder',
    group: 'organizational-leadership',
    published: true,
    servesOnBoard: true,
    summary:
      'Susan Rua founded New Beginnings and brings decades of substance-use, counseling, and sober-living experience to its recovery-housing mission.',
    biography: [
      'Susan Rua is a professional counselor who has specialized in substance use and recovery since 1999. Her work has included counseling, nursing, and more than a decade owning and directing sober-living homes.',
      'That combination of clinical knowledge and day-to-day housing experience helped shape New Beginnings: stable homes, clear expectations, peer connection, and respect for each resident as an adult building a life in recovery.',
      'New Beginnings is a separate nonprofit recovery-housing organization. Residents can remain connected to independent treatment providers and community recovery resources as appropriate to their individual needs.',
    ],
    credentials: ['CADC', 'MSPC', 'LPC'],
    education: [
      "Master's in Professional Counseling, Carlow University",
      'Background in nursing',
    ],
    experience: [
      'Specializing in substance use and recovery since 1999',
      'More than a decade owning and directing sober-living homes',
      'Experience connecting recovery housing with independent clinical and community support',
    ],
  },
];

// The published roster follows the current direction provided for this site.
// Biographical details belong here only after they are cleared for public use.
export const boardMembers: LeadershipProfile[] = [
  {
    slug: 'theresa-rem-canofari',
    name: 'Theresa Rem-Canofari',
    role: 'Board Member',
    group: 'board',
    published: true,
    servesOnBoard: true,
  },
];

export const publishedOrganizationalLeadership = organizationalLeadership.filter(
  (person) => person.published,
);

export const publishedBoardMembers = boardMembers.filter((person) => person.published);

// Susan Rua and Theresa Rem-Canofari are the current public roster supplied for
// this site. A former member identified by the client is intentionally excluded.
export const currentBoardMembers = [
  ...publishedOrganizationalLeadership,
  ...publishedBoardMembers,
].filter((person) => person.servesOnBoard);

export const susanRua = publishedOrganizationalLeadership.find(
  (person) => person.slug === 'susan-rua',
);
