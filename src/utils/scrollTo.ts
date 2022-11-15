// https://stackoverflow.com/questions/52292603/is-there-a-callback-for-window-scrollto

function scrollTo(offset: number, callback: () => void): void {
  const fixedOffset = offset.toFixed();
  const onScroll = function (): void {
    if (window.scrollY.toFixed() === fixedOffset) {
      window.removeEventListener('scroll', onScroll);
      callback();
    }
  };

  window.addEventListener('scroll', onScroll);
  onScroll();
  window.scrollTo({
    top: offset,
    behavior: 'smooth',
  });
}

export default scrollTo;
