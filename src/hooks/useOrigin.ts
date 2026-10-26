'use client';

import { useEffect, useState } from 'react';

/** The site origin, resolved after mount so server and client markup match. */
export function useOrigin() {
  const [origin, setOrigin] = useState('');
  useEffect(() => setOrigin(window.location.origin), []);
  return origin;
}
