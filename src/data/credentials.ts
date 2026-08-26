// The organization's public standing, in one place. Every credential row on the
// site (home band, footer, about, professionals) renders from this list.
export interface Credential {
  key: 'nonprofit' | 'ddap' | 'westparr';
  icon: string;
  title: string;
  short: string;
  detail: string;
  compact: string;
}

export const credentials: Credential[] = [
  { key: 'nonprofit', icon: 'landmark', title: '501(c)(3)', short: 'Pittsburgh public charity', detail: 'Public charity since 2019', compact: '501(c)(3) public charity' },
  { key: 'ddap', icon: 'badge-check', title: 'Pennsylvania DDAP', short: 'Licensed recovery houses', detail: 'Licensed recovery houses', compact: 'DDAP-licensed residences' },
  { key: 'westparr', icon: 'shield-check', title: 'WestPARR', short: 'Certified member', detail: 'Certified member', compact: 'WestPARR certified' },
];
