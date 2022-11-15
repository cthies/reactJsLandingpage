import { ReactNode } from 'react';
import styles from './index.module.css';
import cn from 'src/utils/cn';

type ColCount = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

type GridDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';

type GridWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

type GridJustification = 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';

type GridItemsAlignment = 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';

export type GridProps = {
  children: ReactNode;
  className?: string;
  container?: boolean;
  item?: boolean;
  xs?: ColCount;
  sm?: ColCount;
  md?: ColCount;
  lg?: ColCount;
  xl?: ColCount;
  spacing?: number;
  direction?: GridDirection;
  wrap?: GridWrap;
  justifyContent?: GridJustification;
  alignItems?: GridItemsAlignment;
};

function Grid(props: GridProps): JSX.Element {
  const { children, container, item, className, direction, wrap, justifyContent, alignItems } = props;

  const classes = cn(
    container && styles.container,
    item && styles.item,
    styles[`xs-span-${props.xs}`],
    styles[`sm-span-${props.sm}`],
    styles[`md-span-${props.md}`],
    styles[`lg-span-${props.lg}`],
    styles[`xl-span-${props.xl}`],
    styles[`spacing-${props.spacing}`],
    direction && styles[`direction-${direction}`],
    wrap && styles[`wrap-${wrap}`],
    justifyContent && styles[`justifyContent-${justifyContent}`],
    alignItems && styles[`alignItems-${alignItems}`],
    className
  );

  return <div className={classes}>{children}</div>;
}

export default Grid;
