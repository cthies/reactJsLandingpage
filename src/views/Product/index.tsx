// import FullWidthBgContainer from 'components/lib/FullWidthBgContainer';

import FullWidthBgContainer from 'src/components/_shared/FullWidthBgContainer';

export type ProductProps = {
  title: string;
  description: string;
  image: string;
  price: string;
  currency: string;
};

function Product({ title, description, image, price, currency }: ProductProps): JSX.Element {
  return (
    <div>
      <FullWidthBgContainer>
        <div>breadcrumb</div>
      </FullWidthBgContainer>
      <div>{title}</div>
      <div>{description}</div>
      <div>
        <img src={image} alt="" />
      </div>
      <div>{price}</div>
      <div>{currency}</div>
    </div>
  );
}

export default Product;
