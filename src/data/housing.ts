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

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqGroup {
  title: string;
  items: FaqItem[];
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
    title: 'Substance Free, Always',
    copy: 'No alcohol, no drugs, no prescription narcotics. Random drug screens throughout your stay. That is what makes the house safe for everyone in it.',
  },
  {
    icon: 'users-round',
    title: 'Housemates in Recovery',
    copy: 'Everyone in the house is doing the same work you are. That is not a feature of the program. It is the program.',
  },
  {
    icon: 'clipboard-check',
    title: 'Rules That Hold',
    copy: 'Curfew, chores, a weekly house meeting, and a search policy. Simple, consistent, and the same for everyone.',
  },
  {
    icon: 'briefcase-business',
    title: 'Your Life Keeps Going',
    copy: 'Work, school, court dates, family, doctor’s appointments, and outside meetings are all part of a normal week here.',
  },
];

const sharedSupportFeatures: Feature[] = [
  {
    icon: 'house-heart',
    title: 'A Bed That Is Yours',
    copy: 'Bedding is provided. Bring your clothes, your hygiene items, and your own food. The kitchen and living space are shared.',
  },
  {
    icon: 'calendar-check',
    title: '12-Step Based',
    copy: 'Our houses are AA and NA based. Outside meetings, a sponsor, and working the steps are expected. The in-house meeting is weekly and mandatory.',
  },
  {
    icon: 'stethoscope',
    title: 'Your Providers Stay Yours',
    copy: 'Counseling, medication, and medical care stay with your own doctor, counselor, or treatment program. We are the house, not the treatment.',
  },
  {
    icon: 'bus',
    title: 'Close to the City',
    copy: 'The houses are in established Pittsburgh neighborhoods on bus lines, near jobs, meetings, and the people you are rebuilding with.',
  },
];

function buildFaqs(audience: Audience): FaqGroup[] {
  const people = audience === 'men' ? 'men' : 'women';
  const houseNoun = audience === 'men' ? 'the men’s houses' : 'the women’s house';

  return [
    {
      title: 'Getting Started',
      items: [
        {
          question: `Who is ${audience === 'men' ? 'men’s' : 'women’s'} recovery housing for?`,
          answer: `Adult ${people} who are done using and willing to live by house rules: substance free, meetings, curfew, chores, and drug screens. You do not need to be fresh out of treatment, and you do not need a referral. You need to want this.`,
        },
        {
          question: 'Do I need to come straight from treatment?',
          answer: 'No. Some residents come straight from rehab or detox. Some come from jail or parole. Some just know they cannot stay sober where they are living now. Call and tell us where you are. We will tell you honestly whether a recovery house is the right next step.',
        },
        {
          question: 'Is this a halfway house?',
          answer: 'Not in the licensing sense. In Pennsylvania a halfway house is a treatment program. New Beginnings is a licensed recovery house, which most people call sober living: a substance-free home with rules, drug screens, and housemates in recovery, but no clinical treatment on site. If someone told you to find a halfway house, a recovery house may be what you actually need. Call and we will sort it out.',
        },
        {
          question: 'How do I find out if a bed is open?',
          answer: `Call 412-628-0403. That is the fastest way. You can also send the application and we will call you back. Openings in ${houseNoun} change week to week, so a call today is worth more than a form from last month.`,
        },
        {
          question: 'Can a family member or a probation officer call for me?',
          answer: 'Yes. Family, counselors, discharge planners, and probation and parole officers call us all the time. Just keep medical records, court records, and other private details off the website form. We will ask for what we need directly.',
        },
        {
          question: 'Can I see the house before I decide?',
          answer: 'Usually, yes. Ask when you call. We do not post house addresses online, so a visit is arranged privately.',
        },
      ],
    },
    {
      title: 'Costs and Daily Life',
      items: [
        {
          question: 'How much is rent?',
          answer: 'Rent is set per house and is not posted online because it changes. When you call, you will get the current amount, what is due before move-in, and the payment schedule. Pennsylvania licensing requires a written fee schedule, and you will have it before you pay anything.',
        },
        {
          question: 'What is included?',
          answer: 'A furnished bed with bedding, and shared kitchen, bathrooms, and living space. You buy and keep your own food and hygiene items. Ask about anything specific when you call.',
        },
        {
          question: 'Are bedrooms shared?',
          answer: 'Some rooms are shared. What is open when you move in determines the room, so ask when you call. Either way, your bed and your space are yours.',
        },
        {
          question: 'What should I bring?',
          answer: 'Photo ID, your insurance card, up to three bags of clothing, up to five pairs of shoes, your hygiene items, and your own food. Bedding is provided. Bags are checked at move-in, so do not bring anything you would not want found.',
        },
        {
          question: 'Are meals provided?',
          answer: 'No. Residents buy and cook their own food. The kitchen is shared and everyone helps keep it clean.',
        },
        {
          question: 'Can I work or go to school while I live there?',
          answer: 'Yes, and it is expected. Residents work, look for work, go to school, or volunteer. Curfew and the weekly house meeting are the fixed points in the week. Everything else fits around your schedule.',
        },
        {
          question: 'Can I bring a car or take the bus?',
          answer: 'The houses are in city neighborhoods on Pittsburgh Regional Transit bus lines. If you have a car, ask about parking at the specific house when you call.',
        },
      ],
    },
    {
      title: 'Recovery and House Rules',
      items: [
        {
          question: 'What meetings are required?',
          answer: 'Our houses are AA and NA based. You are expected to go to outside 12-step meetings, get a sponsor, and work the steps, on top of the mandatory weekly in-house meeting. The exact meeting expectations are covered at intake.',
        },
        {
          question: 'Is there a curfew?',
          answer: 'Yes. Every house sets its own curfew, and it depends on your situation and where you are in your stay. If you are on probation or parole, your supervision curfew is your curfew. Work schedules and court obligations are worked out ahead of time, not the night of.',
        },
        {
          question: 'Are visitors or overnight passes allowed?',
          answer: 'Visitors and overnights follow the house rules and need approval ahead of time. You will have the written rules before you move in, so there are no surprises.',
        },
        {
          question: 'Are there chores and house meetings?',
          answer: 'Yes. Everyone keeps their own space and shares the common chores. The weekly in-house meeting is mandatory. It is where the house sorts out problems, schedules, and plans.',
        },
        {
          question: 'Is there drug testing?',
          answer: 'Yes. Random drug screens throughout your stay. Refusing a screen, tampering with one, or arguing your way out of one counts as a failed test.',
        },
        {
          question: 'What about prescriptions or medication for addiction treatment?',
          answer: 'Prescription narcotics are not permitted in the house. For any other prescription, including medication for addiction treatment, talk to us before you move in. Medication policies are explained in writing at intake. Never stop or change a medication because of something you read on a website.',
        },
        {
          question: 'What happens if I use or break a serious rule?',
          answer: 'Using, refusing a drug screen, or threatening anyone can end your stay. That policy is in writing and you will see it before you move in. If you are asked to leave, you can talk to us later about coming back.',
        },
        {
          question: 'How long can I stay?',
          answer: 'There is no fixed exit date on the calendar. Residents stay as long as they are working a program, paying rent, and following house rules, and move on when they are steady, working, and ready to live on their own. For most people that is months, not weeks.',
        },
        {
          question: 'Does New Beginnings provide counseling or medical treatment?',
          answer: 'No. New Beginnings is housing. Our founder, Susan Rua, is a licensed counselor who runs a separate practice, but living here does not require you to see her or anyone in particular. You keep your own counselor, doctor, or program.',
        },
      ],
    },
  ];
}

