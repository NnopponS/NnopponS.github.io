import {
  Award,
  BadgeCheck,
  BookOpen,
  Bot,
  Cpu,
  FileText,
  GraduationCap,
  HeartPulse,
  MapPinned,
  Medal,
  RadioTower,
  Trophy,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type NavItem = {
  label: string
  href: string
}

export type JourneyCheckpoint = {
  id: string
  marker: string
  title: string
  summary: string
  detail: string
  icon: LucideIcon
}

export type ProjectItem = {
  title: string
  period: string
  summary: string
  impact: string
  tags: string[]
  href?: string
}

export type HonorItem = {
  title: string
  issuer: string
  date: string
  detail: string
  icon: LucideIcon
}

export type CertificateItem = {
  title: string
  issuer: string
  date: string
  category: 'Awards' | 'Academic' | 'Experience' | 'Language' | 'CV'
  pdfPath: string
  thumbnailPath: string
  featured?: boolean
}

const certificatePath = (slug: string) => `/certificates/${slug}.pdf`
const thumbPath = (slug: string) => `/certificate-thumbs/${slug}.jpg`

export const navItems: NavItem[] = [
  { label: 'Story', href: '#story' },
  { label: 'Projects', href: '#projects' },
  { label: 'Awards', href: '#awards' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Contact', href: '#contact' },
]

export const journeyCheckpoints: JourneyCheckpoint[] = [
  {
    id: 'profile',
    marker: '01',
    title: 'Profile',
    summary: 'Electrical engineering student building assistive intelligence.',
    detail:
      'Fourth-year student at Thammasat University with a focus on AI HealthTech, embedded systems, motion sensing, and smart environments.',
    icon: HeartPulse,
  },
  {
    id: 'wheelsense',
    marker: '02',
    title: 'WheelSense',
    summary: 'AI motion tracking and smart care platform.',
    detail:
      'Combines BLE-based indoor positioning, caregiver monitoring, smart-home control, and an AI assistive-care layer for elderly and wheelchair users.',
    icon: RadioTower,
  },
  {
    id: 'research',
    marker: '03',
    title: 'Research',
    summary: 'BLE motion tracking benchmark and LLM comparison.',
    detail:
      'First-author ECTI-CON 2026 paper on BLE-based indoor motion tracking using machine learning and large language models.',
    icon: BookOpen,
  },
  {
    id: 'honors',
    marker: '04',
    title: 'Honors',
    summary: 'National and international recognition.',
    detail:
      'Winner and award recipient across AI, invention, embedded systems, LabVIEW, academic excellence, and international internship tracks.',
    icon: Trophy,
  },
  {
    id: 'certificates',
    marker: '05',
    title: 'Certificates',
    summary: 'Public proof of awards, language scores, and training.',
    detail:
      'A public gallery of selected certificates, award documents, English proficiency evidence, and a downloadable CV.',
    icon: BadgeCheck,
  },
]

export const projectItems: ProjectItem[] = [
  {
    title: 'WheelSense',
    period: 'Jul 2025 - Present',
    summary:
      'AI HealthTech platform for elderly and wheelchair users, combining motion tracking, indoor localization, caregiver workflows, and smart-home control.',
    impact:
      'Built as a working assistive-care prototype with real dashboards, alert flows, and a public preview app.',
    tags: ['Next.js', 'FastAPI', 'BLE RSSI', 'MCP', 'Home Assistant'],
    href: 'https://wheelsense-preview.vercel.app/login',
  },
  {
    title: 'BLE Motion Tracking Research',
    period: 'ECTI-CON 2026',
    summary:
      'First-author research comparing KNN, XGBoost, Claude Opus, and Gemini on BLE RSSI sequence recognition tasks.',
    impact:
      'Created an experimental benchmark using ESP32-S3 anchors and M5StickC Plus2 wearable data across trajectory and noise tests.',
    tags: ['ESP32-S3', 'M5StickC Plus2', 'XGBoost', 'LLM evaluation'],
  },
  {
    title: 'TESA Top Gun Rally Drone System',
    period: 'Nov 2025',
    summary:
      'Autonomous and resilient drone operations system for defense and surveillance scenarios under national competition pressure.',
    impact:
      'Team Witz achieved 4th place nationwide and received The Best of the Best Embedded System Developers title.',
    tags: ['MATLAB', 'Raspberry Pi 5', 'Anti-spoofing', 'Visualization'],
  },
  {
    title: 'TSE Student Welfare Line Bot',
    period: 'Aug 2024 - Jun 2025',
    summary:
      'Line Bot for news updates, student welfare, academic support, and consultation flows inside the Faculty of Engineering.',
    impact:
      'Improved student communication while supporting TSE Open House and engineering student activities.',
    tags: ['Line Bot', 'Student support', 'Operations', 'Automation'],
  },
]

export const honorItems: HonorItem[] = [
  {
    title: 'Thailand National Winner',
    issuer: 'AI Ready ASEAN Youth Challenge 2026',
    date: 'May 2026',
    detail:
      'Represented Thailand with WheelSense at the Singapore Regional Showcase and demonstrated the project to the President of Singapore.',
    icon: Medal,
  },
  {
    title: 'Honorable Award',
    issuer: '2026 Best AI Awards, Taiwan',
    date: 'Apr 2026',
    detail:
      'Recognized in the AI Student Division for EaseAI within WheelSense, combining motion tracking, neuro-symbolic assistance, and nursing-home smart-environment support.',
    icon: Award,
  },
  {
    title: 'Winner and Popular Vote',
    issuer: 'Thailand New Gen Inventors Award 2026',
    date: 'Jan 2026',
    detail:
      'Grand Prize for Wheel Sense: Motion Tracking Sensor with Smart Home Controller for Wheelchair Users.',
    icon: Trophy,
  },
  {
    title: 'Champion',
    issuer: 'LabVIEW Battle Thailand 2025',
    date: 'Aug 2025',
    detail:
      'First place in a timed engineering problem-solving competition using LabVIEW.',
    icon: Cpu,
  },
]

export const certificateItems: CertificateItem[] = [
  {
    title: 'Worapon Sangsasri CV',
    issuer: 'Portfolio document',
    date: '2026',
    category: 'CV',
    pdfPath: certificatePath('cv-worapon-sangsasri'),
    thumbnailPath: thumbPath('cv-worapon-sangsasri'),
    featured: true,
  },
  {
    title: 'Combined Awards',
    issuer: 'Award evidence package',
    date: '2026',
    category: 'Awards',
    pdfPath: certificatePath('combined-awards-worapon-sangsasri'),
    thumbnailPath: thumbPath('combined-awards-worapon-sangsasri'),
    featured: true,
  },
  {
    title: 'AI Awards Supporting Documents',
    issuer: 'English award evidence',
    date: '2026',
    category: 'Awards',
    pdfPath: certificatePath('ai-awards-english-supporting-documents'),
    thumbnailPath: thumbPath('ai-awards-english-supporting-documents'),
    featured: true,
  },
  {
    title: 'WheelSense I-New Gen Award Medal',
    issuer: 'National Research Council of Thailand',
    date: 'Jan 2026',
    category: 'Awards',
    pdfPath: certificatePath('wheelsense-inewgen-award-2026-medal'),
    thumbnailPath: thumbPath('wheelsense-inewgen-award-2026-medal'),
    featured: true,
  },
  {
    title: 'IPITEx 2026 Gold Medal',
    issuer: 'Thailand Inventors Day 2026',
    date: 'Jan 2026',
    category: 'Awards',
    pdfPath: certificatePath('ipitex2026-gold-wheelchair-motion'),
    thumbnailPath: thumbPath('ipitex2026-gold-wheelchair-motion'),
    featured: true,
  },
  {
    title: 'HIC 2026 Pitching Certificate',
    issuer: 'Hyper Interdisciplinary Conference Thailand',
    date: '2026',
    category: 'Awards',
    pdfPath: certificatePath('wheelsense-hic2026-pitching-certificate'),
    thumbnailPath: thumbPath('wheelsense-hic2026-pitching-certificate'),
  },
  {
    title: 'LabVIEW Battle Thailand Winner',
    issuer: 'TECHSQUARE CO., LTD.',
    date: 'Aug 2025',
    category: 'Awards',
    pdfPath: certificatePath('labview-battle-thailand-2025-winner'),
    thumbnailPath: thumbPath('labview-battle-thailand-2025-winner'),
  },
  {
    title: 'TESA Top Gun Rally 2025',
    issuer: 'Thai Embedded Systems Association',
    date: 'Nov 2025',
    category: 'Awards',
    pdfPath: certificatePath('embedded-system-tesa-rally-2025'),
    thumbnailPath: thumbPath('embedded-system-tesa-rally-2025'),
  },
  {
    title: 'CP CIXI Internship Special Award',
    issuer: 'Charoen Pokphand Group',
    date: 'Jul 2025',
    category: 'Experience',
    pdfPath: certificatePath('internship-special-contribution-award-2025'),
    thumbnailPath: thumbPath('internship-special-contribution-award-2025'),
  },
  {
    title: 'Dean List 2566',
    issuer: 'Thammasat University',
    date: '2023',
    category: 'Academic',
    pdfPath: certificatePath('deans-list-2566'),
    thumbnailPath: thumbPath('deans-list-2566'),
  },
  {
    title: 'Dean List 2565',
    issuer: 'Thammasat University',
    date: '2022',
    category: 'Academic',
    pdfPath: certificatePath('deans-list-2565'),
    thumbnailPath: thumbPath('deans-list-2565'),
  },
  {
    title: 'TSE Internal Activities Award',
    issuer: 'Faculty of Engineering, Thammasat University',
    date: '2024',
    category: 'Academic',
    pdfPath: certificatePath('tse-award-internal-activities'),
    thumbnailPath: thumbPath('tse-award-internal-activities'),
  },
  {
    title: 'English Proficiency Package',
    issuer: 'TUGET 590 and TOEIC 790',
    date: '2026',
    category: 'Language',
    pdfPath: certificatePath('english-proficiency-tuget-toeic'),
    thumbnailPath: thumbPath('english-proficiency-tuget-toeic'),
  },
  {
    title: 'TOEIC Score',
    issuer: 'TOEIC',
    date: '2026',
    category: 'Language',
    pdfPath: certificatePath('toeic-worapon'),
    thumbnailPath: thumbPath('toeic-worapon'),
  },
  {
    title: 'TUGET Score Information',
    issuer: 'Thammasat University',
    date: '2026',
    category: 'Language',
    pdfPath: certificatePath('tuget-information-worapon'),
    thumbnailPath: thumbPath('tuget-information-worapon'),
  },
]

export const skillGroups = [
  {
    label: 'Sensing and embedded',
    icon: Cpu,
    items: ['BLE RSSI', 'ESP32-S3', 'MQTT', 'nRF Connect SDK', 'PlatformIO'],
  },
  {
    label: 'AI and software',
    icon: Bot,
    items: ['Python', 'FastAPI', 'React', 'Next.js', 'Docker', 'XGBoost'],
  },
  {
    label: 'Care workflows',
    icon: MapPinned,
    items: ['Indoor positioning', 'Fall alerts', 'Smart home control', 'Caregiver dashboards'],
  },
  {
    label: 'Evidence',
    icon: FileText,
    items: ['ECTI-CON 2026', 'TOEIC 790', 'GPA 3.72', 'Dean List'],
  },
  {
    label: 'Education',
    icon: GraduationCap,
    items: ['Thammasat University', 'Electrical Engineering', 'AI HealthTech'],
  },
]
