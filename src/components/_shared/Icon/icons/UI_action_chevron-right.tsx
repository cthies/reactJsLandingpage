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
        <path
          d="M15.1464466,4.64644661 C15.3417088,4.45118446 15.6582912,4.45118446 15.8535534,4.64644661 C16.0271197,4.82001296 16.0464049,5.08943736 15.9114088,5.2843055 L15.8535534,5.35355339 L9.207,12 L15.8535534,18.6464466 C16.0271197,18.820013 16.0464049,19.0894374 15.9114088,19.2843055 L15.8535534,19.3535534 C15.679987,19.5271197 15.4105626,19.5464049 15.2156945,19.4114088 L15.1464466,19.3535534 L8.14644661,12.3535534 C7.97288026,12.179987 7.95359511,11.9105626 8.08859116,11.7156945 L8.14644661,11.6464466 L15.1464466,4.64644661 Z"
          transform="translate(12.000000, 12.000000) rotate(-180.000000) translate(-12.000000, -12.000000) "
        />
      </g>
    </g>
  </svg>
);

export default SvgComponent;
