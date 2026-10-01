export interface CVEntry {
  title: string;
  organization?: string;
  period?: string;
  description?: string;
}

// Add only verified information. Empty sections display an honest placeholder.
export const cvSections: { title: string; entries: CVEntry[] }[] = [
  { title: 'Education', entries: [{
    title: 'PhD in Biomedical Engineering',
    organization: 'Institute of Fundamental and Technological Research IPPT, Polish Academy of Sciences PAS, Poland',
    period: '2025 - December, 2028',
    description: 'Computational analysis of multi-scale innate immune defences against bacterial pathogens'
  },
  {
    title: 'Master of Science in Mathematics',
    organization: 'University of Electronic Science and Technology of China - UESTC, China',
    period: '2021 - July, 2024',
    description: 'Mathematical Biology'
  },
  {
    title: 'BS in Mathematics',
    organization: 'University of Swat, Pakistan',
    period: '2016 - November, 2020',
    description: 'Mathematical Biology'
  }] },
  { title: 'Research experience', entries: [{
    title: 'First Stage Researcher (R1)',
    organization: 'Institute of Fundamental and Technological Research IPPT, Polish Academy of Sciences PAS, Poland',
    period: '2025 - December, 2028',
    description: 'Mathematical Biology'
  }] },
  { title: 'Presentations', entries: [{
    title: 'Fever modulates antibacterial innate immune response',
    organization: 'Nicolaus Copernicus University',
    period: '26-26, June 2028',
    description: 'Toruń, Poland'
  }] },
//  { title: 'Teaching', entries: [] },
  { title: 'Skills', entries: [{
        title: 'Programming & Analysis',
        description: 'Python (Pandas, NumPy, Object-Oriented Programming), MATLAB, Octave, Image Processing, Data Processing, Deep Learning'
      },
      {
        title: 'Analytical Methods',
        description: 'Statistical Modeling, Predictive Analytics, Hypothesis Testing & Statistical Comparison'
      },
      {
        title: 'Languages',
        description: 'Urdu (Native), English (Professional Working)'
      }] },
  { title: 'Awards', entries: [{
    title: 'Fully Funded University Scholarship',
    organization: 'School of Mathematical Sciences, University of Electronic Science and Technology of China UESTC',
    period: '2024'
  },{
    title: 'First prize in Academic Achievement Award',
    organization: 'School of Mathematical Sciences, University of Electronic Science and Technology of China UESTC',
    period: '2022'
  },{
    title: 'Second rank in Outstanding Graduate Student Award',
    organization: 'International Student Office, University of Electronic Science and Technology of China UESTC',
    period: '2022'
  }] },
];
