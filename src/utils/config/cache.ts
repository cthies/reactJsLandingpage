import { readFileSync } from 'fs';
import { resolve } from 'path';
import { MainConfig } from './types';
import { defaultMainConfig } from './default';

interface CachedMainConfig {
  [key: string]: MainConfig;
}

let cache: CachedMainConfig;

export default function getCachedMainConfig(hostname: string): MainConfig {
  if (!cache) {
    try {
      const fileContent = readFileSync(resolve('config/42.json')).toString('utf-8');
      cache = JSON.parse(fileContent);
    } catch (e) {
      return defaultMainConfig;
    }
  }
  return cache[hostname] || defaultMainConfig;
}
