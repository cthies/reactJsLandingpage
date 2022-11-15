import getCachedMainConfig from './cache';
import { MainConfig } from './types';

export type { MainConfig };

export const getMainConfig = getCachedMainConfig;
