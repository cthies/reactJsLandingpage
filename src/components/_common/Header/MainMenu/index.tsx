/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from 'react-redux';

import FullWidthBgContainer from 'src/components/_shared/FullWidthBgContainer';
import styles from './index.module.css';
import SubMenuItem from '../SubMenu/Item';
import cn from 'src/utils/cn';
import Search from 'src/components/_common/Header/Search';
import LanguageLink from 'src/components/_shared/LanguageLink';
import UserMenu from 'src/components/_common/Header/MainMenu/UserMenu';
import MiniCart from 'src/components/_common/Header/MainMenu/MiniCart';
import MenuToggle from 'src/components/_common/Header/MenuToggle';
import { selectHeaderTopMenu } from 'src/store/slices/head';
import { useIsCart, useIsCartAndCheckout, useIsCheckout } from 'src/hooks/usePageType';
import MinimalMenu from './MinimalMenu';
import IconButton from 'src/components/_shared/Button/IconButton';

function MainMenu(): JSX.Element {
  const mainMenuItems = useSelector(selectHeaderTopMenu);

  const isCartAndCheckout = useIsCartAndCheckout();
  const isCart = useIsCart();
  const isCheckout = useIsCheckout();

  const renderCartAndCheckoutMenu = () => {
    return isCart ? <Search /> : <MinimalMenu />;
  };

  const renderDefaultMenu = () => {
    return (
      <>
        <div className={cn('desktop', styles.inlineMenu)}>
          {mainMenuItems.items.map((item) => (
            <SubMenuItem
              key={item.url}
              route={item.url}
              title={item.title}
              category={item.category ? item.category : 'navigation'}
              action={item.action ? item.action : item.title}
              label={item.label ? item.label : item.title}
              items={[]}
              linkClassName={styles.mainItem}
              titleClassName={styles.title}
            />
          ))}
        </div>
        <div className={cn(styles.fill, 'mobile')} />

        <Search />
        <UserMenu />
        <MiniCart />
        <MenuToggle />
      </>
    );
  };

  function handleBackClick() {
    window.history.back();
  }

  return (
    <FullWidthBgContainer className={styles.container} contentClassName={styles.content}>
      {isCartAndCheckout && (
        <IconButton
          className={cn('mobile', styles.back)}
          onClick={handleBackClick}
          iconProps={{ name: 'chevronLeft' }}
        />
      )}
      <LanguageLink href="/" className={styles.logo}>
        <img src="/images/logo.svg" alt="logo" width={131} height={30} />
      </LanguageLink>

      {isCartAndCheckout ? renderCartAndCheckoutMenu() : renderDefaultMenu()}
      {isCheckout && <span className="mobile" />}
    </FullWidthBgContainer>
  );
}

export default MainMenu;
