import { useSelector } from 'react-redux';
import { selectDefaultLanguage } from 'src/store/slices/config';
import { selectCountry, selectLanguage } from 'src/store/slices/ui';
import isUrlRelative from 'src/utils/isUrlRelative';

/**
 * Applies language code prefix to href value.
 */
const useHrefWithLang = (): ((url: string | undefined) => string) => {
  const region = useSelector(selectCountry);
  const lang = useSelector(selectLanguage);
  const defaultLanguage = useSelector(selectDefaultLanguage);

  function hrefWithLang(url: string | undefined): string {
    const isRelative = isUrlRelative(url);

    if (isRelative && lang !== defaultLanguage) {
      return url?.startsWith('/') ? `/${lang}${url}` : `/${lang}/${url}`;
    }

    //This is a workaround for DK & FI because we need to add language extension even if it's default language
    if (isRelative && (region === 'dk' || region === 'fi')) {
      return url?.startsWith('/') ? `/en${url}` : `/en/${url}`;
    }

    return url?.startsWith('/') ? url : `/${url}`;
  }

  return hrefWithLang;
};

export default useHrefWithLang;
