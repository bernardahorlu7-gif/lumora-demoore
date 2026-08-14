/**
 * Centralized, editable content for Lumora DeMoore Properties.
 * Edit values here to update the site. Do not add fabricated statistics,
 * client names, or project figures — leave placeholders where real data
 * is not yet available.
 */

export const company = {
  name: 'Lumora DeMoore Properties',
  shortName: 'Lumora DeMoore',
  tagline: 'Building with precision. Finishing with purpose.',
  intro:
    'Lumora DeMoore Properties combines construction expertise, specialist finishing and property solutions to deliver dependable results across commercial, residential and institutional projects.',
  // Update these with the company's real details.
  phone: '+233 00 000 0000',
  email: 'info@lumorademoore.com',
  location: 'Accra, Ghana',
  hours: 'Mon – Fri, 8:00am – 5:00pm',
  socials: [
    { label: 'LinkedIn', href: '#' },
    { label: 'Instagram', href: '#' },
    { label: 'Facebook', href: '#' },
  ],
}

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Quality', href: '/quality' },
  { label: 'Properties', href: '/properties' },
  { label: 'Contact', href: '/contact' },
]

export type Service = {
  slug: string
  number: string
  title: string
  short: string
  description: string
  image: string
  applications: string[]
  benefits: string[]
  environments: string[]
}

export const services: Service[] = [
  {
    slug: 'construction-solutions',
    number: '01',
    title: 'Construction Solutions',
    short: 'Construction and project execution solutions tailored to project requirements.',
    description:
      'End-to-end construction and project execution shaped around the specific requirements of each build. We coordinate structure, sequencing and finishing so that projects progress in a controlled, well-documented manner.',
    image: '/images/proj-construction.png',
    applications: ['Commercial builds', 'Residential structures', 'Institutional facilities', 'Structural extensions'],
    benefits: ['Coordinated project execution', 'Clear communication', 'Quality-focused workmanship', 'Documented progress'],
    environments: ['Commercial', 'Residential', 'Institutional'],
  },
  {
    slug: 'epoxy-flooring',
    number: '02',
    title: 'Epoxy Flooring',
    short: 'Industrial, commercial and high-performance epoxy flooring systems.',
    description:
      'Seamless epoxy flooring systems for environments that demand durability, cleanliness and a refined finish. Systems are selected and applied to suit the intended use and traffic conditions of each space.',
    image: '/images/proj-epoxy.png',
    applications: ['Warehouses', 'Showrooms', 'Workshops', 'Commercial interiors'],
    benefits: ['Seamless, easy-to-clean surface', 'Hard-wearing finish', 'Chemical and abrasion resistance', 'Refined appearance'],
    environments: ['Industrial', 'Commercial'],
  },
  {
    slug: 'protective-coatings',
    number: '03',
    title: 'Protective Coatings',
    short: 'Protective coating systems for concrete and steel surfaces.',
    description:
      'Protective coating systems that help shield concrete and steel elements from wear, moisture and environmental exposure, applied with attention to surface preparation and correct procedure.',
    image: '/images/proj-coatings.png',
    applications: ['Structural steel', 'Concrete surfaces', 'Plant and equipment areas'],
    benefits: ['Added surface protection', 'Extended service life', 'Consistent application', 'Improved durability'],
    environments: ['Industrial', 'Commercial', 'Institutional'],
  },
  {
    slug: 'fairface-concrete-finishing',
    number: '04',
    title: 'Fairface Concrete Finishing',
    short: 'Precision finishing and aesthetic treatment of exposed concrete surfaces.',
    description:
      'Precision finishing and aesthetic treatment of exposed, architectural concrete. We focus on consistent tone, clean lines and a refined surface where the concrete itself is part of the design language.',
    image: '/images/proj-fairface.png',
    applications: ['Feature walls', 'Architectural facades', 'Exposed structural elements'],
    benefits: ['Refined architectural finish', 'Consistent surface tone', 'Clean detailing', 'Design-led appearance'],
    environments: ['Commercial', 'Residential', 'Institutional'],
  },
  {
    slug: 'concrete-rectification',
    number: '05',
    title: 'Concrete Rectification',
    short: 'Correction, preparation and finishing of concrete surfaces.',
    description:
      'Correction and preparation of concrete surfaces to address imperfections and prepare substrates for finishing systems, restoring surfaces to a sound and workable condition.',
    image: '/images/intro.png',
    applications: ['Surface defect correction', 'Substrate preparation', 'Repair and make-good works'],
    benefits: ['Sound, prepared substrates', 'Improved surface quality', 'Better finishing outcomes', 'Attention to detail'],
    environments: ['Commercial', 'Residential', 'Institutional'],
  },
  {
    slug: 'waterproofing',
    number: '06',
    title: 'Waterproofing',
    short: 'Protection of buildings against water penetration and moisture damage.',
    description:
      'Waterproofing solutions that help protect buildings and structures against water penetration and moisture-related deterioration, applied with careful attention to detailing at critical junctions.',
    image: '/images/proj-waterproofing.png',
    applications: ['Roofs and terraces', 'Wet areas', 'Below-ground structures', 'Water-retaining elements'],
    benefits: ['Reduced water ingress', 'Protection of structure', 'Careful detailing', 'Long-term performance'],
    environments: ['Commercial', 'Residential', 'Institutional'],
  },
  {
    slug: 'surface-preparation-finishing',
    number: '07',
    title: 'Surface Preparation & Finishing',
    short: 'Correct preparation and finishing to support durable systems.',
    description:
      'Thorough surface preparation and finishing that underpins the performance of coating and flooring systems. Proper preparation is central to a durable, well-adhered final result.',
    image: '/images/quality.png',
    applications: ['Pre-coating preparation', 'Floor preparation', 'Surface finishing'],
    benefits: ['Strong adhesion', 'Consistent finishes', 'Durable systems', 'Reliable outcomes'],
    environments: ['Industrial', 'Commercial', 'Institutional'],
  },
  {
    slug: 'property-development',
    number: '08',
    title: 'Property Development',
    short: 'Development and property solutions focused on quality and lasting value.',
    description:
      'Property development and related solutions focused on quality, functionality and long-term value, approaching each opportunity with a considered, detail-led perspective.',
    image: '/images/properties.png',
    applications: ['Residential developments', 'Commercial developments', 'Property solutions'],
    benefits: ['Quality-led delivery', 'Functional design', 'Long-term value', 'Considered planning'],
    environments: ['Residential', 'Commercial'],
  },
]

