import getConfig from 'next/config';

export default function getRuntimeConfigValue(key: string): string {
  const { serverRuntimeConfig } = getConfig();
  return serverRuntimeConfig[key] as string;
}
