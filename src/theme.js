// Back-compat shim: the colour system now lives in `src/design` (Sprout Play).
// `LUMINOUS_THEME` is kept so any older import keeps working.
import { THEMES } from './design/themes';

export const LUMINOUS_THEME = THEMES;
export { THEMES, resolveTheme } from './design/themes';
