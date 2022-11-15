/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from 'react';

import Link from 'src/components/_shared/Link';
import cn from 'src/utils/cn';

import styles from './Item.module.css';
import FullWidthBgContainer from 'src/components/_shared/FullWidthBgContainer';
import { useSelector } from 'react-redux';
import { uiSelector } from 'src/store/slices/ui';
import EventTrackingElement from 'src/components/_tracking/EventTrackingElement';
import { HeaderProductType } from 'lib/api/content/getHeader/Types';
import Icon from 'src/components/_shared/Icon';
import IconButton from 'src/components/_shared/Button/IconButton';

interface Props {
  route?: string;
  title: string;
  category?: string;
  action?: string;
  label?: string;
  items?: any[];
  products?: HeaderProductType[];
  className?: string;
  linkClassName?: string;
  titleClassName?: string;
  styled?: string;
}

const SubMenuItem: React.FC<Props> = ({
  route,
  title,
  category = 'navigation',
  action = '',
  label = '',
  items,
  products = [],
  className = '',
  linkClassName = '',
  titleClassName = '',
  styled = '',
}) => {
  const { isSubMenuOpen } = useSelector(uiSelector);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const itemRef = useRef({ getBoundingClientRect: () => ({ height: 0, top: 0 }) });

  function handleExpandClick(): void {
    setIsExpanded(!isExpanded);
  }

  function handleWindowScroll(): void {
    setIsMouseOver(false);
    window.removeEventListener('scroll', handleWindowScroll);
  }

  function handleMouseOver(): void {
    if (products && products.length) {
      window.addEventListener('scroll', handleWindowScroll);
      setIsMouseOver(true);
    }
  }

  function handleMouseOut(): void {
    setIsMouseOver(false);
    window.removeEventListener('scroll', handleWindowScroll);
  }

  function renderSubmenu(): JSX.Element | null {
    if (items && items.length > 0) {
      return (
        <>
          <IconButton
            className={cn('mobile clear', styles.expander)}
            onClick={handleExpandClick}
            iconProps={{
              name: isExpanded ? 'minus' : 'plus',
            }}
          />
          <div className={isExpanded ? styles.itemsOpen : styles.itemsClosed}>
            {items.map((item: any, index: number) => (
              <SubMenuItem
                key={index}
                route={item.route || item.link || item.url}
                title={item.name}
                category={item.category}
                action={item.action}
                label={item.label}
                products={item.products}
                styled={item.style || ''}
              />
            ))}
          </div>
        </>
      );
    }
    return null;
  }

  const bounds = itemRef && itemRef.current ? itemRef.current.getBoundingClientRect() : { height: 0, top: 0 };

  const shouldLinkActAsExpander = isSubMenuOpen && items && items.length;

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/mouse-events-have-key-events */}
      <div
        className={cn(styles.item, styled, isMouseOver && styles.active, className)}
        onMouseEnter={handleMouseOver}
        onMouseLeave={handleMouseOut}
        ref={itemRef as any}
      >
        <EventTrackingElement
          key={'navigation' + title}
          dataCategory={category ? category : 'navigation'}
          dataAction={action ? action : title}
          dataLabel={label ? label : title}
        >
          <Link
            key={title}
            href={shouldLinkActAsExpander ? undefined : route}
            className={cn(linkClassName, isExpanded && styles.expanded)}
            onClick={shouldLinkActAsExpander ? handleExpandClick : undefined}
          >
            <span className={cn(styles.title, titleClassName)}>
              <span className={styles.titleBox}>{title}</span>
            </span>
          </Link>
        </EventTrackingElement>
        {renderSubmenu()}
        {isMouseOver ? (
          <div
            className={styles.popover}
            style={{
              top: bounds.height + bounds.top,
            }}
          >
            <FullWidthBgContainer
              className={styles.popoverContainer}
              contentClassName={styles.popoverContent}
              flex={false}
            >
              {products
                .concat(Array.from({ length: Math.ceil(products.length / 7) * 7 - products.length }))
                .map((product, index: number) => {
                  if (!product) {
                    return <span key={`span-${index}`} className={cn(styles.product, styles.filler)} />;
                  }
                  return (
                    <EventTrackingElement
                      key={'navigation' + index}
                      dataCategory={product.category ? product.category : 'navigation'}
                      dataAction={product.action ? product.action : product.title}
                      dataLabel={product.title}
                    >
                      <Link
                        key={index}
                        className={cn(styles.product, !product.image && styles.noImage)}
                        href={product.url}
                      >
                        {product.image && <img alt={product.title} src={product.image} />}
                        {product.title}
                        {!product.image && <Icon name="angleRight" />}
                      </Link>
                    </EventTrackingElement>
                  );
                })}
            </FullWidthBgContainer>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default SubMenuItem;
