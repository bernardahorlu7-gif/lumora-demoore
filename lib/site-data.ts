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
  phone: '+233 54 327 6570 / +233 55 073 7774',
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

export type ServiceStep = { step: number; title: string; description: string }
export type ServiceFaq = { question: string; answer: string }
export type Service = {
  slug: string
  number: string
  title: string
  short: string
  description: string
  overview: string
  whatItIs: string
  whyItMatters: string
  image: string
  applications: string[]
  benefits: string[]
  environments: string[]
  materialsOrSystems: string[]
  qualityConsiderations: string[]
  process: ServiceStep[]
  maintenanceConsiderations: string[]
  faqs: ServiceFaq[]
  relatedServices: string[]
}

const sharedFaqs = (service: string): ServiceFaq[] => [
  { question: `How is ${service} scoped?`, answer: 'The scope depends on the site condition, intended use, specification, access and the required finish. We confirm these points before proposing an execution plan.' },
  { question: 'Can this work be carried out on an existing building?', answer: 'Often, yes, but suitability depends on the existing substrate, access, moisture and the condition of the affected area. An assessment is required before confirming the method.' },
  { question: 'What should a client expect at handover?', answer: 'We review the completed work against the agreed scope, identify any outstanding items and provide practical guidance for protecting and maintaining the finished area.' },
]

