export const FRAME_ROUTES: { [key: number]: string } = {
  0: '/',
  1: '/idlepage',
  2: '/cameracalibration',
};

export const FRAME_SLUGS: { [key: number]: string } = {
  3: 'figma-crashed',
  4: 'make-it-pop',
  5: 'deadline-extended',
  6: 'prototype-success',
  7: 'bonus-round',
  8: 'analyzing-moment',
  9: 'result-reveal',
  10: 'share-screen',
  11: 'hive-wall',
};

export const SLUG_TO_FRAME: { [key: string]: number } = {
  'figma-crashed': 3,
  'make-it-pop': 4,
  'deadline-extended': 5,
  'prototype-success': 6,
  'bonus-round': 7,
  'analyzing-moment': 8,
  'result-reveal': 9,
  'share-screen': 10,
  'hive-wall': 11,
};

export const getFrameFromRoute = (pathname: string, search?: string): number => {
  if (pathname.startsWith('/framepage')) {
    const parts = pathname.split('/framepage/');
    if (parts.length > 1 && parts[1]) {
      const slug = parts[1].split('?')[0].trim();
      if (slug && SLUG_TO_FRAME[slug]) {
        return SLUG_TO_FRAME[slug];
      }
    }
    
    if (pathname === '/framepage') {
      const params = new URLSearchParams(search || '');
      const frameParam = params.get('frame');
      if (frameParam) {
        const frame = parseInt(frameParam);
        if (frame >= 3 && frame <= 11) {
          return frame;
        }
      }
      return 3;
    }
  }
  
  const route = Object.entries(FRAME_ROUTES).find(([_, route]) => route === pathname);
  return route ? parseInt(route[0]) : 0;
};

export const getRouteFromFrame = (frame: number): string => {
  if (frame >= 3 && frame <= 11) {
    const slug = FRAME_SLUGS[frame];
    return `/framepage/${slug}`;
  }
  
  return FRAME_ROUTES[frame] || '/';
};
