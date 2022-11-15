import { InterestLandingPageYoutubeSlice } from 'lib/api/content/getInterestPage/Types';
import React, { useCallback, useRef } from 'react';
import YouTube from 'react-youtube';
import BlockContainer from 'src/components/_common/BlockContainer';
import Typography from 'src/components/_shared/Typography';
import { useDeviceType } from 'src/hooks/useDeviceType';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { trackEvent } from 'src/tracking';

import styles from './index.module.css';

interface Props {
  data: InterestLandingPageYoutubeSlice;
}

const ASPECT_RATIO = 16 / 9;

const YoutubeVideo: React.FC<Props> = ({ data }) => {
  const { youtube_video_id, subtitle } = data.primary;

  const { width } = useWindowSize();

  const isMobile = useDeviceType() === 'mobile';
  const isAutoPlayEventConsumed = useRef(isMobile);

  const onPlayHandler = useCallback(() => {
    if (!isAutoPlayEventConsumed.current) {
      isAutoPlayEventConsumed.current = true;
      return;
    }

    trackEvent({
      action: 'play',
      category: 'ILP Video',
      label: youtube_video_id,
    });
  }, [youtube_video_id]);

  const onPauseHandler = useCallback(() => {
    trackEvent({
      action: 'pause',
      category: 'ILP Video',
      label: youtube_video_id,
    });
  }, [youtube_video_id]);

  return (
    <div className={styles.container}>
      <YouTube
        videoId={youtube_video_id}
        className={styles.video}
        opts={{
          width: `${width}`,
          height: `${(width ?? 0) / ASPECT_RATIO}`,
          playerVars: {
            autoplay: 1,
            mute: 1,
            color: 'white',
            loop: isMobile ? 0 : 1,
            playlist: youtube_video_id,
            showinfo: 1,
            controls: 1,
          },
        }}
        onPlay={onPlayHandler}
        onPause={onPauseHandler}
      />

      <BlockContainer>
        <Typography className={styles.subtitle} tag="h3" theme="dark">
          {subtitle}
        </Typography>
      </BlockContainer>
    </div>
  );
};

export default YoutubeVideo;
