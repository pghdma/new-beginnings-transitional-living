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
    /** object-position for the board card crop; defaults to the shared value. */
    position?: string;
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
      'Susan Rua is a licensed professional counselor who has worked in addiction treatment since 1999 and has owned and run recovery houses in Pittsburgh for more than a decade. She founded New Beginnings in 2016.',
    biography: [
      'Susan has worked in addiction counseling since 1999. Before counseling she was a nurse, and for more than ten years she has owned and directed recovery houses in Pittsburgh.',
      'She started New Beginnings because too many people finish treatment and have nowhere safe to go. The houses are built on what she has seen work: a substance-free home, clear rules, a weekly house meeting, AA and NA, and housemates who are doing the same thing.',
      'Susan also runs Step By Step Support (stepbystepsupport.net), a licensed counseling practice in Mt. Washington. The two are separate organizations. Living at New Beginnings doesn’t require seeing Susan or any particular provider for counseling.',
    ],
    credentials: ['CADC', 'MSPC', 'LPC'],
    image: { src: '/images/susan-rua.webp', alt: 'Susan Rua' },
    education: [
      "Master's in Professional Counseling, Carlow University",
      'Associate degree in nursing',
    ],
    experience: [
      'Addiction counseling since 1999',
      'More than ten years owning and directing recovery houses',
      'Licensed Professional Counselor and Certified Alcohol and Drug Counselor',
    ],
  },
];

// Biographical details belong here only after they’re cleared for public use.
export const boardMembers: LeadershipProfile[] = [
  // Not on the roster Susan supplied on Aug 27 2026; kept unpublished in case she returns.
  {
    slug: 'theresa-rem-canofari',
    name: 'Theresa Rem-Canofari',
    role: 'Board Member',
    group: 'board',
    published: false,
    servesOnBoard: true,
  },
  {
    slug: 'tara-morrow',
    name: 'Tara Morrow',
    role: 'Board Member',
    group: 'board',
    published: true,
    servesOnBoard: true,
    image: { src: '/images/tara-morrow.webp', alt: 'Tara Morrow', position: '57% 20%' },
  },
  {
    slug: 'pamela-birr',
    name: 'Pamela Birr',
    role: 'Board Member',
    group: 'board',
    published: true,
    servesOnBoard: true,
    image: { src: '/images/pamela-birr.webp', alt: 'Pamela Birr' },
  },
  {
    slug: 'angela-bartley',
    name: 'Angela Bartley',
    role: 'Board Member',
    group: 'board',
    published: true,
    servesOnBoard: true,
    image: { src: '/images/angela-bartley.webp', alt: 'Angela Bartley', position: '42% 30%' },
  },
];

export const publishedOrganizationalLeadership = organizationalLeadership.filter(
  (person) => person.published,
);

export const publishedBoardMembers = boardMembers.filter((person) => person.published);

// Roster supplied by Susan on Aug 27 2026: Susan Rua, Tara Morrow, Pamela Birr, Angela Bartley.
export const currentBoardMembers = [
  ...publishedOrganizationalLeadership,
  ...publishedBoardMembers,
].filter((person) => person.servesOnBoard);

export const susanRua = publishedOrganizationalLeadership.find(
  (person) => person.slug === 'susan-rua',
);
