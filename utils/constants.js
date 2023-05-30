export const PUBLIC_URL = process.env.NEXT_PUBLIC_URL;

export const LOCALE_FR = 'fr';
export const LOCALE_EN = 'en';

export const DOMAINS_LOCALE = {
  [LOCALE_FR]: `${PUBLIC_URL}/${LOCALE_FR}`,
  [LOCALE_EN]: PUBLIC_URL,
};

export const DOMAIN = process.env.NEXT_PUBLIC_URL;
export const DRAWS_STATE = {
  OPEN: 'OPEN',
  DRAFT: 'DRAFT',
  CLOSE: 'CLOSE',
};

export const MAX_DRAWS_PER_PLAYER = 6;

export const RUSH_MIN_LINE = 1;
export const RUSH_MIN_COLUMN = 1;
export const RUSH_MAX_COLUMN = 5;
