// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const productSearchTemplate = (
  q: string,
  lang: string,
  store_id: number,
  customer_group_id: number,
  website_id: number
) => {
  return {
    query: {
      filtered: {
        query: {
          bool: {
            must: [
              {
                function_score: {
                  query: {
                    bool: {
                      must: [
                        {
                          filtered: {
                            query: {
                              multi_match: {
                                query: q,
                                type: 'best_fields',
                                tie_breaker: 1,
                                fields: [
                                  `search_${lang}`,
                                  `name_${lang}^10`,
                                  `description_${lang}^9`,
                                  `meta_description_${lang}^6`,
                                  `category_name_${lang}^8`,
                                ],
                                cutoff_frequency: 0.15,
                              },
                            },
                            filter: {
                              query: {
                                common: {
                                  [`search_${lang}`]: {
                                    query: q,
                                    cutoff_frequency: 0.15,
                                    minimum_should_match: {
                                      low_freq: '2<75% 6<50%',
                                    },
                                  },
                                },
                              },
                            },
                          },
                        },
                      ],
                    },
                  },
                  functions: [
                    {
                      filter: {
                        query: {
                          common: {
                            [`search_${lang}.whitespace`]: {
                              query: q,
                              cutoff_frequency: 0.15,
                            },
                          },
                        },
                      },
                      boost_factor: 10,
                    },
                  ],
                },
              },
            ],
          },
        },
        filter: {
          bool: {
            must: [
              {
                terms: {
                  visibility: [3, 4],
                },
              },
              {
                terms: {
                  status: [1],
                },
              },
              {
                fquery: {
                  query: {
                    query_string: {
                      query: '(categories:2 OR show_in_categories:2)',
                    },
                  },
                  _cache: true,
                },
              },
              {
                terms: {
                  store_id: [store_id],
                },
              },
            ],
            _cache: true,
          },
        },
      },
    },
    fields: [
      `name_${lang}`,
      `thumbnail_${lang}`,
      `url_${lang}`,
      'price',
      `price_${customer_group_id}_${website_id}`,
      `has_discount_${customer_group_id}_${website_id}`,
    ],
    track_scores: true,
    sort: [
      {
        _score: {
          order: 'desc',
          missing: 9223372036854775806,
          ignore_unmapped: true,
        },
      },
    ],
    from: 0,
    size: 6,
  };
};

export default productSearchTemplate;
