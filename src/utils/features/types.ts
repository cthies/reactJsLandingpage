export type FeatureKey = 'home-page' | 'ilp';

export type FeatureValue = boolean;

export type Features = {
  [key in FeatureKey]?: FeatureValue;
};
