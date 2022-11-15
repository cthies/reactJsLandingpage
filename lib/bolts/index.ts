import { ServerResponse } from 'http';
import { Response } from 'express';
import { MainConfig } from 'src/utils/config';
import { Features } from 'src/utils/features';

export interface PropsBolt {
  mainConfig: MainConfig;
  features: Features;
  language: string;
  region: string;
  hasProxyContent: boolean;
}

export interface ContentBolt {
  htmlContent: string;
}

export interface ServerResponseBolted extends ServerResponse {
  props: PropsBolt;
  content: ContentBolt;
}

export interface ResponseBolted extends Response {
  props: PropsBolt;
  content: ContentBolt;
}
