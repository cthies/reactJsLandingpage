type Resolution = {
  width: number;
  height: number;
};

export function isServer(): boolean {
  return typeof window === 'undefined';
}

export function getResolution(): Resolution {
  if (isServer()) {
    return { width: 0, height: 0 };
  }
  const width = window.screen.width * window.devicePixelRatio;
  const height = window.screen.height * window.devicePixelRatio;
  return { width, height };
}

export function getResolutionRatio(): number {
  const { width, height } = getResolution();
  return width / height || -1;
}

export function isTouchScreen(): boolean {
  if (isServer()) {
    return false;
  }
  if (window.PointerEvent && 'maxTouchPoints' in navigator && navigator.maxTouchPoints > 0) {
    return true;
  } else if (window.matchMedia && window.matchMedia('(any-pointer:coarse)').matches) {
    return true;
  } else if (window.TouchEvent || 'ontouchstart' in window) {
    return true;
  }
  return false;
}

export function isMobileRatio(): boolean {
  return getResolutionRatio() > 0 && getResolutionRatio() < 1;
}

export function isMobile(): boolean {
  return isTouchScreen() || isMobileRatio();
}
