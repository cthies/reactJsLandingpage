import React from 'react';
import { useSelector } from 'react-redux';
import Grid, { GridProps } from 'src/components/_shared/Grid';

import FullWidthBgContainer from 'src/components/_shared/FullWidthBgContainer';
import chunkifyArray from 'src/utils/chunkifyArray';

import styles from './index.module.css';
import EventTrackingElement from 'src/components/_tracking/EventTrackingElement';
import { selectFooter } from 'src/store/slices/footer';
import { FooterDocument, FooterLinkItem } from 'lib/api/content/getFooter/Types';
import Typography from 'src/components/_shared/Typography';
import cn from 'src/utils/cn';
import FooterNewsletter from './FooterNewsletter';
import { useIsBodyCheckPage, useIsCartAndCheckout } from 'src/hooks/usePageType';
import ReferAFriend from 'src/components/_common/Footer/ReferAFriend';
import { selectIsNewsletterSubscribed, selectReferLink } from 'src/store/slices/ui';
import FixedImage from 'src/components/_shared/FixedImage';
import BlockContainer from 'src/components/_common/BlockContainer';
import isEmpty from 'lodash.isempty';

type Props = { children: React.ReactNode; label?: string };

function FooterBlock({ children, ...rest }: Props & GridProps): JSX.Element {
  return (
    <Grid item xs={12} {...rest}>
      <div className={styles.footerBlock}>{children}</div>
    </Grid>
  );
}

function FooterBlockTitle({ children }: Props): JSX.Element {
  return (
    <div className={styles.footerBlockTitle}>
      <Typography tag="h5" theme="dark">
        {children}
      </Typography>
    </div>
  );
}

function FooterTrackingElement({ children, label }: Props): JSX.Element {
  return (
    <EventTrackingElement dataCategory="footer" dataAction="foodspring" dataLabel={label ?? ''} inline={true}>
      {children}
    </EventTrackingElement>
  );
}

function Footer(): JSX.Element | null {
  const footers = useSelector(selectFooter);
  const referLink = useSelector(selectReferLink);
  const isNewsletterSubscribed = useSelector(selectIsNewsletterSubscribed);

  const isCartAndCheckout = useIsCartAndCheckout();
  const isBodyCheck = useIsBodyCheckPage();

  if (!footers) {
    console.warn('Footer data is undefined');
    return null;
  }

  function renderFooterLinkItem(link: FooterLinkItem, index: number): JSX.Element {
    return (
      <FooterTrackingElement key={index} label={link.label}>
        <a key={link.label} href={link.url} className={styles.link}>
          {link.label}
        </a>
      </FooterTrackingElement>
    );
  }

  function renderBlock(block: FooterDocument, index: number) {
    if (isEmpty(block.items)) {
      return null;
    }

    switch (block.slice_type) {
      case 'footer_links':
      case 'footer_about':
        return (
          <FooterBlock md={4} key={index}>
            <FooterBlockTitle>{block.primary.title}</FooterBlockTitle>
            <Grid container>
              {chunkifyArray(block.items, 2, true).map((group, index) => (
                <Grid key={index} item md={6} xs={6}>
                  {group.map(renderFooterLinkItem)}
                </Grid>
              ))}
            </Grid>
          </FooterBlock>
        );
      case 'footer_popular_categories':
        return (
          <FooterBlock md={8} key={index}>
            <FooterBlockTitle>{block.primary.title}</FooterBlockTitle>
            <Grid container>
              {chunkifyArray(block.items, 3, true).map((group, index) => (
                <Grid key={index} item md={3} xs={6}>
                  {group.map(renderFooterLinkItem)}
                </Grid>
              ))}
            </Grid>
          </FooterBlock>
        );
      case 'footer_payments':
        return (
          <FooterBlock md={4} key={index}>
            <FooterBlockTitle>{block.primary.title}</FooterBlockTitle>
            <div className={styles.footerBlockOffset}>
              {block.items.map((item) => (
                <FixedImage key={item.image} src={item.image} height={32} alt="" className={styles.image} />
              ))}
            </div>
          </FooterBlock>
        );
      case 'footer_delivery':
        return (
          <FooterBlock md={4} key={index}>
            <FooterBlockTitle>{block.primary.title}</FooterBlockTitle>
            {block.items.map((item) => (
              <FixedImage key={item.image} src={item.image} height={32} alt="" className={styles.image} />
            ))}
            <div className={styles.subBlock}>{block.primary.subtitle}</div>
          </FooterBlock>
        );
      case 'footer_guarantees':
        return (
          <FooterBlock md={4} key={index}>
            <FooterBlockTitle>{block.primary.title}</FooterBlockTitle>
            {block.items.map((item) => (
              <FixedImage key={item.image} src={item.image} height={40} alt="" className={styles.image} />
            ))}
            <div className={styles.subBlock}>
              {block.primary.bulletpoints.map((item) => (
                <div key={item.text}>{item.text}</div>
              ))}
            </div>
          </FooterBlock>
        );
      case 'footer_apps':
        return (
          <FooterBlock md={4} key={index}>
            <FooterBlockTitle>{block.primary.title}</FooterBlockTitle>
            {block.items.map((item) => (
              <FooterTrackingElement key={item.store_url} label={item.store_url}>
                <a href={item.store_url}>
                  <FixedImage
                    key={item.image}
                    src={item.image}
                    height={40}
                    alt={item.store_url}
                    className={styles.image}
                  />
                </a>
              </FooterTrackingElement>
            ))}
          </FooterBlock>
        );
      case 'footer_social_media':
        return (
          <FooterBlock md={4} key={index}>
            <FooterBlockTitle>{block.primary.title}</FooterBlockTitle>
            {block.items.map((item) => (
              <FooterTrackingElement key={item.url} label={item.url}>
                <a key={item.url} href={item.url}>
                  <FixedImage key={item.logo} src={item.logo} height={48} alt={item.url} className={styles.image} />
                </a>
              </FooterTrackingElement>
            ))}
          </FooterBlock>
        );
      default:
        console.warn('UNMAPPED BLOCK', block);
        return null;
    }
  }

  function renderNewsletterOrReferAFriend(): JSX.Element | null {
    switch (true) {
      case isCartAndCheckout:
      case isBodyCheck:
        return null;
      case isNewsletterSubscribed && !referLink:
        return null;
      case isNewsletterSubscribed && referLink && referLink.length > 0:
        return <ReferAFriend />;
      default:
        return <FooterNewsletter />;
    }
  }

  return (
    <div id="footer">
      {renderNewsletterOrReferAFriend()}
      {footers.top && (
        <FullWidthBgContainer className={cn(styles.container, styles.top)} flex={false}>
          <BlockContainer className={styles.blockContainer}>
            <Grid container>{footers.top.map(renderBlock)}</Grid>
          </BlockContainer>
        </FullWidthBgContainer>
      )}

      {footers.middle && (
        <FullWidthBgContainer className={cn(styles.container, styles.middle)} flex={false}>
          <BlockContainer className={styles.blockContainer}>
            <Grid container>{footers.middle.map(renderBlock)}</Grid>
          </BlockContainer>
        </FullWidthBgContainer>
      )}

      {footers.bottom && (
        <FullWidthBgContainer className={cn(styles.container, styles.bottom)} flex={false}>
          <BlockContainer className={styles.blockContainer}>
            <Grid container>{footers.bottom.map(renderBlock)}</Grid>
          </BlockContainer>
        </FullWidthBgContainer>
      )}
    </div>
  );
}

export default Footer;
