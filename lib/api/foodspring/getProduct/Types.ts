export type Product = {
  /**
   * Product ID
   */
  id: string;

  /**
   * Product display name
   */
  name: string;

  /**
   * Product taste display name
   */
  taste?: string;

  /**
   * Short product description in HTML
   */
  short_description: string;

  /**
   * Product SKU
   */
  sku: string;

  /**
   * Parent Product SKU
   */
  parent_sku?: string;

  /**
   * Product price float value as string
   */
  price: string;

  /**
   * Product special price float value as string
   */
  special_price?: string;

  /**
   * Price per unit e.g. "£39.99/1kg"
   */
  unit_price: string;

  /**
   * @deprecated unused
   */
  special_from_date?: string;

  /**
   * Product weight
   */
  weight: string;

  /**
   * Product package option
   */
  package_option?: string;

  /**
   * Product rating float value as string
   */
  rating: string;

  /**
   * Product barcode value
   */
  ean: string;

  tax_class_id: string;

  /**
   * URL path for this product.
   */
  url_path: string;

  /**

   * URL key for this product.
   * NOTE: used only in magento.
   * @deprecated
   */
  url_key: string;

  status: 'Enabled' | 'Disabled';

  /**
   * Used mainly for configurable products or bundles: whey protein configurable
   * product is visible in the shop, simple taste products only with direct url).
   * 1 - single not visible
   * 2 - catalog
   * 3 - search
   * 4 - catalog & search
   * 5 - only with direct url
   */
  visibility?: '1' | '2' | '3' | '4' | '5' | null;

  /**
   * Indicates that we should show smaller product image.
   * Because it takes too mutch space in almost square aspect ratio.
   */
  product_image_is_small: '0' | '1';

  /**
   * This indicates to use all content data from the preselected child of a configurable product.
   */
  use_content_from_child: '0' | '1';

  /**
   * Indicates if product has a slider in the top part of the product page.
   */
  show_media_gallery: '0' | '1';

  /**
   * Indicates product is excluded for vouchers.
   */
  stop_discounting: '0' | '1';

  /**
   * Indicates out of stock:
   * 0 = no
   * 1 = Temporarily - Only simple products, bundles still available
   * 2 = Permanently - Simple products and bundles
   * 3 = Temporarily - Simple products and bundles
   */
  is_disable_for_sale: '0' | '1' | '2' | '3';

  /**
   * Long product desription in HTML format
   */
  description: string;

  /**
   * Product whole package weight/quantity with unit.
   * I.e. 50g protein bar pack of 12 will have "600g"
   */
  egg_weight_w_unit: string;

  /**
   * Product package item weight/quantity. Float value as string.
   * I.e. "100.00"
   */
  egg_ppq_quantity: string;

  /**
   * Product package item weight/quantity with unit.
   * I.e. "100g"
   */
  egg_ppq_quantity_w_unit: string;

  /**
   * Product highlights in HTML format
   */
  egg_product_highlights: string;

  /**
   * Product ingredients in HTML format
   */
  egg_product_ingredients: string;

  /**
   * Product recomended dosage
   */
  egg_product_recommended_dosage: string;

  /**
   * Product backgrounds in HTML format
   */
  egg_product_backgrounds: string;

  gm_subtitle?: string;
  gm_badge?: string;
  gm_copyright_notice?: string;
  gm_tweaks_seo_tag_canonical: string;

  /**
   * @deprecated
   */
  msrp_enabled: string;

  /**
   * @deprecated
   */
  msrp_display_actual_price_type: string;

  /**
   * Sales info. Prodocut related cost.
   * Float value as string;
   */
  ek_product: string;

  /**
   * Sales info. Prodocut packaging related cost.
   * Float value as string;
   */
  ek_packaging: string;

  /**
   * Sales info. Prodocut transport related cost.
   * Float value as string;
   */
  ek_transport: string;

  /**
   * @deprecated product subscriptions not available anymore
   */
  is_recurring?: string;

  /**
   * Indicates this is a gift cart type product (virtial product).
   */
  is_gift_card: '0' | '1';

  //#region Images
  thumbnail: string;
  small_image: string;
  image: string;
  image_retina: string;
  //#endregion

  //#region Bodycheck configuration to show products on the bodycheck result page based on the customer data.
  bodycheck_category?: string;
  bodycheck_diseases?: string;
  bodycheck_muscle_bmi?: string;
  bodycheck_muscle_priority?: string;
  bodycheck_muscle_workouts?: string;
  //#endregion

  //#region Tracking fields

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
   * simple product sku
   */
  dimension14?: string;

  /**
   * Subscription for regular delivery
   */
  dimension15?: 'yes' | 'no';

  //#endregion

  /**
   * Shipping methods
   */
  shipping: {
    [key: string]: {
      /**
       * Shipping method title
       */
      title: string;
      /**
       * Shipping method price float value as string
       */
      price: string;
      /**
       * Shipping method free delivery threshold float value as string
       */
      free_threshold: string;
    };
  };
};
