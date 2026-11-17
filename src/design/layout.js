import { Platform, StatusBar } from 'react-native';
import { space } from './tokens';

/**
 * One rule for screen edges on every platform:
 *   top    = real status-bar / notch / Dynamic Island inset + 8
 *   bottom = home-indicator / gesture-bar inset, at least 16
 * Falls back to the status bar height only when the safe-area inset is not
 * known yet (first frame on some Android devices).
 *
 * Use with full-screen <Modal statusBarTranslucent navigationBarTranslucent>
 * so Android draws under the system bars exactly like iOS does.
 */
export function screenInsets(insets = {}) {
  const fallbackTop = Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 20;
  const top = (insets.top || fallbackTop) + space.sm;
  const bottom = Math.max(insets.bottom || 0, space.lg);
  return { top, bottom };
}
