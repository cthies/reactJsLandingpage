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
        <path d="M18.4999654,6.00002861 C19.3280885,6.00002861 19.9999619,6.67190201 19.9999619,7.50002861 L19.9999619,7.50002861 L19.9999619,16.5000036 C19.9999619,17.3281266 19.3280885,18 18.4999654,18 L18.4999654,18 L5.5,18 C4.6718734,18 4,17.3281266 4,16.5000036 L4,16.5000036 L4,7.50002861 C4,6.67190201 4.6718734,6.00002861 5.5,6.00002861 L5.5,6.00002861 Z M14.3214644,13.8617618 C13.6786101,14.3934131 12.843601,15.0069555 11.9999809,15.0000072 C11.1552616,15.0046277 10.3173506,14.3904643 9.67887797,13.8625562 L5.797,16.9990286 L18.203,16.9990286 Z M4.99999762,10.0937688 L4.999,16.3570286 L8.8911083,13.2121372 C6.86330721,11.6012115 5.78642442,10.7371361 5.09125892,10.168517 L4.99999762,10.0937688 Z M18.9999642,10.0937688 C18.287472,10.6781486 17.1624747,11.5812531 14.9155929,13.3656422 L15.107,13.2130286 L18.999,16.3570286 Z M18.4999654,7.00002623 L5.49999762,7.00002623 C5.22500318,7.00002623 4.99999762,7.22503179 4.99999762,7.50002623 L4.99999762,7.50002623 L4.99999762,8.79378416 C5.68438319,9.37190778 6.66249976,10.1687809 9.70622419,12.584394 C10.2312474,13.0031247 11.2749766,14.0125217 11.9999809,14.0000095 C12.7249853,14.0125217 13.7656017,13.0031247 14.2937377,12.584394 C17.3374621,10.1687809 18.3155787,9.37190778 18.9999642,8.79378416 L18.9999642,8.79378416 L18.9999642,7.50002623 C18.9999642,7.22503179 18.7749587,7.00002623 18.4999654,7.00002623 L18.4999654,7.00002623 Z" />
      </g>
    </g>
  </svg>
);

export default SvgComponent;