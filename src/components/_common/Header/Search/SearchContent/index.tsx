import React, { FC, useState, useCallback, memo, useRef } from 'react';
import { useSelector } from 'react-redux';
import Grid from 'src/components/_shared/Grid';
import { selectLanguage } from 'src/store/slices/ui';
import ProductsResultBlock from './ProductsResultBlock';
import NoResults from './NoResults';
import SearchSuggestions from './SearchSuggestions';
import { useSearchSuggestionData } from 'lib/api/content/getSearchSuggestions/useSearchSuggestionData';
import SearchInput from '../SearchInput';
import IconButton from 'src/components/_shared/Button/IconButton';
import { trackEvent } from 'src/tracking';
import { useSearch } from './useSearch';
import classes from './index.module.css';

/**
 * Duration of idle user input before sending search request.
 */
const SEARCH_DELAY_MILLISECONDS = 500;

/**
 * Duration of idle user input before tracking search term.
 */
const SEARCH_TERM_TRACK_DELAY_MILLISECONDS = 4000;

export interface SearchContentProps {
  onClose: React.MouseEventHandler;
}

const SearchContent: FC<SearchContentProps> = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const lastTrackedSearchQueryRef = useRef<string>('');

  const suggestions = useSearchSuggestionData();
  const lang = useSelector(selectLanguage);

  const searchResult = useSearch(searchQuery);

  const trackSearchTerm = useCallback((q: string, source: 'timeout' | 'product click') => {
    if (lastTrackedSearchQueryRef.current === q) {
      //Skip duplicate trackings for same search term
      return;
    }

    lastTrackedSearchQueryRef.current = q;
    trackEvent({
      category: 'search',
      action: source,
      label: q,
    });
  }, []);

  const renderEmptyResults = useCallback(() => {
    return (
      <>
        {searchQuery.length > 0 && searchResult.total === 0 ? <NoResults value={searchQuery} /> : null}
        <SearchSuggestions data={suggestions} />
      </>
    );
  }, [searchQuery, searchResult.total, suggestions]);

  const renderSearchResults = useCallback(() => {
    return (
      <>
        <ProductsResultBlock
          data={searchResult}
          target={`/${lang}/catalogsearch/result?q=${searchQuery}`}
          onProductClick={() => {
            trackSearchTerm(searchQuery, 'product click');
          }}
        />
        <SearchSuggestions data={suggestions} excludeSlices={['searchsuggestionproducts']} />
      </>
    );
  }, [lang, searchQuery, searchResult, suggestions, trackSearchTerm]);

  return (
    <div className={classes.contentWrapper}>
      <Grid container direction="row" justifyContent="flex-start" alignItems="stretch" wrap="nowrap">
        <Grid item xs={10} sm={11}>
          <SearchInput
            onSearchRequest={setSearchQuery}
            onTrackRequest={(q) => trackSearchTerm(q, 'timeout')}
            searchDelayMilliseconds={SEARCH_DELAY_MILLISECONDS}
            searchTermTrackingDelayMilliseconds={SEARCH_TERM_TRACK_DELAY_MILLISECONDS}
          />
        </Grid>
        <Grid item xs={2} sm={1} className={classes.closeBtnWrapper}>
          <IconButton onClick={onClose} iconProps={{ name: 'close' }} />
        </Grid>
      </Grid>

      {searchResult.total ? renderSearchResults() : renderEmptyResults()}
    </div>
  );
};

export default memo(SearchContent);
