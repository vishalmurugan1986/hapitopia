import { useFonts } from 'expo-font';
import {
  Fredoka_500Medium,
  Fredoka_600SemiBold,
  Fredoka_700Bold
} from '@expo-google-fonts/fredoka';
import {
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
  Nunito_900Black
} from '@expo-google-fonts/nunito';

/**
 * Loads every font face the design system references. Static weights are used
 * (rather than a variable font) so weights render identically on iOS/Android.
 * `Fredoka` (legacy family name used by the onboarding screen) is kept mapped.
 */
export function useDesignFonts() {
  return useFonts({
    Fredoka: Fredoka_600SemiBold,
    Fredoka_500Medium,
    Fredoka_600SemiBold,
    Fredoka_700Bold,
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
    Nunito_900Black
  });
}
