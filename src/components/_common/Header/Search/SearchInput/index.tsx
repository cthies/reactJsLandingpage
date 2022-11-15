/* eslint-disable jsx-a11y/no-autofocus */
import React, { FC, ChangeEvent, useCallback, useState, KeyboardEventHandler } from 'react';
import Grid from 'src/components/_shared/Grid';
import Typography from 'src/components/_shared/Typography';
import Icon from 'src/components/_shared/Icon';
import debounce from 'lodash.debounce';
import { trackEvent } from 'src/tracking';
import { useMicrocopyTranslations } from 'src/hooks/useTranslations';
import { selectLanguage } from 'src/store/slices/ui';
import { useSelector } from 'react-redux';
import { validateSearch } from 'src/utils/validate';
import classes from './index.module.css';

interface SearchInputProps {
  searchDelayMilliseconds: number;
  searchTermTrackingDelayMilliseconds: number;
  onSearchRequest: (value: string) => void;
  onTrackRequest: (value: string) => void;
}

const SearchInput: FC<SearchInputProps> = ({
  searchDelayMilliseconds,
  searchTermTrackingDelayMilliseconds,
  onSearchRequest,
  onTrackRequest,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [showError, setShowError] = useState(false);

  const t = useMicrocopyTranslations();

  const lang = useSelector(selectLanguage);
  const urlLang = lang ? `/${lang}` : '';

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const scheduleSearchRequest = useCallback(
    debounce((input) => onSearchRequest(input), searchDelayMilliseconds),
    [onSearchRequest, searchDelayMilliseconds]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const scheduleTrackEvent = useCallback(
    debounce((input) => onTrackRequest(input), searchTermTrackingDelayMilliseconds - searchDelayMilliseconds),
    [onTrackRequest, searchTermTrackingDelayMilliseconds, searchDelayMilliseconds]
  );

  const onInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value;
      setInputValue(input);

      if (validateSearch(input)) {
        scheduleTrackEvent(input);
        scheduleSearchRequest(input);
        setShowError(false);
      } else {
        scheduleSearchRequest.cancel();
        scheduleTrackEvent.cancel();
        setShowError(true);
      }
      setShowError(validateSearch(input) === false);
    },
    [scheduleSearchRequest, scheduleTrackEvent]
  );

  const onFocus = useCallback(() => {
    trackEvent({
      category: 'search',
      action: 'focus',
      label: '',
    });
  }, []);

  const onKeyDownCapture: KeyboardEventHandler = useCallback((e) => {
    e.stopPropagation();
  }, []);

  return (
    <div>
      <div className={`${classes.searchBlockContainer} ${showError ? classes.error : ''}`}>
        <form
          onKeyDownCapture={onKeyDownCapture}
          className={classes.searchForm}
          autoComplete="off"
          method="get"
          action={`${urlLang}/catalogsearch/result`}
        >
          <Grid container direction="row" justifyContent="flex-start" alignItems="stretch">
            <Grid item xs={1} className={classes.searchButtonWrapper}>
              <Icon name="search" />
            </Grid>
            <Grid item xs={11} className={classes.searchInputWrapper}>
              <input
                type="text"
                name="q"
                value={inputValue}
                onChange={onInputChange}
                onFocus={onFocus}
                placeholder={t('placeholder_search')}
                className={classes.searchInput}
                autoFocus
                required
              />
            </Grid>
          </Grid>
        </form>
      </div>
      {showError && (
        <Typography className={classes.textError} tag="body-xs">
          {t('search_error')}
        </Typography>
      )}
    </div>
  );
};

export default SearchInput;
