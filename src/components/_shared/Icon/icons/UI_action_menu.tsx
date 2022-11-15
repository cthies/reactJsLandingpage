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
        <path d="M19.5,17 C19.7761424,17 20,17.2238576 20,17.5 C20,17.7761424 19.7761424,18 19.5,18 L4.5,18 C4.22385763,18 4,17.7761424 4,17.5 C4,17.2238576 4.22385763,17 4.5,17 L19.5,17 Z M19.5,11.5 C19.7761424,11.5 20,11.7238576 20,12 C20,12.2761424 19.7761424,12.5 19.5,12.5 L4.5,12.5 C4.22385763,12.5 4,12.2761424 4,12 C4,11.7238576 4.22385763,11.5 4.5,11.5 L19.5,11.5 Z M19.5,6 C19.7761424,6 20,6.22385763 20,6.5 C20,6.77614237 19.7761424,7 19.5,7 L4.5,7 C4.22385763,7 4,6.77614237 4,6.5 C4,6.22385763 4.22385763,6 4.5,6 L19.5,6 Z" />
      </g>
    </g>
  </svg>
);

export default SvgComponent;
