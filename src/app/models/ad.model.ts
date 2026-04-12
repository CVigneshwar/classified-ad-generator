export type TemplateType = '5x1' | '10x1';

export interface AdData {
  template: TemplateType;
  header: string;
  subheader?: string;
  body?: string;
  bullets?: string[];
  features?: string;
  footerNote?: string;
  contactNumber: string;
  headerColor: string;
  headerTextColor: string;
  subHeaderColor: string;
  subHeaderTextColor: string;
  bodyColor: string;
  bodyTextColor: string;
  subFooterColor: string;
  subFooterTextColor: string;
  footerColor: string;
  footerTextColor: string;
  headerFontSize: number;
  subHeaderFontSize: number;
  bodyFontSize: number;
  subFooterFontSize: number;
  footerFontSize: number;
  widthCm: number;
  heightCm: number;
}

/**
 * Provides a sensical default starting point for the Classified Ad generator
 */
export const DEFAULT_AD_DATA: AdData = {
  template: '5x1',
  header: '',
  subheader: '',
  body: '',
  features: '',
  footerNote: '',
  contactNumber: '',
  headerColor: '#000000',
  headerTextColor: '#ffffff',
  subHeaderColor: '#b2b2b2',
  subHeaderTextColor: '#111111',
  bodyColor: '#ffffff',
  bodyTextColor: '#111111',
  subFooterColor: '#b2b2b2',
  subFooterTextColor: '#111111',
  footerColor: '#000000',
  footerTextColor: '#ffffff',
  headerFontSize: 14,
  subHeaderFontSize: 6,
  bodyFontSize: 8,
  subFooterFontSize: 5,
  footerFontSize: 13,
  widthCm: 4,
  heightCm: 5
};
