import en from '../../../content/portfolio.en.json';
import sv from '../../../content/portfolio.sv.json';

export type PortfolioLanguage = 'en' | 'sv';

export const portfolioContent = {
  en,
  sv,
} as const;

export type PortfolioContent = (typeof portfolioContent)['en'];
export type ProjectCard = PortfolioContent['planets']['projects']['cards'][number];

export function getPortfolioContent(language: PortfolioLanguage): PortfolioContent {
  return portfolioContent[language];
}
