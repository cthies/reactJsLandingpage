import { ImgHTMLAttributes, SyntheticEvent, useState } from 'react';

function FixedImage(props: ImgHTMLAttributes<HTMLImageElement>): JSX.Element {
  const [width, setWidth] = useState(props.width || 0);
  const [height, setHeight] = useState(props.height || 0);

  function handleLoad(e: SyntheticEvent<HTMLImageElement, Event>) {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    if (naturalWidth && naturalHeight) {
      if (props.height) {
        setWidth(Number((naturalWidth * Number(props.height)) / naturalHeight));
        setHeight(Number(props.height));
      } else {
        setWidth(Number(props.width));
        setHeight(Number((naturalHeight * Number(props.width)) / naturalWidth));
      }
    }
  }

  return <img alt="" {...props} onLoad={handleLoad} width={width} height={height} />;
}

export default FixedImage;
