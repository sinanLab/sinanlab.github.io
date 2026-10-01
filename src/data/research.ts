// Set this to false once the descriptions have been replaced with verified content.
export const researchIsPlaceholder = true;

export const researchThemes = [
  {
    title: 'Cellular signaling over time',
    description: 'NF-κB dynamics provide the context for an interest in time-dependent cellular responses. This theme is reserved for the specific biological questions, experimental systems, and signaling analyses in your research.',
    project: 'nf-kb-dynamics',
    visual: 'dynamics' as const,
    caption: 'Conceptual signaling traces. Illustrative only; no experimental data.',
  },
  {
    title: 'From microscopy to measurements',
    description: 'Microscopy image analysis and deep learning segmentation form a second research theme. This section will describe your imaging workflows, segmentation methods, and the measurements they support.',
    project: 'microscopy-segmentation',
    visual: 'segmentation' as const,
    caption: 'Conceptual cell boundaries and nuclei. This is a schematic, not a microscopy image.',
  },
  {
    title: 'The individual cell in context',
    description: 'Single-cell time-series analysis brings the focus to individual trajectories and variation across cells. Add the questions, analysis approaches, and datasets that define your work here.',
    project: 'single-cell-analysis',
    visual: 'timeseries' as const,
    caption: 'Conceptual single-cell heatmap. Illustrative only; no experimental data.',
  },
];
