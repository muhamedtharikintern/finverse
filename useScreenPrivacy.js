import { useEffect } from 'react';
import * as ScreenCapture from 'expo-screen-capture';

/**
 * Hook to prevent screen capturing for privacy-sensitive screens.
 * Only works effectively on Android. iOS does not support blocking screenshots programmatically,
 * but it may obscure the screen in multitasking.
 */
export const useScreenPrivacy = () => {
    useEffect(() => {
        let isMounted = true;

        const enablePrivacy = async () => {
            try {
                await ScreenCapture.preventScreenCaptureAsync();
            } catch (e) {
                console.warn('Failed to prevent screen capture:', e);
            }
        };

        const disablePrivacy = async () => {
            try {
                await ScreenCapture.allowScreenCaptureAsync();
            } catch (e) {
                console.warn('Failed to allow screen capture:', e);
            }
        };

        enablePrivacy();

        return () => {
            isMounted = false;
            disablePrivacy();
        };
    }, []);
};