export type Project = {
  slug: string
  name: string
  location: string
  category: string
  categories: string[]
  scope: string
  year: string
  image: string
  overview: string
  client?: string
  challenge: string
  solution: string
  completed: string[]
  gallery: string[]
}

/**
 * Placeholder portfolio entries — replace with the company's actual projects.
 * Keep names, locations and scope factual; do not add fabricated figures.
 */
export const projects: Project[] = [
  {
    slug: 'commercial-development-01',
    name: 'Commercial Development',
    location: 'Location to be confirmed',
    category: 'Commercial',
    categories: ['Commercial', 'Construction'],
    scope: 'Construction & finishing',
    year: '—',
    image: '/images/proj-commercial.png',
    overview:
      'A commercial development delivered with a focus on structural quality and a clean, contemporary finish. Details to be confirmed with the client.',
    challenge: 'Project challenge details to be added.',
    solution: 'A coordinated construction and finishing approach with careful sequencing and quality control.',
    completed: ['Structural works', 'Surface finishing', 'Protective systems'],
    gallery: ['/images/proj-commercial.png', '/images/intro.png', '/images/proj-coatings.png'],
  },
  {
    slug: 'residential-project-01',
    name: 'Residential Project',
    location: 'Location to be confirmed',
    category: 'Residential',
    categories: ['Residential', 'Construction', 'Finishing'],
    scope: 'Construction & specialist finishing',
    year: '—',
    image: '/images/proj-residential.png',
    overview:
      'A residential project combining construction with specialist finishing to deliver a refined, durable result. Details to be confirmed with the client.',
    challenge: 'Project challenge details to be added.',
    solution: 'Detail-led execution with specialist finishing tailored to the design intent.',
    completed: ['Construction works', 'Fairface concrete finishing', 'Waterproofing'],
    gallery: ['/images/proj-residential.png', '/images/proj-fairface.png', '/images/proj-waterproofing.png'],
  },
  {
    slug: 'institutional-facility-01',
    name: 'Institutional Facility',
    location: 'Location to be confirmed',
    category: 'Institutional',
    categories: ['Institutional', 'Construction'],
    scope: 'Construction & finishing',
    year: '—',
    image: '/images/proj-institutional.png',
    overview:
      'An institutional facility delivered with a focus on robustness, functionality and consistent finishing. Details to be confirmed with the client.',
    challenge: 'Project challenge details to be added.',
    solution: 'A structured delivery approach prioritising durability and documented quality.',
    completed: ['Structural works', 'Surface preparation', 'Protective coatings'],
    gallery: ['/images/proj-institutional.png', '/images/quality.png', '/images/proj-coatings.png'],
  },
  {
    slug: 'epoxy-flooring-installation-01',
    name: 'Epoxy Flooring Installation',
    location: 'Location to be confirmed',
    category: 'Specialist Finishing',
    categories: ['Epoxy', 'Finishing'],
    scope: 'Epoxy flooring system',
    year: '—',
    image: '/images/proj-epoxy.png',
    overview:
      'A high-performance epoxy flooring installation delivering a seamless, hard-wearing surface. Details to be confirmed with the client.',
    challenge: 'Project challenge details to be added.',
    solution: 'Careful surface preparation followed by a fit-for-purpose epoxy system.',
    completed: ['Surface preparation', 'Epoxy flooring application', 'Finishing'],
    gallery: ['/images/proj-epoxy.png', '/images/quality.png', '/images/intro.png'],
  },
  {
    slug: 'fairface-concrete-feature-01',
    name: 'Fairface Concrete Feature',
    location: 'Location to be confirmed',
    category: 'Specialist Finishing',
    categories: ['Fairface', 'Finishing'],
    scope: 'Fairface concrete finishing',
    year: '—',
    image: '/images/proj-fairface.png',
    overview:
      'An architectural fairface concrete feature finished for consistent tone and clean detailing. Details to be confirmed with the client.',
    challenge: 'Project challenge details to be added.',
    solution: 'Meticulous finishing to achieve a refined, design-led concrete surface.',
    completed: ['Surface preparation', 'Fairface finishing', 'Protective treatment'],
    gallery: ['/images/proj-fairface.png', '/images/intro.png', '/images/proj-coatings.png'],
  },
  {
    slug: 'waterproofing-works-01',
    name: 'Waterproofing Works',
    location: 'Location to be confirmed',
    category: 'Specialist Finishing',
    categories: ['Waterproofing', 'Finishing'],
    scope: 'Waterproofing system',
    year: '—',
    image: '/images/proj-waterproofing.png',
    overview:
      'Waterproofing works carried out with careful detailing at critical junctions to protect the structure. Details to be confirmed with the client.',
    challenge: 'Project challenge details to be added.',
    solution: 'A considered waterproofing approach with attention to detailing and continuity.',
    completed: ['Surface preparation', 'Waterproofing application', 'Detailing'],
    gallery: ['/images/proj-waterproofing.png', '/images/quality.png', '/images/intro.png'],
  },
]

