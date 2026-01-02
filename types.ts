export type SlideType = 'intro' | 'agenda' | 'concept' | 'resource' | 'outro';

export interface SlideItem {
  id: string;
  title?: string;
  content?: string;
  icon?: string; // Icon name from Lucide
}

export interface Slide {
  id: string;
  type: SlideType;
  title: string;
  subtitle?: string;
  content?: string; // Main text content or quote
  items?: SlideItem[]; // List items, agenda points, etc.
  author?: string; // For intro
  image?: string; // Optional image URL
  footer?: string;
}

export interface GlobalSettings {
  pdfEnabled: boolean;
  requireAuthForPdf: boolean;
  downloadLimitPerDay: number;
}

export interface UserDownloadRecord {
  uid: string;
  timestamp: number;
  count: number;
}