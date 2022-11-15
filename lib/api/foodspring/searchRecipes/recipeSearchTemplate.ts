// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const recipeSearchTemplate = (q: string, lang: string, store_id: number) => ({
  query: {
    filtered: {
      query: {
        bool: {
          must: [
            {
              bool: {
                must: [
                  {
                    bool: {
                      should: [
                        {
                          multi_match: {
                            query: q,
                            type: 'best_fields',
                            minimum_should_match: '100%',
                            analyzer: `analyzer_${lang}`,
                            fields: [
                              `search_${lang}.whitespace`,
                              `title_${lang}.whitespace^10`,
                              `description_${lang}.whitespace^9`,
                              `ingredients_${lang}.whitespace^6`,
                              `search_${lang}.shingle`,
                            ],
                            fuzziness: 1,
                            prefix_length: '1',
                            max_expansions: '10',
                            cutoff_frequency: 0.15,
                          },
                        },
                        {
                          multi_match: {
                            query: q,
                            type: 'best_fields',
                            minimum_should_match: '100%',
                            analyzer: `phonetic_${lang}`,
                            fields: [
                              `search_${lang}.phonetic`,
                              `title_${lang}.phonetic^10`,
                              `description_${lang}.phonetic^9`,
                              `ingredients_${lang}.phonetic^6`,
                            ],
                            fuzziness: 1,
                            prefix_length: '1',
                            max_expansions: '2',
                            cutoff_frequency: 0.15,
                          },
                        },
                      ],
                    },
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
                store_id: [store_id],
              },
            },
          ],
          _cache: true,
        },
      },
    },
  },
  aggs: {
    attribute_set_id: {
      terms: {
        size: 9,
        field: 'attribute_set_id',
      },
    },
  },
  from: 0,
  size: 5,
});

export default recipeSearchTemplate;
