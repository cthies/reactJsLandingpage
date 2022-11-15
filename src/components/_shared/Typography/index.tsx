import { DetailedHTMLProps, HTMLAttributes } from 'react';
import cn from 'src/utils/cn';
import styles from './index.module.css';

/**
 * Available typography variants.
 * Earch variant represents different preset for style and html tag for text
 */
export type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body-l' | 'body-s' | 'body-default' | 'body-xs';

/**
 * Available html tags to be used for Typography rendering
 */
type ValidTags = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';

/**
 * Variant to HTML tag mappings
 */
const VARIANTS_MAPPINGS: {
  [key in Variant]: ValidTags;
} = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  ['body-l']: 'p',
  ['body-s']: 'p',
  ['body-default']: 'p',
  ['body-xs']: 'p',
};

export interface TypographyProps extends DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {
  tag?: Variant;
  theme?: 'light' | 'dark';
  noWrap?: boolean;
}

const Typography: React.FC<TypographyProps> = ({
  className,
  children,
  noWrap,
  tag = 'body-default',
  theme = 'light',
  ...rest
}) => {
  const Component = VARIANTS_MAPPINGS[tag] ?? 'p';

  return (
    <Component
      className={cn(styles.typography, noWrap ? styles.noWrap : '', styles[tag], styles[theme], className)}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default Typography;
