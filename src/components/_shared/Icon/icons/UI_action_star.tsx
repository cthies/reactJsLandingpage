import { SVGProps } from 'react';

const SvgComponent = (props: SVGProps<SVGSVGElement>): JSX.Element => (
  <svg
    width="16px"
    height="16px"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <g stroke="none" strokeWidth="1" fill="currentColor" fillRule="evenodd">
      <g transform="translate(-57.000000, -2.500000)">
        <polygon points="64 13.15 59.8855032 15.663119 61.004172 10.9734035 57.3426044 7.83688104 62.1484765 7.45159647 64 3 65.8515235 7.45159647 70.6573956 7.83688104 66.995828 10.9734035 68.1144968 15.663119"></polygon>
      </g>
    </g>
  </svg>
);

export default SvgComponent;
