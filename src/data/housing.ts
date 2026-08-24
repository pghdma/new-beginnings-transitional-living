type Audience = 'men' | 'women';

interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface Feature {
  icon: string;
  title: string;
  copy: string;
}

interface FaqGroup {
  title: string;
  items: Array<{ question: string; answer: string }>;
}

export interface HousingDetailConfig {
  audience: Audience;
  title: string;
  description: string;
  heroTitle: string;
  heroLead: string;
  heroImage: ImageAsset;
  householdImage: ImageAsset;
  householdLead: string;
  householdFeatures: Feature[];
  supportFeatures: Feature[];
  galleryImages: [ImageAsset, ImageAsset, ImageAsset];
  publicAreas: string;
  faqs: FaqGroup[];
}

const sharedHouseholdFeatures: Feature[] = [
  {
    icon: 'shield-check',
    title: 'A Substance Free Home',
    copy: 'Alcohol and other drug use do not belong in the residence. Current testing and response policies are reviewed during admission.',
  },
  {
    icon: 'users-round',
    title: 'Peer Community',
    copy: 'Residents share space with other adults who are working to build stable lives in recovery.',
  },
  {
    icon: 'clipboard-check',
    title: 'Shared Expectations',
    copy: 'House rules, responsibilities, schedules, and communication help make daily life more predictable.',
  },
  {
    icon: 'briefcase-business',
    title: 'Life Beyond the House',
    copy: 'Work, education, appointments, family, meetings, and independent services remain part of everyday life.',
  },
];

const sharedSupportFeatures: Feature[] = [
  {
    icon: 'house-heart',
    title: 'A Dependable Place',
    copy: 'A consistent home gives each day a place to begin and return to.',
  },
  {
    icon: 'handshake',
    title: 'Respect and Responsibility',
    copy: 'Residents contribute to the household and respect the privacy and recovery of others.',
  },
  {
    icon: 'calendar-check',
    title: 'Recovery Participation',
    copy: 'New Beginnings follows an AA and NA based culture. Current meeting expectations are explained before admission.',
  },
  {
    icon: 'stethoscope',
    title: 'Independent Care',
    copy: 'Counseling, medical care, and medication management remain with independent licensed providers.',
  },
];

function buildFaqs(audience: Audience): FaqGroup[] {
  const audienceLabel = audience === 'men' ? 'men' : 'women';
  const possessive = audience === 'men' ? 'men’s' : 'women’s';

  return [
    {
      title: 'Getting Started',
      items: [
        {
          question: `Who is ${possessive} recovery housing for?`,
          answer: `New Beginnings provides shared recovery housing for adult ${audienceLabel} who are committed to substance free living and willing to participate in a structured household. Staff can explain the current admission criteria during a general conversation.`,
        },
        {
          question: 'Do I need to come directly from treatment?',
          answer: 'This website does not publish a treatment completion requirement. Call to discuss your current situation and whether recovery housing is an appropriate next step. Recovery housing is not detoxification, inpatient care, or clinical treatment.',
        },
        {
          question: 'How do I find out whether a bed is available?',
          answer: 'Availability changes by house. Call 412-628-0403 or send a general admissions inquiry. Staff can discuss current openings and the next step without requiring sensitive medical information through the website.',
        },
        {
          question: 'Can a family member or professional call for me?',
          answer: 'A family member, treatment provider, probation officer, case manager, or other referral partner can begin with a general question. Private information and records should only be shared through an approved process after staff explains what is needed.',
        },
        {
          question: 'Can I see the house before deciding?',
          answer: 'Ask staff how visits or tours are handled. Exact locations are not published online so that the privacy of current residents is protected.',
        },
      ],
    },
    {
      title: 'Costs and Daily Life',
      items: [
        {
          question: 'How much is rent?',
          answer: 'Current rent and fees are not published because they may change. Ask staff for the complete current amount, what is due before move in, the payment schedule, and the refund policy. A written fee schedule is part of the information provided by a licensed recovery house.',
        },
        {
          question: 'What is included in the cost?',
          answer: 'Ask which utilities, furnishings, household supplies, internet, laundry, meals, and other items are included at the available house. Do not assume that the arrangement is the same at every residence.',
        },
        {
          question: 'Are bedrooms shared?',
          answer: 'Room arrangements can differ by house and current opening. Ask whether the available placement is shared, what furniture is provided, and how personal belongings are stored.',
        },
        {
          question: 'What should I bring?',
          answer: 'Request the current move in list before arriving. Ask specifically about bedding, towels, toiletries, clothing, groceries, identification, medications, storage limits, and items that are not permitted.',
        },
        {
          question: 'Are meals provided?',
          answer: 'Meal and grocery arrangements are not published on this site. Staff can explain whether residents buy and prepare their own food and what kitchen equipment or household staples are available.',
        },
        {
          question: 'Can I work or attend school while living there?',
          answer: 'Recovery housing is intended to support ordinary responsibilities outside the home. Confirm the current employment, education, volunteer, appointment, and daytime schedule expectations before admission.',
        },
        {
          question: 'Can I bring a car or use public transportation?',
          answer: 'Ask about parking, vehicle documentation, ride sharing, nearby transit, and whether your work or appointment schedule fits the house curfew and return time policy.',
        },
      ],
    },
    {
      title: 'Recovery and House Policies',
      items: [
        {
          question: 'What recovery meetings are required?',
          answer: 'New Beginnings follows an AA and NA based recovery culture. Ask staff to confirm the current number and type of meetings, documentation requirements, sponsor or home group expectations, and whether 90 meetings in 90 days applies.',
        },
        {
          question: 'Is there a curfew?',
          answer: 'Ask for the current curfew and return time policy, including how work schedules, appointments, court requirements, recovery activities, and approved exceptions are handled.',
        },
        {
          question: 'Are visitors or overnight passes allowed?',
          answer: 'Visitor hours, approved visitors, overnight passes, notice requirements, and time away from the residence are governed by current house rules. Review those rules before making plans.',
        },
        {
          question: 'Are there chores and house meetings?',
          answer: 'Shared recovery housing normally includes responsibility for personal and common spaces. Ask about the current chore schedule, weekly house meetings, quiet hours, and how household concerns are resolved.',
        },
        {
          question: 'Is drug or alcohol testing part of the program?',
          answer: 'Confirm the current testing policy, how tests are requested, any related costs, and what happens after a positive or refused test. The written policy should be understood before residency begins.',
        },
        {
          question: 'What is the policy for prescriptions or medication for addiction treatment?',
          answer: 'Medication policies can be house specific and should be discussed privately before admission. Ask about prescribed medications, medication for addiction treatment, storage, self administration, documentation, and any prohibited products. Do not stop or change a prescription based on website information.',
        },
        {
          question: 'What happens after substance use or a serious rule violation?',
          answer: 'Ask staff to explain the current relapse, safety, discharge, and reconsideration policies. Pennsylvania licensed recovery houses provide written criteria for beginning and ending residency.',
        },
        {
          question: 'How long can someone stay?',
          answer: 'A fixed minimum or maximum stay is not published on this site. Ask how length of residence is determined, what progress or financial expectations apply, and how transition planning is handled.',
        },
        {
          question: 'Does New Beginnings provide counseling or medical treatment?',
          answer: 'No. New Beginnings provides recovery housing. Counseling, medical services, medication management, and other treatment remain with independent licensed providers.',
        },
      ],
    },
  ];
}

