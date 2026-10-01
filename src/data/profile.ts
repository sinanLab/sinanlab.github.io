// Start here. Empty links stay hidden; no fictitious profiles are published.
export const profile = {
  name: 'Sinan. M',
  nameIsPlaceholder: false,
  role: 'PhD student',
  field: 'Systems biology',
  institution: 'Institute of Fundamental Technological Research IPPT, POLISH ACADEMY OF SCIENCES PAS',
  department: 'Laboratory of Modeling in Biology and Medicine (PMBM), Department of Biosystems and Soft Matter (ZBiMM)',
  location: 'Poland',
  email: 'msinan@ippt.pan.pl',
  photo: '/images/profile.webp', // e.g. /images/profile.webp (place the file in public/images/)
  photoAlt: 'Muhammad Sinan',
  cvPdf: '/files/msinan_cv_systems_biology_IPPT_PAS_Poland.pdf', // e.g. /files/cv.pdf
  headline: 'Single cell biology',
  biography: [
    'My research interests sit at the intersection of systems biology and computational image analysis. I am interested in how individual cells respond over time, and how we can study those responses through microscopy and quantitative methods.',
    'My focus includes NF-κB dynamics, deep learning for image segmentation, and the analysis of single-cell time series.',
  ],
  biographyIsPlaceholder: false,
  interests: ['NF-κB dynamics', 'Microscopy', 'Deep learning', 'Single-cell analysis'],
  profiles: [
    { label: 'GitHub', url: 'https://github.com/sinanLab' },
    { label: 'Google Scholar', url: 'https://scholar.google.com/citations?user=qoeSgwkAAAAJ&hl=en' },
    { label: 'ORCID', url: 'https://orcid.org/0000-0003-2177-3806' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/muhammadsinan' },
  ],
  description: 'An academic profile exploring systems biology, NF-κB dynamics, microscopy image analysis, and single-cell time series.',
};