export const services: Service[] = [
  {
    slug: 'construction-solutions', number: '01', title: 'Construction Solutions',
    short: 'Coordinated construction delivery shaped around project requirements.',
    description: 'Construction and project execution support for commercial, residential and institutional work, with coordination across planning, procurement, site activities and finishing.',
    overview: 'A construction project is a sequence of connected decisions, trades and inspections. Lumora helps coordinate that sequence so the work can move from requirement to handover with clear scope and practical communication.',
    whatItIs: 'Construction solutions cover the organisation and delivery of building work from understanding the requirement through site assessment, scope definition, planning, procurement coordination, execution, quality checks and handover. The precise scope is agreed around the project rather than assumed in advance.',
    whyItMatters: 'Good coordination reduces avoidable rework, keeps interfaces between activities visible and gives the client a clearer basis for reviewing progress, workmanship and outstanding items.',
    image: '/images/proj-construction.png', applications: ['Commercial buildings', 'Residential structures', 'Institutional facilities', 'Extensions and refurbishment works'], benefits: ['Coordinated project delivery', 'Clear scope and sequencing', 'Quality-focused site execution', 'Documented progress'], environments: ['Commercial', 'Residential', 'Institutional'], materialsOrSystems: ['Concrete and masonry works', 'Building finishes', 'Protective and waterproofing systems', 'Project-specific materials'], qualityConsiderations: ['Scope clarity', 'Trade interfaces', 'Material coordination', 'Site safety', 'Inspection and handover records'],
    process: [
      { step: 1, title: 'Understand the Requirement', description: 'Review the brief, intended use, drawings and the client’s practical priorities.' },
      { step: 2, title: 'Assess the Site', description: 'Consider access, existing conditions, constraints and interfaces with surrounding work.' },
      { step: 3, title: 'Define the Scope', description: 'Clarify inclusions, exclusions, sequencing and the information needed to proceed.' },
      { step: 4, title: 'Plan & Coordinate', description: 'Organise activities, procurement and site coordination around the agreed scope.' },
      { step: 5, title: 'Execute & Inspect', description: 'Manage site delivery, quality checks, finishing, rectification and final review.' },
      { step: 6, title: 'Handover', description: 'Review the completed work and communicate practical follow-up requirements.' },
    ],
    maintenanceConsiderations: ['Use and maintain completed elements in accordance with their intended application.', 'Record outstanding items and follow-up requirements at handover.'], faqs: sharedFaqs('construction work'), relatedServices: ['procurement-supply-solutions', 'surface-preparation-finishing', 'property-development'],
  },
  {
    slug: 'epoxy-flooring', number: '02', title: 'Epoxy Flooring', short: 'Seamless flooring systems for demanding commercial and industrial environments.',
    description: 'Durable seamless flooring systems for demanding environments. The system is selected around the substrate, traffic, use conditions and required appearance.', overview: 'Epoxy flooring is a resin-based floor system installed over a suitably prepared substrate. A typical build-up may include preparation, repairs, primer, body or build coats and a specified finish, but the final system depends on the project requirements.', whatItIs: 'Epoxy flooring can provide a hard-wearing and cleanable surface when the substrate is sound, preparation is appropriate and the selected system matches the use conditions. Existing floors must be assessed for moisture, contamination, cracks, weak areas and compatibility before installation.', whyItMatters: 'The floor is often a working surface as well as a visual one. Correct system selection and preparation affect adhesion, appearance, cleaning, traffic performance and the need for future repairs.', image: '/images/proj-epoxy.png', applications: ['Warehouses', 'Workshops', 'Showrooms', 'Commercial interiors', 'Garages and service areas'], benefits: ['Seamless finish', 'Easier routine cleaning', 'Suitable system selection for traffic', 'Controlled appearance'], environments: ['Industrial', 'Commercial'], materialsOrSystems: ['Mechanical preparation methods', 'Repairs and fillers where specified', 'Primers', 'Epoxy build coats', 'Decorative or slip-resistant finishes where required'], qualityConsiderations: ['Substrate condition', 'Surface preparation', 'System compatibility', 'Mixing and application', 'Finish consistency', 'Curing and protection'], process: [
      { step: 1, title: 'Site Assessment', description: 'Review the existing floor, intended use, traffic conditions and relevant site constraints.' },
      { step: 2, title: 'Substrate Preparation', description: 'Select appropriate preparation such as grinding, scarifying or another suitable method.' },
      { step: 3, title: 'Repairs & Rectification', description: 'Address cracks, voids, weak areas and surface defects where required.' },
      { step: 4, title: 'Priming', description: 'Apply the specified primer or system layer to establish suitable adhesion.' },
      { step: 5, title: 'System Application', description: 'Mix and apply the selected epoxy system in line with its requirements.' },
      { step: 6, title: 'Finishing', description: 'Achieve the agreed colour, texture, appearance and detailing.' },
      { step: 7, title: 'Curing & Protection', description: 'Protect the surface from premature traffic and contamination while it cures.' },
      { step: 8, title: 'Inspection & Handover', description: 'Inspect the completed installation and review care requirements with the client.' },
    ], maintenanceConsiderations: ['Use cleaning methods appropriate to the selected system.', 'Avoid premature traffic or aggressive treatment before the system has adequately cured.', 'Report damage or localised wear early so it can be assessed.'], faqs: [{ question: 'Can epoxy be installed over an existing floor?', answer: 'This depends on substrate condition, moisture, contamination and compatibility. Preparation or removal may be necessary.' }, { question: 'How long does installation take?', answer: 'Timing depends on the area, preparation requirements, selected system, site conditions and curing requirements.' }, { question: 'Why is preparation important?', answer: 'Preparation removes or manages conditions that can affect adhesion, appearance and system performance.' }], relatedServices: ['surface-preparation-finishing', 'protective-coatings', 'concrete-rectification', 'procurement-supply-solutions'],
  },
  {
    slug: 'protective-coatings', number: '03', title: 'Protective Coatings', short: 'Coating systems that help protect concrete and steel from demanding exposure.', description: 'Protective coating systems for concrete and metal surfaces, selected around exposure, substrate condition, appearance and the performance required by the project.', overview: 'Protective coatings form part of a surface protection strategy. They may be used to manage moisture, abrasion, environmental exposure or corrosion-related risk where the selected system is designed for those conditions.', whatItIs: 'The work can include assessment, cleaning and preparation, primer, intermediate coats and topcoat. Concrete and steel require different preparation and system considerations, so the specification must follow the substrate and exposure rather than a one-size-fits-all product.', whyItMatters: 'A coating can only perform as intended when the substrate, preparation, compatibility and application conditions are controlled. The right approach can help protect an asset’s surface and maintain its appearance.', image: '/images/proj-coatings.png', applications: ['Structural steel', 'Concrete surfaces', 'Plant and equipment areas', 'Commercial and institutional interiors'], benefits: ['Surface protection', 'Improved finish consistency', 'Exposure-aware system selection', 'Maintainable surfaces'], environments: ['Industrial', 'Commercial', 'Institutional'], materialsOrSystems: ['Primers', 'Intermediate coats where specified', 'Protective topcoats', 'Concrete and metal preparation systems'], qualityConsiderations: ['Substrate cleanliness', 'Exposure and compatibility', 'Coat continuity', 'Application consistency', 'Protection during curing'], process: [{ step: 1, title: 'Assessment', description: 'Review the substrate, exposure, existing coating and intended service conditions.' }, { step: 2, title: 'Surface Preparation', description: 'Remove contaminants, loose material or unsound coating and prepare the surface.' }, { step: 3, title: 'Primer', description: 'Apply a compatible primer where the selected system requires one.' }, { step: 4, title: 'Build Coats', description: 'Apply intermediate layers or build coats in the specified sequence.' }, { step: 5, title: 'Topcoat', description: 'Complete the protective and visual finish with the selected topcoat.' }, { step: 6, title: 'Inspection & Handover', description: 'Review coverage, finish and protection requirements before handover.' }], maintenanceConsiderations: ['Inspect areas exposed to impact, abrasion or moisture as part of routine building care.', 'Clean using methods compatible with the selected coating system.', 'Assess localised damage before recoating or repair.'], faqs: sharedFaqs('protective coatings'), relatedServices: ['surface-preparation-finishing', 'waterproofing', 'procurement-supply-solutions'],
  },
  {
    slug: 'fairface-concrete-finishing', number: '04', title: 'Fairface Concrete Finishing', short: 'Refined exposed-concrete surfaces with attention to consistency and detail.', description: 'Finishing and aesthetic treatment for exposed concrete where the concrete surface is part of the architectural language.', overview: 'Fairface finishing is concerned with refining an exposed concrete appearance rather than simply painting or covering the surface. Consistency of tone, repairs, joints and details all influence the final result.', whatItIs: 'The work may involve assessment, cleaning, localised surface repairs, reprofiling, joint and detail treatment, controlled finishing and protective treatment where specified. The target appearance should be agreed with the client or design team because existing concrete conditions vary.', whyItMatters: 'Exposed concrete is read as a finished architectural surface. Inconsistent repairs, uncontrolled stains, rough edges or untreated details can affect the visual quality of the whole elevation or interior.', image: '/images/proj-fairface.png', applications: ['Feature walls', 'Architectural facades', 'Exposed structural elements', 'Commercial and residential interiors'], benefits: ['Refined exposed-concrete appearance', 'Consistent surface tone', 'Clean detailing', 'Design-led finish'], environments: ['Commercial', 'Residential', 'Institutional'], materialsOrSystems: ['Compatible repair materials', 'Surface conditioning methods', 'Joint and detail treatments', 'Protective treatments where specified'], qualityConsiderations: ['Appearance consistency', 'Repair visibility', 'Joint treatment', 'Edge quality', 'Final inspection under suitable light'], process: [{ step: 1, title: 'Review the Surface', description: 'Assess tone, texture, joints, tie holes, edges, stains and visible imperfections.' }, { step: 2, title: 'Prepare', description: 'Clean and prepare the surface without creating unnecessary variation in the finish.' }, { step: 3, title: 'Repair & Reprofile', description: 'Treat localised defects with methods appropriate to their depth and location.' }, { step: 4, title: 'Treat Details', description: 'Coordinate joints, edges, penetrations and transitions for a consistent appearance.' }, { step: 5, title: 'Finish', description: 'Refine the surface to the agreed visual standard and protect where specified.' }, { step: 6, title: 'Inspect', description: 'Review the completed surface for consistency, detailing and outstanding items.' }], maintenanceConsiderations: ['Use gentle, compatible cleaning methods.', 'Monitor new staining, cracking or impact damage and assess before treatment.', 'Maintain adjoining details so water and dirt do not undermine the finish.'], faqs: sharedFaqs('fairface concrete finishing'), relatedServices: ['concrete-rectification', 'surface-preparation-finishing', 'protective-coatings'],
  },
  {
    slug: 'concrete-rectification', number: '05', title: 'Concrete Rectification', short: 'Assessment-led repair and reprofiling of defective concrete surfaces.', description: 'Concrete rectification for defects such as honeycombing, voids, cracks, damaged edges, poor finishes and localised deterioration.', overview: 'Rectification is not a single universal repair operation. The appropriate method depends on the cause, location, depth, extent and condition of the defect, as well as the required finish and use of the element.', whatItIs: 'The service addresses defective or poorly finished concrete through inspection, removal of unsound material where required, cleaning, preparation, repair or reprofiling and finishing. Treatment of reinforcement may be considered where it is exposed and relevant to the agreed scope.', whyItMatters: 'Unassessed defects can affect appearance, later finishes and the condition of surrounding material. An assessment-led repair helps distinguish a local surface issue from a more significant condition that needs further review.', image: '/images/intro.png', applications: ['Honeycombing and voids', 'Surface defects and cracks', 'Damaged edges', 'Make-good works', 'Substrate preparation'], benefits: ['Sounder working surfaces', 'Improved appearance', 'Better preparation for finishes', 'Defect-specific treatment'], environments: ['Commercial', 'Residential', 'Institutional'], materialsOrSystems: ['Cleaning and preparation methods', 'Repair and reprofiling materials', 'Compatible finishing systems', 'Reinforcement treatment where applicable'], qualityConsiderations: ['Defect cause and extent', 'Removal of unsound material', 'Surface cleanliness', 'Repair compatibility', 'Curing and finish quality'], process: [{ step: 1, title: 'Inspect', description: 'Map visible defects and consider location, depth, cause and surrounding condition.' }, { step: 2, title: 'Identify the Defect', description: 'Separate surface imperfections from areas that require a more involved assessment.' }, { step: 3, title: 'Remove Unsound Material', description: 'Open up or remove defective material where required by the repair method.' }, { step: 4, title: 'Prepare & Clean', description: 'Prepare the repair area and remove dust, loose material and contaminants.' }, { step: 5, title: 'Treat & Repair', description: 'Treat reinforcement where applicable, then repair, reprofile and finish the area.' }, { step: 6, title: 'Protect & Inspect', description: 'Allow the repair to develop appropriately, protect it and complete final inspection.' }], maintenanceConsiderations: ['Monitor repaired areas for cracking, impact or renewed moisture exposure.', 'Keep records of areas repaired and any follow-up recommendations.', 'Investigate recurring defects rather than repeatedly masking the symptom.'], faqs: sharedFaqs('concrete rectification'), relatedServices: ['fairface-concrete-finishing', 'surface-preparation-finishing', 'waterproofing'],
  },
  {
    slug: 'waterproofing', number: '06', title: 'Waterproofing', short: 'Building-envelope and wet-area protection against water penetration.', description: 'Waterproofing solutions for roofs, wet areas, basements, concrete structures, balconies, terraces, external walls, joints and penetrations where the selected system is suitable.', overview: 'Waterproofing controls water movement through relevant building elements. It is not only the membrane or coating: substrate condition, falls, joints, junctions, penetrations and protection all influence the result.', whatItIs: 'The work begins by identifying the likely entry point and pathway of water. The substrate and details are then assessed before selecting and applying a suitable system. Different areas may require different approaches, and no single waterproofing system is suitable for every condition.', whyItMatters: 'Uncontrolled water can affect finishes, use of spaces and the condition of building elements. Proper detailing at joints, penetrations and junctions is as important as the main field application.', image: '/images/proj-waterproofing.png', applications: ['Roofs and terraces', 'Wet areas', 'Basements', 'Concrete structures', 'Balconies and external walls', 'Joints and penetrations'], benefits: ['Managed water ingress', 'Protection of building elements', 'Detail-focused application', 'Clearer maintenance requirements'], environments: ['Commercial', 'Residential', 'Institutional'], materialsOrSystems: ['Primers where required', 'Membranes or liquid-applied systems', 'Joint and crack treatments', 'Detailing accessories', 'Protection layers where required'], qualityConsiderations: ['Water-entry diagnosis', 'Substrate condition', 'Falls and drainage', 'Joints and penetrations', 'System compatibility', 'Continuity of application'], process: [{ step: 1, title: 'Inspect', description: 'Review affected areas, adjacent details, drainage and signs of water entry.' }, { step: 2, title: 'Identify the Problem Area', description: 'Trace likely entry points and pathways rather than treating only the visible symptom.' }, { step: 3, title: 'Assess the Substrate', description: 'Check condition, moisture, cracks, loose material and compatibility with the proposed system.' }, { step: 4, title: 'Prepare the Surface', description: 'Clean, repair and prepare the area for the specified waterproofing system.' }, { step: 5, title: 'Treat Details', description: 'Address cracks, joints, penetrations, junctions and transitions carefully.' }, { step: 6, title: 'Apply the System', description: 'Apply primer and waterproofing layers in the agreed sequence.' }, { step: 7, title: 'Protect Where Required', description: 'Install or coordinate protection so completed work is not damaged by following trades.' }, { step: 8, title: 'Inspect & Handover', description: 'Review continuity and details, then communicate practical follow-up requirements.' }], maintenanceConsiderations: ['Keep drainage points and adjacent details clear.', 'Inspect after severe weather or when signs of water return.', 'Avoid puncturing or overloading protected areas without reviewing the system.'], faqs: [{ question: 'Can waterproofing fix every leak?', answer: 'No. The source and pathway of water must first be assessed, because the visible leak may be away from the entry point.' }, { question: 'Is one system suitable for every area?', answer: 'No. Selection depends on the substrate, exposure, movement, detailing, moisture and the required performance.' }, { question: 'Why do joints and penetrations matter?', answer: 'They interrupt the main surface and create potential pathways, so they need compatible detailing and continuity.' }], relatedServices: ['surface-preparation-finishing', 'concrete-rectification', 'construction-solutions', 'procurement-supply-solutions'],
  },
  {
    slug: 'surface-preparation-finishing', number: '07', title: 'Surface Preparation & Finishing', short: 'Preparation work that supports adhesion, appearance and system performance.', description: 'Cleaning, preparation, conditioning and finishing for surfaces that will receive coatings, flooring or other specified treatments.', overview: 'Surface preparation is often the critical part of successful finishing work. A well-selected finish cannot compensate for contaminants, unsound material or unsuitable preparation underneath it.', whatItIs: 'The service can include cleaning, removal of contaminants, mechanical preparation, removal of loose material, profiling, crack and defect treatment, priming, conditioning and final preparation before the finish is applied.', whyItMatters: 'Poor preparation can affect adhesion, appearance, uniformity and the performance of the finished system. Preparation should be selected around the substrate and the finish that follows.', image: '/images/quality.png', applications: ['Floor preparation', 'Pre-coating preparation', 'Concrete finishing', 'Refurbishment surfaces'], benefits: ['Better adhesion', 'More consistent finishes', 'Reduced avoidable defects', 'Prepared surfaces for downstream work'], environments: ['Industrial', 'Commercial', 'Institutional'], materialsOrSystems: ['Cleaning and degreasing methods', 'Mechanical preparation', 'Repair and profiling materials', 'Primers and conditioners'], qualityConsiderations: ['Contaminant removal', 'Surface profile', 'Unsound material', 'Moisture and compatibility', 'Final cleanliness before application'], process: [{ step: 1, title: 'Review the Finish', description: 'Understand the coating, flooring or finish that will follow and its preparation requirements.' }, { step: 2, title: 'Clean', description: 'Remove dust, grease, laitance, loose material and other contaminants as appropriate.' }, { step: 3, title: 'Prepare Mechanically', description: 'Profile or abrade the surface using a method suited to the substrate and scope.' }, { step: 4, title: 'Treat Defects', description: 'Address cracks, voids, weak areas and localised defects before finishing.' }, { step: 5, title: 'Prime or Condition', description: 'Apply the specified primer or conditioner where required.' }, { step: 6, title: 'Final Check', description: 'Confirm that the surface is ready for the next system or finishing operation.' }], maintenanceConsiderations: ['Protect prepared surfaces from dust, traffic and contamination before the next trade.', 'Coordinate preparation with the application programme to avoid re-contamination.', 'Inspect new defects before applying a finish.'], faqs: sharedFaqs('surface preparation'), relatedServices: ['epoxy-flooring', 'protective-coatings', 'concrete-rectification'],
  },
  {
    slug: 'procurement-supply-solutions', number: '08', title: 'Procurement & Supply Solutions', short: 'Sourcing and supply coordination for construction materials, systems and project requirements.', description: 'Procurement support for construction materials, building products, specialist systems, equipment and project-specific requirements, from requirement review through delivery coordination.', overview: 'Procurement is more than finding a product. It involves understanding the requirement, reviewing the specification, sourcing appropriate suppliers, comparing commercial and practical options, coordinating availability and arranging delivery.', whatItIs: 'Lumora can coordinate sourcing across construction and building materials, finishing materials, flooring systems, waterproofing products, paints and coatings, concrete products, architectural products, electrical, plumbing and mechanical/MEP supplies, tools, equipment, building systems, specialist products and lift systems.', whyItMatters: 'Material choices and delivery timing affect programme, compatibility, quality and site coordination. A structured procurement process gives clients a clearer basis for comparing options and managing project requirements.', image: '/images/proj-commercial.png', applications: ['Construction materials', 'Finishing and flooring systems', 'Waterproofing products', 'Paints and coatings', 'Electrical, plumbing and MEP supplies', 'Equipment, tools and building systems', 'Lift and elevator systems', 'Bulk or client-specific requirements'], benefits: ['Specification alignment', 'Supplier sourcing', 'Commercial comparison', 'Availability and delivery coordination'], environments: ['Commercial', 'Residential', 'Institutional', 'Industrial'], materialsOrSystems: ['Building materials', 'Specialist construction products', 'Finishes and coatings', 'Equipment and tools', 'Building systems'], qualityConsiderations: ['Specification compliance', 'Product selection', 'Supplier reliability', 'Commercial comparison', 'Delivery coordination', 'Documentation'], process: [{ step: 1, title: 'Requirement Identification', description: 'Clarify quantities, intended use, delivery location, programme and client priorities.' }, { step: 2, title: 'Specification Review', description: 'Review drawings, schedules and stated performance or compatibility requirements.' }, { step: 3, title: 'Source Products & Suppliers', description: 'Identify suitable products and suppliers for the agreed requirement.' }, { step: 4, title: 'Compare Quotations', description: 'Compare scope, lead time, availability, exclusions and commercial terms.' }, { step: 5, title: 'Evaluate Commercially', description: 'Present relevant options with attention to fit, not simply headline price.' }, { step: 6, title: 'Procure', description: 'Coordinate the agreed order and confirm the information needed for delivery.' }, { step: 7, title: 'Coordinate Logistics', description: 'Manage delivery timing, access, site contacts and project interfaces.' }, { step: 8, title: 'Deliver & Handover', description: 'Confirm receipt and pass on relevant product or delivery documentation.' }], maintenanceConsiderations: ['Store products according to their requirements and protect them from damage.', 'Retain relevant delivery and product information for future reference.', 'Confirm substitutions with the responsible consultant or client before use.'], faqs: [{ question: 'Can Lumora source materials specified by a client or consultant?', answer: 'Yes, requirements and specifications can be reviewed and suitable sourcing options coordinated around the project need.' }, { question: 'Does procurement always mean the lowest price?', answer: 'No. Suitability, specification alignment, availability, supplier reliability and delivery all matter alongside commercial comparison.' }, { question: 'Can you coordinate specialist systems?', answer: 'Specialist systems can be considered where the project requirement is clear and the appropriate supplier or specialist partner is identified.' }], relatedServices: ['construction-solutions', 'epoxy-flooring', 'waterproofing', 'lift-installation-building-systems'],
  },
  {
    slug: 'lift-installation-building-systems', number: '09', title: 'Lift Installation & Building Systems', short: 'Coordination support for lift, elevator and building-system delivery.', description: 'Building-system coordination and lift or elevator project delivery support across requirement assessment, sourcing, interfaces, installation coordination, testing and handover.', overview: 'Lift delivery depends on coordination between the selected system, structure, power, access, finishes, safety requirements and the specialist installation team. Lumora’s role is to help organise those interfaces around the project.', whatItIs: 'The service supports requirement assessment, system and solution coordination, sourcing coordination, building-interface coordination, installation coordination, testing and commissioning support and handover. It does not imply manufacture or specialist engineering beyond the agreed scope.', whyItMatters: 'Building systems are affected by decisions made across several trades. Early interface coordination can help surface space, access, power, finishes and sequencing requirements before they become site constraints.', image: '/images/proj-institutional.png', applications: ['Residential developments', 'Commercial buildings', 'Institutional projects', 'Building system upgrades'], benefits: ['Clearer project interfaces', 'Supplier and specialist coordination', 'Installation sequencing support', 'Structured handover'], environments: ['Residential', 'Commercial', 'Institutional'], materialsOrSystems: ['Lift and elevator systems', 'Building interfaces', 'Power and access coordination', 'Finishes around system installations'], qualityConsiderations: ['Requirement clarity', 'Interface dimensions', 'Supplier coordination', 'Installation sequence', 'Testing and commissioning records', 'Handover information'], process: [{ step: 1, title: 'Assess the Requirement', description: 'Clarify building use, access needs, project stage and the required system scope.' }, { step: 2, title: 'Coordinate the Solution', description: 'Align the proposed system with the project brief and relevant building interfaces.' }, { step: 3, title: 'Coordinate Sourcing', description: 'Engage appropriate suppliers or specialist partners for the agreed requirement.' }, { step: 4, title: 'Review Interfaces', description: 'Coordinate structure, access, power, finishes, openings and installation sequencing.' }, { step: 5, title: 'Coordinate Installation', description: 'Support communication between the supplier, site team and relevant trades.' }, { step: 6, title: 'Test & Commission', description: 'Coordinate the information and access needed for specialist testing and commissioning.' }, { step: 7, title: 'Handover', description: 'Review outstanding items and pass on available system and maintenance information.' }], maintenanceConsiderations: ['Follow the specialist supplier’s operating and maintenance requirements.', 'Keep handover and inspection information accessible.', 'Coordinate building works around the system so interfaces are not compromised.'], faqs: sharedFaqs('lift and building-system coordination'), relatedServices: ['procurement-supply-solutions', 'construction-solutions', 'property-development'],
  },
  {
    slug: 'property-development', number: '10', title: 'Property Development', short: 'Development-stage property solutions focused on planning, quality and lasting value.', description: 'Property development support covering development planning, project coordination, construction delivery, finishing, procurement and property quality considerations.', overview: 'Property development brings together land, design, approvals, construction, procurement, finishing, coordination and long-term property considerations. The right scope depends on the opportunity and its stage of development.', whatItIs: 'Lumora approaches development opportunities through practical planning and coordination, with attention to function, buildability, material selection, finishing quality and the requirements of the eventual property user or owner.', whyItMatters: 'Early decisions influence cost, programme, quality and the long-term usability of a property. Coordinating development and construction considerations helps keep the outcome aligned with the intended use.', image: '/images/properties.png', applications: ['Residential developments', 'Commercial developments', 'Development-stage property opportunities', 'Property improvement programmes'], benefits: ['Considered development planning', 'Construction coordination', 'Finishing and procurement support', 'Quality-led property thinking'], environments: ['Residential', 'Commercial'], materialsOrSystems: ['Building materials', 'Finishing systems', 'Waterproofing and protective systems', 'Building services and specialist products'], qualityConsiderations: ['Development brief', 'Buildability', 'Procurement coordination', 'Finishing quality', 'Property usability', 'Handover requirements'], process: [{ step: 1, title: 'Understand the Opportunity', description: 'Review the property objective, intended use, constraints and stage of development.' }, { step: 2, title: 'Plan the Development', description: 'Identify the workstreams, information and decisions needed to move forward.' }, { step: 3, title: 'Coordinate the Project', description: 'Align design, procurement, construction and specialist requirements.' }, { step: 4, title: 'Deliver the Works', description: 'Coordinate construction, finishing and project activities around the agreed scope.' }, { step: 5, title: 'Review Quality', description: 'Inspect key elements, resolve outstanding items and consider property usability.' }, { step: 6, title: 'Handover', description: 'Complete the agreed handover process and communicate relevant follow-up needs.' }], maintenanceConsiderations: ['Plan for routine care of finishes, waterproofing and building systems.', 'Retain product and handover information for future property management.', 'Address defects and changes through an organised review process.'], faqs: sharedFaqs('property development'), relatedServices: ['construction-solutions', 'procurement-supply-solutions', 'surface-preparation-finishing'],
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
