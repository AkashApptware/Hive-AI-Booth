import { useCallback } from 'react';
import { captureImageFromVideo, analyzeImageWithOpenAI } from '@/utils';

export function useImageCapture(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  cameraEnabled: boolean,
  cameraPermission: 'none' | 'requesting' | 'denied' | 'granted'
): { captureImage: () => Promise<void> } {
  const captureImage = useCallback(async () => {
    if (!cameraEnabled || !videoRef.current || cameraPermission !== 'granted') {
      console.warn('Camera not ready for capture');
      return;
    }

    const video = videoRef.current;

    // Check if video is ready and has valid dimensions
    if (video.readyState !== video.HAVE_ENOUGH_DATA || video.videoWidth === 0 || video.videoHeight === 0) {
      console.warn('Video not ready for capture:', {
        readyState: video.readyState,
        videoWidth: video.videoWidth,
        videoHeight: video.videoHeight,
      });
      return;
    }

    // console.log(' Capturing image from video...');
    const capturedBase64 = captureImageFromVideo(video);
    
    if (capturedBase64) {
      // console.log(' Image captured successfully!');
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY || '';
      await analyzeImageWithOpenAI(capturedBase64, apiKey);
    } else {
      console.error('Failed to capture image');
    }
  }, [cameraEnabled, cameraPermission, videoRef]);

  return { captureImage };
}

