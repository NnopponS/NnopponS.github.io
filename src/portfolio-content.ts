export const linkedIn = 'https://www.linkedin.com/in/worapon-sangsasri-0371a8376/'
export const recap = 'https://www.linkedin.com/feed/update/urn:li:activity:7531009753288691712/'
export const github = 'https://github.com/NnopponS'
export const paper = 'https://ieeexplore.ieee.org/document/11608653'

export const photos = {
  singapore: { src: 'singapore', alt: 'The WheelSense team presenting its prototype to Singapore President Tharman Shanmugaratnam at the ASEAN showcase.', caption: 'Showing WheelSense at the AI Ready ASEAN regional showcase', where: 'Singapore · 2026', width: 1280, height: 963 },
  labview: { src: 'labview', alt: 'Team Wizz receiving the LabVIEW Battle Thailand award together.', caption: 'Team Wizz after the LabVIEW Battle Thailand final', where: 'Thailand · Aug 2025', width: 800, height: 600 },
  tesa: { src: 'tesa', alt: 'Team Witz on stage at the 2025 TESA Top Gun Rally.', caption: 'Team Witz at TESA Top Gun Rally', where: 'Thailand · Nov 2025', width: 800, height: 600 },
  inewgen: { src: 'inewgen', alt: 'Teams on stage at the I-New Gen Awards.', caption: 'WheelSense’s first competition, I-New Gen', where: 'Thailand · 2026', width: 800, height: 411 },
  taiwan: { src: 'innoserve', alt: 'The WheelSense team standing together on the InnoServe award stage.', caption: 'WheelSense, 3rd place in International Exchange (English)', where: 'Taipei · Nov 2026', width: 1440, height: 960 },
  booth: { src: 'taiwan-booth', alt: 'The WheelSense team showing an instrumented wheelchair at the Thailand booth in Taipei.', caption: 'A real WheelSense prototype on the exhibition floor', where: 'Taipei · Nov 2026', width: 1440, height: 1080 },
  research: { src: 'ecticon', alt: 'Three members of the research team presenting their Best Paper certificate at ECTI-CON.', caption: 'ECTI-CON Best Paper recognition', where: 'Thailand · May 2026', width: 1280, height: 720 },
  youth: { src: 'youth-scholarship', alt: 'Worapon receiving a youth scholarship on stage.', caption: 'Quality Youths Scholarship of the Year', where: 'Thailand · Oct 2026', width: 1440, height: 961 },
} as const

export const chapters = [
  { label: 'Taking the first shot', date: 'Aug 2025 / LabVIEW', heading: 'I entered to see if I could keep up.', copy: 'LabVIEW Battle was my first competition. Team Wizz finished first nationally, and I left with enough confidence to try a much less familiar problem.', photo: photos.labview, evidence: '1st place nationally' },
  { label: 'Finding my stack', date: 'Nov 2025 / Embedded systems', heading: 'The whole system was the part I liked.', copy: 'At TESA Top Gun Rally, our team placed fourth nationwide. I realized I liked following a signal all the way from embedded hardware to the interface, rather than staying in one layer.', photo: photos.tesa, evidence: '4th place nationwide' },
  { label: 'Building WheelSense', date: 'Early 2026 / Assistive technology', heading: 'What if a wheelchair could tell us more?', copy: 'When MCP was new, my advisor challenged us to try it. That experiment helped shape WheelSense, a home prototype with indoor tracking and an assistant that could give reminders, control appliances and suggest exercises.', photo: photos.inewgen, evidence: 'I-New Gen prize, gold and popular vote · HIC merit' },
  { label: 'Widening the problem', date: 'May–Aug 2026 / Research & field demos', heading: 'It had to make sense outside our lab.', copy: 'I took our BLE tracking research to ECTI-CON, and our team showed WheelSense in Singapore. With EaseAI, we asked how the same ideas could support staff in a care facility, where they have more than one resident to look after.', photo: photos.singapore, evidence: 'First-author Best Paper · Thailand winner, AI Ready ASEAN' },
  { label: 'Taking it further', date: 'Nov 2026 / Taiwan and beyond', heading: 'The project is bigger than the first team.', copy: 'We earned third place in the English international exchange at InnoServe. Now junior students are taking the project further, with help from my friend Nipoon, who brings strengths in electronics and computing.', photo: photos.taiwan, evidence: '3rd place, InnoServe International Exchange (English)' },
] as const

