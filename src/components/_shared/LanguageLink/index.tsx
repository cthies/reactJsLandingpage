import Link, { LinkProps } from 'src/components/_shared/Link';
import useHrefWithLang from 'src/hooks/useHrefWithLang';

function LanguageLink(props: LinkProps): JSX.Element {
  const href = useHrefWithLang()(props.href);
  return <Link {...props} href={href} />;
}

export default LanguageLink;
