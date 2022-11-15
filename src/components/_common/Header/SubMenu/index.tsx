import { useDispatch, useSelector } from 'react-redux';
import FullWidthBgContainer from 'src/components/_shared/FullWidthBgContainer';
import { closeSubMenu, uiSelector } from 'src/store/slices/ui';
import {
  selectHeaderSecondLevelMenu,
  selectHeaderServiceMenu,
  selectHeaderSupportMenu,
  selectHeaderTopMenu,
  selectIsStoreSwitcherOpen,
} from 'src/store/slices/head';
import styles from './index.module.css';
import cn from 'src/utils/cn';
import SubMenuItem from 'src/components/_common/Header/SubMenu/Item';
import StoreSwitchControl from 'src/components/_common/Header/ServiceBar/StoreSwitchControl';
import StoreSwitchMenu from 'src/components/_common/Header/ServiceBar/StoreSwitchMenu';
import { setStoreSwitcherIsOpen } from 'src/store/slices/head';
import IconButton from 'src/components/_shared/Button/IconButton';

function SubMenu(): JSX.Element {
  const { isSubMenuOpen } = useSelector(uiSelector);

  const topMenu = useSelector(selectHeaderTopMenu);
  const supportMenu = useSelector(selectHeaderSupportMenu);
  const serviceMenu = useSelector(selectHeaderServiceMenu);
  const secondLevelMenu = useSelector(selectHeaderSecondLevelMenu);

  const isStoreSwitcherOpen = useSelector(selectIsStoreSwitcherOpen);

  const dispatch = useDispatch();

  function handleBackgroundClick(): void {
    dispatch(setStoreSwitcherIsOpen(false));
    dispatch(closeSubMenu());
  }

  function handleMenuClick(e: React.MouseEvent): void {
    e.stopPropagation();
  }

  function handleCloseClick(): void {
    dispatch(setStoreSwitcherIsOpen(false));
    dispatch(closeSubMenu());
  }

  return (
    <FullWidthBgContainer
      className={`${styles.container} ${isSubMenuOpen ? styles.open : ''}`}
      contentClassName={styles.content}
      onClick={handleBackgroundClick}
    >
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div className={styles.menu} onClick={handleMenuClick}>
        <div className={cn('mobile', styles.title)}>
          <img src="/images/logo.svg" alt="logo" className={styles.logo} width={108} height={25} />
          <IconButton className={styles.close} onClick={handleCloseClick} iconProps={{ name: 'close' }} />
        </div>
        {isSubMenuOpen ? (
          <>
            {topMenu.items.map((item, index: number) => (
              <SubMenuItem
                key={`top-menu-${index}`}
                route={item.url}
                title={item.title}
                category={item.category}
                action={item.action}
                label={item.label}
                items={index === 0 ? secondLevelMenu.map((i) => i.primary) : undefined}
                linkClassName={index === 0 ? styles.firstItem : styles.linkItem}
                className={styles.item}
              />
            ))}
            <SubMenuItem
              key={'support-menu'}
              title={supportMenu.primary.name}
              items={supportMenu.items}
              linkClassName={styles.linkItem}
              className={styles.item}
            />
            <SubMenuItem
              key={'service-menu'}
              title={serviceMenu.primary.name}
              items={serviceMenu.items}
              linkClassName={styles.lastItem}
              className={styles.item}
            />
          </>
        ) : (
          secondLevelMenu.map((item, index) => (
            <SubMenuItem
              key={`second-level-${index}`}
              route={item.primary.url}
              title={item.primary.name}
              styled={item.primary.style}
              category={item.primary.category}
              action={item.primary.action}
              label={item.primary.label}
              products={item.items}
              linkClassName={
                index === 0
                  ? styles.firstItem
                  : index === secondLevelMenu.length - 1
                  ? styles.lastItem
                  : styles.linkItem
              }
              className={styles.item}
            />
          ))
        )}

        <div className="mobile" style={{ flex: 1 }} />
        {isSubMenuOpen && <StoreSwitchControl />}
        {isSubMenuOpen && isStoreSwitcherOpen && <StoreSwitchMenu />}
      </div>
    </FullWidthBgContainer>
  );
}

export default SubMenu;
