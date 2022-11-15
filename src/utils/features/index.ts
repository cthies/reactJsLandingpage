import getCachedFeatures from './cache';
import { FeatureKey, Features, FeatureValue } from './types';

export type { FeatureKey, FeatureValue, Features };

export const getFeatures = getCachedFeatures;

export function assertFeature(domain: string, feature: FeatureKey, value: FeatureValue): boolean {
  const domainFeatures = getCachedFeatures(domain);
  return domainFeatures[feature] === value;
}

export function getFeature(domain: string, feature: FeatureKey): FeatureValue | undefined {
  const domainFeatures = getCachedFeatures(domain);
  return domainFeatures[feature];
}
