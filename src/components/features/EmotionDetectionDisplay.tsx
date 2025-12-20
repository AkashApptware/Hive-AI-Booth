interface EmotionDetectionDisplayProps {
  currentEmotion: string;
}

export function EmotionDetectionDisplay({ currentEmotion }: EmotionDetectionDisplayProps) {
  if (!currentEmotion) return null;
  
  return (
    <p className="text-[#F4D8B8] mt-6 uppercase text-sm tracking-wider">
      Detected: {currentEmotion}
    </p>
  );
}

export default EmotionDetectionDisplay;

