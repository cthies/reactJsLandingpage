import { debounce } from 'lodash';

/**
 * Delay for impressions cache to be sent to GTM.
 */
const MULTIPLE_IMPRESSIONS_COMMIT_DELAY = 500;

/**
 * Promotion impressions cache for multiple impressions in a single event.
 */
const promotionImpressions: PromotionOptions[] = [];

/**
 * Product impressions cache for multiple impressions in a single event.
 */
const productImpressions: ProductTrackingOptions[] = [];

type EventOptions = {
  category: string;
  action: string;
  label?: string;
  value?: string;
};

export function trackEvent(options: EventOptions): void {
  if (!options.action) {
    console.warn('Tracking event action is empty');
  }

  if (!options.category) {
    console.warn('Tracking event category is empty');
  }

  commitEvent({
    eventCategory: options.category,
    eventAction: options.action,
    eventLabel: options.label ?? '',
    eventValue: options.value ?? '',
    eventNonInteraction: false,
    event: 'gtmEvent',
  });
}

type PromotionOptions = {
  id: string;
  name: string;
  creative: string;
  position: string;
  actionField?: {
    list: string;
    action: string;
  };
};

export function trackPromotionClick(options: PromotionOptions): void {
  commitEvent({
    event: 'eePromotionClick',
    eventValue: '',
    eventNonInteraction: false,
    ecommerce: {
      promoClick: {
        promotions: [options],
      },
    },
  });
}

export function trackPromotionImpression(options: PromotionOptions, immediate = false): void {
  if (immediate) {
    commitEvent({
      event: 'eePromotionImpression',
      eventValue: '',
      eventNonInteraction: true,
      ecommerce: {
        promoView: {
          promotions: [options],
        },
      },
    });
  } else {
    promotionImpressions.push(options);
    commitPromotionImpressions();
  }
}

/**
 * Commits multiple promotion impressions collected in promotionImpressions array with a delay.
 */
const commitPromotionImpressions = debounce(() => {
  if (promotionImpressions.length > 0) {
    commitEvent({
      event: 'eePromotionImpression',
      eventValue: '',
      eventNonInteraction: true,
      ecommerce: {
        promoView: {
          promotions: [...promotionImpressions],
        },
      },
    });

    promotionImpressions.length = 0;
  }
}, MULTIPLE_IMPRESSIONS_COMMIT_DELAY);

export type ProductTrackingOptions = {
  /**
   * Currency code taken from env config
   */
  currency: string;

  /**
   * Product name
   */
  name: string;

  /**
   * Product slug
   */
  id: string;

  /**
   * Current product price. If there is a discount this is a price with discount
   */
  price: string | number;

  /**
   * This is product original price before discount. If there is no discount this should be empty.
   */
  metric1?: string | number;

  /**
   * Product taste
   */
  variant?: string;

  /**
   * Quantity used only for add-to-cart tracking.
   */
  quantity?: string | number;

  /**
   * Name of the list to indicate products location in the page.
   */
  list?: string;

  /**
   * Item position in the list it is displayed on,
   */
  position?: string | number;

  /**
   * Discount percentage cluster i.e. "15-20" meaning from 15 to 20 percent.
   * If there is no discount this should be empty.
   */
  dimension9?: string;

  /**
   * Indicates if product has a discount
   */
  dimension10?: 'yes' | 'no';

  /**
   * Availability
   */
  dimension11?: string;

  /**
   * Product pricing type
   */
  dimension12?: 'regular' | 'free';

  /**
   * Product type
   */
  dimension13?: 'simple' | 'configurable' | 'bundle';

  /**
   * Product simple sku
   */
  dimension14?: string;

  /**
   * Subscription for regular delivery
   */
  dimension15?: 'yes' | 'no';
};

export function trackProductImpression(options: ProductTrackingOptions, immediate = false): void {
  if (immediate) {
    commitEvent({
      event: 'eeProductImpression',
      eventValue: '',
      eventNonInteraction: true,
      ecommerce: {
        currencyCode: options.currency,
        impressions: [options],
      },
    });
  } else {
    productImpressions.push(options);
    commitProductImpressions();
  }
}

/**
 * Commits multiple product impressions collected in productImpressions array with a delay.
 */
const commitProductImpressions = debounce(() => {
  if (productImpressions.length > 0) {
    commitEvent({
      event: 'eeProductImpression',
      eventValue: '',
      eventNonInteraction: true,
      ecommerce: {
        currencyCode: productImpressions[0].currency,
        impressions: [...productImpressions],
      },
    });

    productImpressions.length = 0;
  }
}, MULTIPLE_IMPRESSIONS_COMMIT_DELAY);

export function trackProductClick(options: ProductTrackingOptions): void {
  commitEvent({
    event: 'eeProductClick',
    eventValue: '',
    eventNonInteraction: false,
    ecommerce: {
      currencyCode: options.currency,
      click: {
        actionField: {
          action: 'click',
          list: options.list,
        },
        products: [options],
      },
    },
  });
}

export function trackAddToBasket(options: ProductTrackingOptions): void {
  commitEvent({
    event: 'eeAddToBasket',
    eventValue: '',
    eventNonInteraction: false,
    ecommerce: {
      currencyCode: options.currency,
      add: {
        products: [options],
      },
    },
  });
}

const preConsentEvents: unknown[] = [];

function isConsentNeededForEvent(event: any) {
  return ['eeProductDetailImpression', 'eeProductImpression', 'eePromotionImpression'].includes(event.event);
}

function hasCookiebotConsent(key: string) {
  return window.Cookiebot && window.Cookiebot.consent && window.Cookiebot.consent[key];
}

function commitEvent(event: unknown) {
  if (!window.dataLayer) {
    window.dataLayer = [];
  }
  if (isConsentNeededForEvent(event) && !hasCookiebotConsent('statistics')) {
    preConsentEvents.push(event);
  } else {
    window.dataLayer.push(event);
  }
}

export function commitPreConsentEvents(): void {
  const eventsToCommit = [...preConsentEvents];
  preConsentEvents.length = 0;
  eventsToCommit.forEach(commitEvent);
}
