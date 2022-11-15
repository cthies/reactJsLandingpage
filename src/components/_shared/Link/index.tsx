import React from 'react';
// import NextLink, { LinkProps } from 'next/link';

export type LinkProps = React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;

const Link: React.FC<LinkProps> = ({ children, ...rest }) => {
  // return <NextLink {...props} />;
  return <a {...rest}>{children}</a>;
};

export default Link;
