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
          d="M13.6464466,7.64644661 C13.8417088,7.45118446 14.1582912,7.45118446 14.3535534,7.64644661 C14.5271197,7.82001296 14.5464049,8.08943736 14.4114088,8.2843055 L14.3535534,8.35355339 L10.707,12 L14.3535534,15.6464466 C14.5271197,15.820013 14.5464049,16.0894374 14.4114088,16.2843055 L14.3535534,16.3535534 C14.179987,16.5271197 13.9105626,16.5464049 13.7156945,16.4114088 L13.6464466,16.3535534 L9.64644661,12.3535534 C9.47288026,12.179987 9.45359511,11.9105626 9.58859116,11.7156945 L9.64644661,11.6464466 L13.6464466,7.64644661 Z"
          transform="translate(12.000000, 12.000000) rotate(-180.000000) translate(-12.000000, -12.000000) "
        />
      </g>
    </g>
  </svg>
);

export default SvgComponent;
