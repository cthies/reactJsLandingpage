import { readFileSync } from 'fs';
import { resolve } from 'path';
import { Features } from './types';
import { defaultFeatures } from './default';

interface CachedFeatures {
  [key: string]: Features;
}

let cache: CachedFeatures;

export default function getCachedFeatures(hostname: string): Features {
  if (!cache) {
    try {
      const mappingFile = readFileSync(resolve('config/features.json')).toString('utf-8');
      cache = JSON.parse(mappingFile);
    } catch (e) {
      return defaultFeatures;
    }
  }
  return cache[hostname] || defaultFeatures;
}
