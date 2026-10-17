// Plain data, so server components (the figure captions) can read it too.

/** "Auto Drive Explained" on the JustEvery_ YouTube channel, 2:36. */
export const autoDrive = {
  title: 'Auto Drive Explained',
  length: '2:36',
  watchUrl: 'https://youtu.be/UOASHZPruQk',
  // YouTube's documented player parameters: start on the click that loads
  // it, play inline on iPhone, related videos from the same channel. The
  // player adds `origin` (the page's own) when it builds the frame.
  embedUrl:
    'https://www.youtube-nocookie.com/embed/UOASHZPruQk?autoplay=1&playsinline=1&rel=0',
};
