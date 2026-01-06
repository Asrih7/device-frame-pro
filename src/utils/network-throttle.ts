export type ThrottleProfile = 'none' | 'slow3g' | 'fast3g' | '4g';

export const PROFILES: Record<ThrottleProfile, {download: number; upload: number; latency: number}> = {
  none: { download: 0, upload: 0, latency: 0 },
  slow3g: { download: 400, upload: 400, latency: 400 },
  fast3g: { download: 1600, upload: 768, latency: 150 },
  '4g': { download: 9000, upload: 9000, latency: 20 }
};

export function applyThrottle(profile: ThrottleProfile) {
  // Placeholder: actual implementation would use a proxy or DevTools protocol to throttle
  console.log('Applying throttle profile', profile);
}
