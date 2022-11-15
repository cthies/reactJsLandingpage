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
        <path d="M12.3535534,5.14644661 C12.5271197,5.32001296 12.5464049,5.58943736 12.4114088,5.7843055 L12.3535534,5.85355339 L6.706,11.5 L18.5,11.5 C18.7761424,11.5 19,11.7238576 19,12 C19,12.2454599 18.8231248,12.4496084 18.5898756,12.4919443 L18.5,12.5 L6.706,12.5 L12.3535534,18.1464466 C12.5271197,18.320013 12.5464049,18.5894374 12.4114088,18.7843055 L12.3535534,18.8535534 C12.179987,19.0271197 11.9105626,19.0464049 11.7156945,18.9114088 L11.6464466,18.8535534 L5.14644661,12.3535534 L5.13458875,12.3412864 C5.1229392,12.3288187 5.11192025,12.3157542 5.10158273,12.3021439 L5.14644661,12.3535534 C5.11961234,12.3267191 5.09646582,12.2975936 5.07700705,12.2668065 C5.07001934,12.2556825 5.06329334,12.2440467 5.05703434,12.2321272 C5.04974961,12.2182757 5.04335147,12.2045389 5.03761056,12.1905951 C5.03240845,12.1780251 5.0275581,12.1647369 5.02326842,12.1511992 C5.01844802,12.1358347 5.01439613,12.1204743 5.01108568,12.1049871 C5.00889169,12.0949543 5.00700676,12.0845638 5.00544807,12.0740669 C5.0023875,12.0532373 5.000611,12.0324012 5.00013238,12.0115408 C5.00004222,12.0075746 5,12.0037922 5,12 L5.00011036,11.9894626 C5.00055436,11.968267 5.0023382,11.9470942 5.00546187,11.9260822 L5,12 C5,11.963903 5.00382515,11.9286993 5.01109223,11.8947723 C5.01439613,11.8795257 5.01844802,11.8641653 5.02324135,11.8489884 C5.0275581,11.8352631 5.03240845,11.8219749 5.03779224,11.8089634 C5.04335147,11.7954611 5.04974961,11.7817243 5.05680497,11.7682418 C5.06329334,11.7559533 5.07001934,11.7443175 5.07718801,11.7329897 C5.08073319,11.7272981 5.08459457,11.7214636 5.08859116,11.7156945 L5.10158273,11.6978561 C5.11192025,11.6842458 5.1229392,11.6711813 5.13458875,11.6587136 L5.14644661,11.6464466 L11.6464466,5.14644661 C11.8417088,4.95118446 12.1582912,4.95118446 12.3535534,5.14644661 Z" />
      </g>
    </g>
  </svg>
);

export default SvgComponent;
