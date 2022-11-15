import { useSelector } from 'react-redux';
import { selectNewsletter } from 'src/store/slices/footer';
import Newsletter from 'src/components/_common/Newsletter';

const FooterNewsletter: React.FC = () => {
  const data = useSelector(selectNewsletter);

  return <Newsletter data={data} variant="footer" />;
};

export default FooterNewsletter;
