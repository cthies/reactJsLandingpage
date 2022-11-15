import { SVGProps } from 'react';

const SvgComponent = (props: SVGProps<SVGSVGElement>): JSX.Element => (
  <svg
    width="16px"
    height="12px"
    viewBox="0 0 16 12"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
      <g transform="translate(-112.000000, -3598.000000)" fill={props.color}>
        <g transform="translate(0.000000, 3424.000000)">
          <g transform="translate(108.000000, 40.000000)">
            <g transform="translate(0.000000, 128.000000)">
              <path d="M8.72350781,18 C8.8320992,18 8.93465754,17.9523811 9.0311834,17.8571429 L9.0311834,17.8571429 L19.8903218,7.14285714 C19.962716,7.07142857 19.9989131,6.97619029 19.9989131,6.85714286 C19.9989131,6.73809542 19.962716,6.63095256 19.8903218,6.53571429 L19.8903218,6.53571429 L19.4559562,6.14285714 C19.383562,6.04761887 19.2870361,6 19.1663792,6 C19.0457223,6 18.9491964,6.04761887 18.8768022,6.14285714 L18.8768022,6.14285714 L8.70540925,16.1428571 L5.12189359,12.6071429 C5.04949934,12.5119046 4.95297348,12.4642857 4.83231657,12.4642857 C4.71165966,12.4642857 4.6151338,12.5119046 4.54273955,12.6071429 L4.54273955,12.6071429 L4.10837401,13 C4.03597976,13.0952383 3.99978263,13.2023811 3.99978263,13.3214286 C3.99978263,13.440476 4.03597976,13.5357143 4.10837401,13.6071429 L4.10837401,13.6071429 L8.41583223,17.8571429 C8.51235808,17.9523811 8.61491643,18 8.72350781,18 Z" />
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

export default SvgComponent;
