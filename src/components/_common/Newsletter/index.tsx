import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'src/components/_shared/Button';
import FullWidthBgContainer from 'src/components/_shared/FullWidthBgContainer';
import Icon from 'src/components/_shared/Icon';
import Typography from 'src/components/_shared/Typography';
import { selectUserEmail } from 'src/store/slices/ui';
import { trackEvent } from 'src/tracking';
import cn from 'src/utils/cn';
import { validateEmail } from 'src/utils/validate';
import BlockContainer from '../BlockContainer';
import styles from './index.module.css';
import useSubscribeNewsletter from './useSubscribeNewsletter';
import { showOverlay } from 'src/store/slices/overlay';
import { NewsletterResponse } from 'lib/api/content/getNewsletter/Types';
import { useMicrocopyTranslations } from 'src/hooks/useTranslations';

interface Props {
  data?: NewsletterResponse;
  variant: 'footer' | 'home';
}

const Newsletter: React.FC<Props> = ({ data, variant }) => {
  const [emailValue, setEmailValue] = useState('');
  const [error, setError] = useState<string>('');
  const t = useMicrocopyTranslations();
  const dispatch = useDispatch();
  const { subscribe, isLoading } = useSubscribeNewsletter();
  const userEmail = useSelector(selectUserEmail);

  useEffect(() => {
    setEmailValue(userEmail ?? '');
  }, [userEmail]);

  const validate = useCallback(
    (input: string) => {
      if (!input) {
        setError(t('error_field_required'));
        return false;
      }

      if (!validateEmail(input)) {
        setError(t('error_email_format'));
        return false;
      }

      setError('');
      return true;
    },
    [t]
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoading && validate(emailValue)) {
      const response = await subscribe(emailValue);
      /**
       * Response is always with status 200 & success:true
       * But we can check html content for 'error-msg' className for error indication.
       */
      const isError = !response || response?.indexOf('error-msg') !== -1;

      const getAction = () => {
        return variant === 'home' ? 'newsletter Home' : 'footer';
      };

      trackEvent({
        action: getAction(),
        category: 'newsletter sign up',
        label: isError ? 'fail' : 'success',
      });

      if (response) {
        dispatch(
          showOverlay({
            type: 'modal',
            variant: isError ? 'error' : 'success',
            html: {
              content: response,
              className: styles.modalContent,
            },
            expirationDuration: 0,
          })
        );
      }
    }
  };

  const onInputChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
  }, []);

  if (!data) {
    console.error('Newsletter data is empty');
    return null;
  }

  return (
    <FullWidthBgContainer id="newsletter" className={cn(styles.root, variant ? styles[variant] : '')}>
      <BlockContainer className={styles.container}>
        <Typography className={styles.title} tag="h3">
          {data.title}
        </Typography>
        <Typography className={styles.subtitle} tag="body-l">
          {data.subtitle}
        </Typography>
        <div className={styles.formWrapper}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputContainer}>
              <div className={styles.inputWrapper}>
                <Icon name="mail" />
                <input
                  type="text"
                  name="email"
                  value={emailValue}
                  onChange={onInputChangeHandler}
                  placeholder={data.email_placeholder}
                  className={styles.input}
                />
              </div>
              {error && (
                <div className={styles.errorWrapper}>
                  <Typography className={styles.error} tag="body-xs">
                    {error}
                  </Typography>
                </div>
              )}
            </div>
            <div className={styles.buttonWrapper}>
              <Button type="submit" disabled={isLoading} className={styles.button}>
                {data.cta_title}
              </Button>
            </div>
          </form>
        </div>
        <Typography className={styles.subtitle}>{data.footer}</Typography>
      </BlockContainer>
    </FullWidthBgContainer>
  );
};

export default Newsletter;
