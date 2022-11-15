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
        <path d="M12.0007432,19.003643 C12.271576,19.003643 12.5111585,18.8994768 12.7194915,18.6911438 L12.7194915,18.6911438 L18.7507271,12.4411587 C19.3340592,11.8578266 19.7142663,11.1651202 19.8913494,10.3630386 C20.0684324,9.56095707 20.031974,8.76408397 19.7819746,7.97241935 C19.5319752,7.18075473 19.0840598,6.51408933 18.4382278,5.97242411 C17.8965626,5.49325875 17.2715641,5.19117598 16.5632323,5.06617627 C15.8549005,4.94117657 15.1517772,4.99325994 14.4538623,5.2224259 C13.7559475,5.45159186 13.1465739,5.83700793 12.6257417,6.37867315 L12.6257417,6.37867315 L12.0007432,7.03492158 L11.3757447,6.37867315 C10.9382457,5.92034075 10.3965805,5.56617508 9.75074855,5.31617568 C9.04241675,5.04534283 8.3445019,4.95159306 7.65700354,5.03492635 C6.88617189,5.11825964 6.18304857,5.4307589 5.54763357,5.97242411 C4.91221858,6.51408933 4.46951114,7.18075473 4.21951174,7.97241935 C3.96951234,8.76408397 3.93305393,9.56095707 4.110137,10.3630386 C4.28722007,11.1651202 4.66742718,11.8682435 5.25075928,12.4724086 L5.25075928,12.4724086 L11.2819949,18.6911438 C11.4903279,18.8994768 11.7299103,19.003643 12.0007432,19.003643 Z M12.0007432,18.0036454 L5.96950757,11.7536603 C5.55284205,11.3369948 5.26638424,10.821371 5.11013462,10.206789 C4.95388499,9.59220699 4.95909347,8.9932504 5.12575958,8.4099183 C5.31325913,7.74325338 5.67263327,7.18596273 6.20388201,6.73804729 C6.73513074,6.29013185 7.32367085,6.04534045 7.9695028,6.00367404 C8.49033505,5.96200763 9.02158378,6.06617389 9.563249,6.31617329 C10.000748,6.52450629 10.3653306,6.78492218 10.6569964,7.09742143 L10.6569964,7.09742143 L12.0007432,8.47241815 L13.34449,7.09742143 C13.6153228,6.78492218 13.979905,6.53492277 14.4382374,6.34742322 C14.9799026,6.09742382 15.5111513,5.9828406 16.0319836,6.00367404 C16.6778155,6.04534045 17.2663556,6.29013185 17.7976044,6.73804729 C18.3288531,7.18596273 18.6882272,7.74325338 18.8757268,8.4099183 C19.0423929,8.9932504 19.0476014,9.59220699 18.8913518,10.206789 C18.7351021,10.821371 18.4486443,11.3369948 18.0319788,11.7536603 L18.0319788,11.7536603 L12.0007432,18.0036454 Z" />
      </g>
    </g>
  </svg>
);

export default SvgComponent;
