import { GetServerSideProps } from 'next';
import HomePage from 'src/containers/HomePage';
import { ResponseBolted } from 'lib/bolts';
import { LocalCache, LocalCacheBuilder } from 'src/utils/localCache';
import { HomePageDocument } from 'lib/api/content/getHomePageData/Types';
import { getHomePageDocument } from 'lib/api/content/getHomePageData';
import getPreviewRefFromReq from 'src/utils/getPreviewRefFromReq';
import { getFoodspringApiUrl } from 'lib/api/foodspring/URLUtils';

export interface HomePageProps {
  homePageData?: HomePageDocument;
}

const Home: React.FC<HomePageProps> = ({ homePageData }) => {
  if (!homePageData) {
    throw 'Missing home page data';
  }

  return <HomePage data={homePageData} />;
};
const _localCache = {} as LocalCache<HomePageDocument>;
const cachedHomePageData = LocalCacheBuilder(_localCache, getHomePageDocument);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getServerSideProps: GetServerSideProps<HomePageProps> = async (context) => {
  const { res, req } = context;
  const boltedResponse = res as ResponseBolted;

  const language = boltedResponse.props.language;
  const region = boltedResponse.props.region;

  const homePageData = await cachedHomePageData(
    language,
    region,
    getFoodspringApiUrl(context),
    getPreviewRefFromReq(req)
  );
  return {
    props: {
      homePageData,
    },
  };
};
export default Home;