export const mensHousing: HousingDetailConfig = {
  audience: 'men',
  title: 'Men’s Recovery Housing',
  description: 'Practical information about New Beginnings recovery housing for adult men in Pittsburgh, including costs, expectations, daily life, meetings, and admissions.',
  heroTitle: 'A Pittsburgh Recovery Home for Men',
  heroLead: 'A substance free shared home for adult men, with peer community, clear expectations, and an AA and NA based recovery culture.',
  heroImage: {
    src: '/images/home-entry.webp',
    alt: 'A residential entry and shared living area',
    width: 2200,
    height: 1467,
  },
  householdImage: {
    src: '/images/rustic-dining-room.webp',
    alt: 'A dining room with a shared table and chairs',
    width: 1600,
    height: 2133,
  },
  householdLead: 'Residents share a recovery focused home while continuing to build work, education, family, treatment, and community connections outside the residence.',
  householdFeatures: sharedHouseholdFeatures,
  supportFeatures: sharedSupportFeatures,
  galleryImages: [
    { src: '/images/house-living-room.webp', alt: 'A furnished residential living room', width: 2200, height: 1467 },
    { src: '/images/household-linens.webp', alt: 'Clean folded household linens', width: 2200, height: 1236 },
    { src: '/images/pittsburgh-rowhouses.webp', alt: 'Pittsburgh row houses near public streets', width: 1800, height: 1204 },
  ],
  publicAreas: 'Sheraden and McKees Rocks for men’s housing',
  faqs: buildFaqs('men'),
};

export const womensHousing: HousingDetailConfig = {
  audience: 'women',
  title: 'Women’s Recovery Housing',
  description: 'Practical information about New Beginnings recovery housing for adult women in Pittsburgh, including costs, expectations, daily life, meetings, and admissions.',
  heroTitle: 'A Pittsburgh Recovery Home for Women',
  heroLead: 'A substance free shared home for adult women, with peer community, privacy, clear expectations, and an AA and NA based recovery culture.',
  heroImage: {
    src: '/images/shared-bedroom.webp',
    alt: 'A bright shared bedroom with two beds',
    width: 2200,
    height: 1466,
  },
  householdImage: {
    src: '/images/house-kitchen.webp',
    alt: 'A kitchen and dining table in a welcoming home',
    width: 2200,
    height: 1467,
  },
  householdLead: 'Residents share a recovery focused home with other women while continuing to build work, education, family, treatment, and community connections outside the residence.',
  householdFeatures: sharedHouseholdFeatures,
  supportFeatures: sharedSupportFeatures,
  galleryImages: [
    { src: '/images/windowed-living-room.webp', alt: 'A bright living room with shared seating', width: 2200, height: 1467 },
    { src: '/images/household-linens.webp', alt: 'Clean folded household linens', width: 2200, height: 1236 },
    { src: '/images/pittsburgh-rowhouses.webp', alt: 'Pittsburgh row houses near public streets', width: 1800, height: 1204 },
  ],
  publicAreas: 'Brighton Heights for women’s housing',
  faqs: buildFaqs('women'),
};
