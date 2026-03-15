/**
 * Haptic feedback utilities
 * Uses the Vibration API where available (Android Chrome, etc.)
 * Gracefully no-ops on unsupported platforms (iOS Safari, desktop)
 */

const canVibrate = typeof navigator !== 'undefined' && 'vibrate' in navigator;

/** Light tap — hover/focus feedback (10ms) */
export function hapticLight() {
  if (canVibrate) navigator.vibrate(10);
}

/** Medium tap — button press/click (25ms) */
export function hapticMedium() {
  if (canVibrate) navigator.vibrate(25);
}

/** Heavy pattern — important actions like form submit */
export function hapticHeavy() {
  if (canVibrate) navigator.vibrate([15, 30, 15]);
}
