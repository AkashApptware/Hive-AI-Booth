export const FRAME_ROUTES: { [key: number]: string } = {
  0: '/',
  1: '/idlepage',
  2: '/cameracalibration',
  3: '/framepage',
  4: '/framepage',
  5: '/framepage',
  6: '/framepage',
  7: '/framepage',
  8: '/framepage',
  9: '/framepage',
  10: '/framepage',
  11: '/framepage',
};

export const getFrameFromRoute = (pathname: string, search?: string): number => {
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
  
  const route = Object.entries(FRAME_ROUTES).find(([_, route]) => route === pathname);
  return route ? parseInt(route[0]) : 0;
};

export const getRouteFromFrame = (frame: number): string => {
  const baseRoute = FRAME_ROUTES[frame] || '/';
  
  if (frame >= 3 && frame <= 11) {
    return `${baseRoute}?frame=${frame}`;
  }
  
  return baseRoute;
};
