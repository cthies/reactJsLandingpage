import cn from 'src/utils/cn';
import styles from 'src/components/_common/Header/MainMenu/index.module.css';
import { toggleSubMenu } from 'src/store/slices/ui';
import { useDispatch } from 'react-redux';
import IconButton from 'src/components/_shared/Button/IconButton';

function MenuToggle(): JSX.Element {
  const dispatch = useDispatch();

  function handleClick(): void {
    dispatch(toggleSubMenu());
  }

  return (
    <div className={cn('mobile', styles.item)}>
      <IconButton onClick={handleClick} iconProps={{ name: 'bars', mobileSize: 28 }} />
    </div>
  );
}

export default MenuToggle;
