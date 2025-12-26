import { captureImageFromVideo } from './openai';

export async function detectEmotion(
  videoElement: HTMLVideoElement,
  onDetected: (emotion: string, confidence: number) => void
): Promise<void> {
  try {
    const base64 = captureImageFromVideo(videoElement);
    if (!base64) {
      console.error('Failed to capture image from video');
      return;
    }

    const mockEmotions = ['😆 Amused', '😤 Frustrated', '😐 Neutral', '😊 Happy', '😮 Surprised'];
    const randomEmotion = mockEmotions[Math.floor(Math.random() * mockEmotions.length)];
    const confidence = 0.7 + Math.random() * 0.2;

    setTimeout(() => {
      onDetected(randomEmotion, confidence);
    }, 1000);
  } catch (error) {
    console.error('Error detecting emotion:', error);
  }
}