export const mensHousing: HousingDetailConfig = {
  audience: 'men',
  title: 'Men’s Recovery Housing',
  description: 'DDAP-licensed recovery houses for men in McKees Rocks, Observatory Hill, Brighton Heights, and Sheraden, including one for men on parole. Call 412-628-0403.',
  heroTitle: 'Men’s Recovery Housing in Pittsburgh',
  heroLead: 'Substance-free sober living houses for men in four Pittsburgh neighborhoods, including one that works with men on parole. AA and NA based, licensed by Pennsylvania, and run by people who know the work.',
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
  householdLead: 'You live with other men in recovery, go to meetings, keep up with work or school, and come home to a house where staying clean is the normal thing to do.',
  householdFeatures: sharedHouseholdFeatures,
  supportFeatures: sharedSupportFeatures,
  galleryImages: [
    { src: '/images/house-living-room.webp', alt: 'A furnished residential living room', width: 2200, height: 1467 },
    { src: '/images/household-linens.webp', alt: 'Clean folded household linens', width: 2200, height: 1236 },
    { src: '/images/pittsburgh-rowhouses.webp', alt: 'Pittsburgh row houses near public streets', width: 1800, height: 1204 },
  ],
  publicAreas: 'Our men’s houses are in McKees Rocks, Observatory Hill, Brighton Heights, and Sheraden, on Pittsburgh’s North Side and West End.',
  faqs: buildFaqs('men'),
};

export const womensHousing: HousingDetailConfig = {
  audience: 'women',
  title: 'Women’s Recovery Housing',
  description: 'A DDAP-licensed recovery house for women in Bellevue, just north of Pittsburgh, with privacy, structure, and housemates in recovery. AA and NA based. Call 412-628-0403.',
  heroTitle: 'Women’s Recovery Housing in Pittsburgh',
  heroLead: 'A substance-free sober living house for women in Pittsburgh, with the privacy, structure, and support that make staying sober possible.',
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
  householdLead: 'You live with other women in recovery, keep up with work, school, family, and appointments, and come home to a house where staying clean is the normal thing to do.',
  householdFeatures: sharedHouseholdFeatures,
  supportFeatures: sharedSupportFeatures,
  galleryImages: [
    { src: '/images/windowed-living-room.webp', alt: 'A bright living room with shared seating', width: 2200, height: 1467 },
    { src: '/images/household-linens.webp', alt: 'Clean folded household linens', width: 2200, height: 1236 },
    { src: '/images/pittsburgh-rowhouses.webp', alt: 'Pittsburgh row houses near public streets', width: 1800, height: 1204 },
  ],
  publicAreas: 'Our women’s house is in Bellevue, just north of the city.',
  faqs: buildFaqs('women'),
};
