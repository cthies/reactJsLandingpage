import { useSelector } from 'react-redux';
import { selectInitialUrl } from 'src/store/slices/ui';

type PageType = 'cart' | 'checkout' | 'dm-landing-page' | 'search' | 'body-check' | 'default';

function usePageType(): PageType {
  const initialUrl = useSelector(selectInitialUrl);
  switch (true) {
    case initialUrl.indexOf('/checkout/onepage/success') > -1:
      return 'default';
    case initialUrl.indexOf('/checkout/cart') > -1:
      return 'cart';
    case initialUrl.indexOf('/checkout') > -1:
    case initialUrl.indexOf('onestepcheckout') > -1:
      return 'checkout';
    case initialUrl.indexOf('/happynewyou') > -1:
      return 'dm-landing-page';
    case initialUrl.indexOf('/catalogsearch') > -1:
      return 'search';
    case initialUrl.indexOf('/body-check') > -1:
      return 'body-check';
    default:
      return 'default';
  }
}

function useIsCart(): boolean {
  return usePageType() === 'cart';
}

function useIsCheckout(): boolean {
  return usePageType() === 'checkout';
}

function useIsSearchPage(): boolean {
  return usePageType() === 'search';
}

function useIsCartAndCheckout(): boolean {
  const isCart = useIsCart();
  const isCheckout = useIsCheckout();
  return isCart || isCheckout;
}

function useIsDMLandingPage(): boolean {
  return usePageType() === 'dm-landing-page';
}

function useIsBodyCheckPage(): boolean {
  return usePageType() === 'body-check';
}

export { useIsCartAndCheckout, useIsCheckout, useIsCart, useIsDMLandingPage, useIsSearchPage, useIsBodyCheckPage };

export default usePageType;
