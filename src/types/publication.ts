export interface Author {
  name: string;
  isMainAuthor?: boolean;
  affiliation?: string;
  email?: string;
  orcid?: string;
  isHighlighted?: boolean;
  isCorresponding?: boolean;
  isCoAuthor?: boolean;
}

export type BibTeXInlineNode =
  | { type: 'text'; text: string }
  | {
    type: 'link';
    href: string;
    children: BibTeXInlineNode[];
  }
  | {
    type: 'color';
    color: string;
    children: BibTeXInlineNode[];
  }
  | {
    type: 'em' | 'strong' | 'smallCaps' | 'sup' | 'sub';
    children: BibTeXInlineNode[];
  };

export interface Publication {
  id: string;
  title: string;
  titleNodes?: BibTeXInlineNode[];
  authors: Author[];
  journal?: string;
  conference?: string;
  volume?: string;
  issue?: string;
  pages?: string;
  year: number;
  month?: string;
  publishedDate?: string;
  doi?: string;
  arxivId?: string;
  pmid?: string;
  url?: string;
  code?: string;
  pdfUrl?: string;
  projectUrl?: string;
  tags: string[];
  keywords?: string[];
  type: PublicationType;
  status: PublicationStatus;
  citations?: number;
  impactFactor?: number;
  quartile?: 'Q1' | 'Q2' | 'Q3' | 'Q4';
  bibtex?: string;
  venue?: string;
  venueItems?: PublicationVenueItem[];
  memo?: string;
  memoNodes?: BibTeXInlineNode[];
  statusLabel?: string;
  location?: string;
  awards?: string[];
  featured?: boolean;
  selected?: boolean;
  preview?: string;
  researchArea: ResearchArea;
}

export interface PublicationVenueItem {
  name: string;
  abbreviation?: string;
  note?: string;
  noteNodes?: BibTeXInlineNode[];
  year?: number;
}

export type PublicationType =
  | 'journal'
  | 'conference'
  | 'workshop'
  | 'book-chapter'
  | 'book'
  | 'thesis'
  | 'preprint'
  | 'patent'
  | 'technical-report';

export type PublicationStatus =
  | 'published'
  | 'accepted'
  | 'under-review'
  | 'submitted'
  | 'in-preparation'
  | 'draft';

export type ResearchArea =
  | 'ai-healthcare'
  | 'signal-processing'
  | 'reliability-engineering'
  | 'quantum-computing'
  | 'machine-learning'
  | 'fault-diagnosis'
  | 'neural-networks'
  | 'transformer-architectures'
  | 'biomedical-engineering'
  | 'other';