export const projectFilters = [
  'All',
  'Construction',
  'Commercial',
  'Residential',
  'Institutional',
  'Epoxy',
  'Fairface',
  'Waterproofing',
  'Finishing',
]

export const values = [
  { title: 'Integrity', text: 'Honest, transparent dealing on every project.' },
  { title: 'Quality', text: 'Professional execution and carefully selected materials.' },
  { title: 'Precision', text: 'Attention to technical and finishing details.' },
  { title: 'Professionalism', text: 'A considered, dependable way of working.' },
  { title: 'Safety', text: 'A commitment to safe working practices.' },
  { title: 'Reliability', text: 'Clear communication and responsible delivery.' },
  { title: 'Innovation', text: 'Openness to better methods and materials.' },
]

export const approach = [
  { step: 'Understand', text: 'We listen to requirements and study the brief and site conditions.' },
  { step: 'Plan', text: 'We plan the works, sequencing and quality expectations.' },
  { step: 'Execute', text: 'We carry out the works with attention to detail and safety.' },
  { step: 'Inspect', text: 'We check workmanship against the agreed standards.' },
  { step: 'Deliver', text: 'We hand over completed work and document the outcome.' },
]

export const principles = [
  { title: 'Precision', text: 'Attention to technical and finishing details.' },
  { title: 'Quality', text: 'Professional execution and carefully selected materials.' },
  { title: 'Reliability', text: 'Clear communication and responsible project execution.' },
  { title: 'Long-Term Value', text: 'Solutions designed to deliver durability and lasting value.' },
]

export const qualityAreas = [
  {
    title: 'Quality Control',
    text: 'Inspection, preparation, material handling and workmanship standards applied throughout each project.',
  },
  {
    title: 'Surface Preparation',
    text: 'Proper preparation is critical to the success of finishing systems and long-term performance.',
  },
  {
    title: 'Material Quality',
    text: 'Appropriate products, correctly stored and applied following recommended procedures.',
  },
  {
    title: 'Workmanship',
    text: 'Trained personnel, attention to detail and proper execution on every element.',
  },
  {
    title: 'Safety',
    text: 'A professional commitment to safe working practices on site.',
  },
  {
    title: 'Project Documentation',
    text: 'Progress, measurements, specifications and completion can be documented and shared.',
  },
]

export const serviceOptions = [
  'Construction Solutions',
  'Epoxy Flooring',
  'Protective Coatings',
  'Fairface Concrete Finishing',
  'Concrete Rectification',
  'Waterproofing',
  'Surface Preparation & Finishing',
  'Property Development',
  'Other',
]

export const projectTypes = ['Commercial', 'Residential', 'Institutional', 'Industrial', 'Other']
