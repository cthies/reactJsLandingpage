import { SVGProps } from 'react';

const SvgComponent = (props: SVGProps<SVGSVGElement>): JSX.Element => (
  <svg width={48} height={48} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g fill="none" fillRule="evenodd">
      <rect fill="#FFF" width={48} height={48} rx={24} />
      <path
        d="M25.458 32.833c4.462-.705 7.875-4.59 7.875-9.276 0-5.187-4.177-9.39-9.333-9.39-5.156 0-9.333 4.203-9.333 9.39 0 4.687 3.413 8.571 7.875 9.276v-6.562H20.17v-2.714h2.37v-2.069c0-2.353 1.393-3.653 3.526-3.653 1.021 0 2.09.183 2.09.183v2.31h-1.178c-1.159 0-1.52.724-1.52 1.466v1.763h2.588l-.414 2.714h-2.175v6.562Z"
        fill={props.color}
      />
    </g>
  </svg>
);

export default SvgComponent;
