import { SVGProps } from 'react';

const SvgComponent = (props: SVGProps<SVGSVGElement>): JSX.Element => (
  <svg width={24} height={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M16.003 20a3 3 0 0 0 3-3A3.005 3.005 0 0 0 16 14c-.894 0-1.694.39-2.244 1.01l-2.984-1.866c.3-.732.303-1.557 0-2.288l2.984-1.865a3 3 0 1 0-.531-.847l-2.984 1.865A2.98 2.98 0 0 0 8 9a3 3 0 1 0 2.244 4.99l2.984 1.866A3 3 0 0 0 16.003 20ZM16 9c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2Zm-8 5c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2Zm8 5c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2Z"
      fill={props.color}
      fillRule="evenodd"
    />
  </svg>
);

export default SvgComponent;
