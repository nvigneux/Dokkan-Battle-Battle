import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// eslint-disable-next-line import/prefer-default-export
export const getCommonProps = async (ctx) => {
  const { locale } = ctx;

  const translations = await serverSideTranslations(
    locale,
    ['common'],
  );

  return {
    locale,
    ...translations,
  };
};
