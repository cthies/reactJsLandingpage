import { SVGProps } from 'react';

const SvgComponent = (props: SVGProps<SVGSVGElement>): JSX.Element => (
  <svg width={24} height={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M15.5 20a1.5 1.5 0 0 0 1.5-1.5V17h1.5a1.5 1.5 0 0 0 1.5-1.5v-10A1.5 1.5 0 0 0 18.5 4h-10A1.5 1.5 0 0 0 7 5.5V7H5.5A1.5 1.5 0 0 0 4 8.5v10A1.5 1.5 0 0 0 5.5 20h10Zm3-4h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-.5.5Zm-3 3h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5H7v7.5A1.5 1.5 0 0 0 8.5 17H16v1.5a.5.5 0 0 1-.5.5Z"
      fill={props.color}
      fillRule="evenodd"
    />
  </svg>
);

export default SvgComponent;
