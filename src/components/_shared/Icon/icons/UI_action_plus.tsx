import { SVGProps } from 'react';

const SvgComponent = (props: SVGProps<SVGSVGElement>): JSX.Element => (
  <svg
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
      <g fill={props.color}>
        <path d="M12,6 C12.2454599,6 12.4496084,6.17687516 12.4919443,6.41012437 L12.5,6.5 L12.5,11.5 L17.5,11.5 C17.7761424,11.5 18,11.7238576 18,12 C18,12.2454599 17.8231248,12.4496084 17.5898756,12.4919443 L17.5,12.5 L12.5,12.5 L12.5,17.5 C12.5,17.7761424 12.2761424,18 12,18 C11.7545401,18 11.5503916,17.8231248 11.5080557,17.5898756 L11.5,17.5 L11.5,12.5 L6.5,12.5 C6.22385763,12.5 6,12.2761424 6,12 C6,11.7545401 6.17687516,11.5503916 6.41012437,11.5080557 L6.5,11.5 L11.5,11.5 L11.5,6.5 C11.5,6.22385763 11.7238576,6 12,6 Z" />
      </g>
    </g>
  </svg>
);

export default SvgComponent;
