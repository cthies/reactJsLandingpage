import { SearchSuggestionsResponseType } from 'lib/api/content/getSearchSuggestions/Types';
import Wrapper from 'src/storybook/Wrapper';
import SearchSuggestions from '.';

export default {
  title: 'Search suggestions',
  decorators: [Wrapper],
};

export function SearchSuggestionsStory(): JSX.Element {
  return <SearchSuggestions data={mockData} />;
}

const mockData: SearchSuggestionsResponseType = [
  {
    slice_type: 'searchsuggestionproducts',
    slice_label: null,
    items: [
      {
        title: 'Muscle Pack Pro',
        link: '/muscle-building-pack-pro',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIvBMLVgTQOeTT-C91ydvaIJjuWqite_46xg',
      },
      {
        title: 'Protein Cream Bundle',
        link: '/protein-cream-bundle',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIvBMLVgTQOeTT-C91ydvaIJjuWqite_46xg',
      },
      {
        title: 'Coconut Oil',
        link: '/organic-coconut-oil',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIvBMLVgTQOeTT-C91ydvaIJjuWqite_46xg',
      },
      {
        title: 'Protein Cream Hazelnut',
        link: '/protein-cream-hazelnut',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIvBMLVgTQOeTT-C91ydvaIJjuWqite_46xg',
      },
    ],
    primary: {
      title: 'Highest rated',
    },
  },
  {
    slice_type: 'searchsuggestioncategories',
    slice_label: null,
    items: [
      {
        title: 'Muscle Building',
        link: '/muscle-building',
      },
      {
        title: 'Weight Management',
        link: '/weight-management',
      },
      {
        title: 'Fitness & Indulgence',
        link: '/fitness-indulgence',
      },
      {
        title: 'Endurance',
        link: '/endurance',
      },
    ],
    primary: {
      title: 'Top categories',
    },
  },
  {
    slice_type: 'searchsuggestionlatestcontent',
    slice_label: null,
    items: [
      {
        title: 'Progressive Overload: the Key to Building Muscle',
        badge: 'Article',
        first_label: '6 min',
        second_label: null,
        link: '/magazine/progressive-overload',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIvBMLVgTQOeTT-C91ydvaIJjuWqite_46xg',
      },
      {
        title: 'Mulligatawny Soup with Garlic Coriander Naan',
        badge: 'Recipe',
        first_label: '50 mins',
        second_label: '378 KCAL',
        link: '/magazine/fitness-recipes/mulligatawny-soup',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIvBMLVgTQOeTT-C91ydvaIJjuWqite_46xg',
      },
      {
        title: 'Heavens Peak III',
        badge: 'Workout',
        first_label: 'from 30 min',
        second_label: 'Advanced',
        link: '/magazine/workout/heavens-peak-3',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIvBMLVgTQOeTT-C91ydvaIJjuWqite_46xg',
      },
    ],
    primary: {
      title: "What's new",
    },
  },
];
