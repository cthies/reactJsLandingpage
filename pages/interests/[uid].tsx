import { getInterestLandingPageDocument } from 'lib/api/content/getInterestPage';
import { InterestLandingPageDocument } from 'lib/api/content/getInterestPage/Types';
import { ResponseBolted } from 'lib/bolts';
import { GetServerSideProps } from 'next';
import InterestPage from 'src/containers/InterestPage';
import { LocalCache, LocalCacheBuilder } from 'src/utils/localCache';
import React from 'react';

import getPreviewRefFromReq from 'src/utils/getPreviewRefFromReq';
import { getFoodspringApiUrl } from 'lib/api/foodspring/URLUtils';

const _localCache = {} as LocalCache<InterestLandingPageDocument>;
const cachedILPData = LocalCacheBuilder(_localCache, getInterestLandingPageDocument);

export interface InterestLandingPageProps {
  ilpData?: InterestLandingPageDocument;
}

const InterestLandingPage: React.FC<InterestLandingPageProps> = ({ ilpData }) => {
  return <InterestPage ilpData={ilpData} />;
};

export const getServerSideProps: GetServerSideProps<InterestLandingPageProps> = async (context) => {
  const boltedResponse = context.res as ResponseBolted;

  const language = boltedResponse.props.language;
  const region = boltedResponse.props.region;

  const ilpData = await cachedILPData(
    String(context.query.uid),
    language,
    region,
    getFoodspringApiUrl(context),
    getPreviewRefFromReq(context.req)
  );

  // 404
  if (!ilpData) {
    return { props: {} };
  }

  return {
    props: {
      ilpData,
    },
  };
};
export default InterestLandingPage;