export const experience = [
  ['Oct 2026–present', 'Applications Engineer', 'TECHSQUARE', 'I turn customer requirements into LabVIEW demos, workshops and technical documentation.'],
  ['Apr 2026–present', 'Research & Development Engineer', 'CED-SQUARE INNOVATION COMPANY LIMITED', 'I help build WheelSense across embedded hardware, firmware, mobile interfaces and backend services. ITEC ASEAN Top 20 was company-side project work.'],
  ['Aug 2025–present', 'Research Assistant', 'CED2 research center · Thammasat University', 'I worked on BLE/RSSI sensing experiments, including the benchmark behind my first-author ECTI-CON 2026 paper.'],
  ['Jun–Sep 2026', 'Teaching Assistant', 'Faculty of Engineering · Thammasat University', ''],
  ['Jun–Jul 2025', 'Automation Engineering Intern', 'Charoen Pokphand Group · Cixi, China', 'I completed an industrial automation internship and received a Special Contribution Award.'],
] as const

export const awardGroups = ['All', 'International', 'National', 'Research', 'Academic'] as const
export type AwardGroup = typeof awardGroups[number]
type Award = { date: string; title: string; result: string; group: Exclude<AwardGroup, 'All'>; proof?: string }
export const awards: Award[] = [
  { date: 'Nov 2026', title: 'InnoServe Awards · Taiwan', result: '3rd place, International Exchange (English) · WheelSense', group: 'International', proof: 'https://innoserveawards.tca.org.tw/award.aspx' },
  { date: 'Oct 2026', title: 'Quality Youths Scholarship of the Year', result: 'Personal recognition · Foundation of Science and Technology Council of Thailand', group: 'Academic', proof: 'https://www.thaifstt.org/index2/index.php/8-homepage?start=6' },
  { date: 'Oct 2026', title: 'ITEC ASEAN', result: 'Top 20 semifinalist · WheelSense with CED-SQUARE INNOVATION COMPANY LIMITED', group: 'International' },
  { date: 'Aug 2026', title: 'TESAIoT Secure Edge AI Service Robotics Hackathon', result: '1st place nationally · Team EaseAI', group: 'National' },
  { date: 'Jun 2026', title: 'Shanghai International Exhibition of Inventions', result: 'Gold Medal and NRCT Special Award · WheelSense', group: 'International' },
  { date: 'May 2026', title: 'ECTI-CON', result: 'Best Paper Award · First author', group: 'Research', proof: paper },
  { date: 'May 2026', title: 'AI Ready ASEAN Youth Challenge', result: 'Thailand national winner · Represented Thailand at the Singapore showcase', group: 'International' },
  { date: 'Apr 2026', title: 'Best AI Awards · Taiwan', result: 'Honorable Mention, AI Application student division · EaseAI', group: 'International' },
  { date: '2026', title: 'I-New Gen Inventors Award', result: 'Gold Medal, AI and Smart Devices category winner, and Popular Vote · WheelSense', group: 'National', proof: '/certificates/wheelsense-inewgen-award-2026-medal.pdf' },
  { date: '2026', title: 'IPITEx', result: 'Gold Medal · ALL Wheelchair', group: 'International', proof: '/certificates/ipitex2026-gold-wheelchair-motion.pdf' },
  { date: 'Jan 2026', title: 'HIC Thailand', result: 'Innovation Pitching Merit Award · WheelSense', group: 'National', proof: '/certificates/wheelsense-hic2026-pitching-certificate.pdf' },
  { date: 'Nov 2025', title: 'TESA Top Gun Rally', result: '4th place nationwide · Team Witz', group: 'National', proof: '/certificates/embedded-system-tesa-rally-2025.pdf' },
  { date: 'Aug 2025', title: 'LabVIEW Battle Thailand', result: '1st place nationwide · Team Wizz', group: 'National', proof: '/certificates/labview-battle-thailand-2025-winner.pdf' },
]
