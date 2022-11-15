import { SearchSuggestionsResponseType } from 'lib/api/content/getSearchSuggestions/Types';
import ContentSlider from '../ContentSlider';
import ProductSlider from '../ProductSlider';
import TopCategories from '../topCategories';

interface Props {
  data?: SearchSuggestionsResponseType;
  excludeSlices?: SearchSuggestionsResponseType[number]['slice_type'][];
}

const SearchSuggestions: React.FC<Props> = ({ data, excludeSlices }) => {
  if (!data) {
    return null;
  }

  return (
    <>
      {data.map((slice, i) => {
        if (excludeSlices && excludeSlices?.indexOf(slice.slice_type) !== -1) {
          return null;
        }

        switch (slice.slice_type) {
          case 'searchsuggestionproducts':
            return <ProductSlider key={`${i}-${slice.slice_type}`} data={slice} />;
          case 'searchsuggestioncategories':
            return <TopCategories key={`${i}-${slice.slice_type}`} data={slice} />;
          case 'searchsuggestionlatestcontent':
            return <ContentSlider key={`${i}-${slice.slice_type}`} data={slice} />;
        }
      })}
    </>
  );
};

export default SearchSuggestions;
