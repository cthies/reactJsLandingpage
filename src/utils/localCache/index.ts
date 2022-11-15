type CacheEntry<T> = {
  timestamp: number;
  entry: T;
};

export type LocalCache<T> = Record<string, CacheEntry<T>>;

const CACHE_TTL = parseInt(process.env.CACHE_TTL || '0', 10);

function expired<T>(value: CacheEntry<T>): boolean {
  return (Date.now() - value.timestamp) / 1000 > CACHE_TTL;
}

export function LocalCacheBuilder<T>(cache: LocalCache<T>, fetcher: (...args: any[]) => Promise<T>) {
  return async function (...args: string[]): Promise<T> {
    const key = args.join('-');
    if (!cache[key] || expired(cache[key])) {
      cache[key] = {
        entry: await fetcher(...args),
        timestamp: Date.now(),
      };
    }

    return cache[key].entry;
  };
}
