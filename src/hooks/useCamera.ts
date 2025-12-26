import { useState, useRef, useEffect } from 'react';

interface UseCameraReturn {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  cameraEnabled: boolean;
  cameraPermission: 'none' | 'requesting' | 'denied' | 'granted';
  useFallback: boolean;
  startCamera: () => Promise<void>;
  setUseFallback: (value: boolean) => void;
  setCameraPermission: (value: 'none' | 'requesting' | 'denied' | 'granted') => void;
}

export function useCamera(): UseCameraReturn {
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [cameraPermission, setCameraPermission] = useState<'none' | 'requesting' | 'denied' | 'granted'>('none');
  const [useFallback, setUseFallback] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    setCameraPermission('requesting');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      
      setCameraEnabled(true);
      setCameraPermission('granted');
    } catch (error: any) {
      console.error('Camera access error:', error);
      
      if (error.name === 'NotFoundError') {
        console.error('Camera device not found');
      } else if (error.name === 'NotAllowedError') {
        console.error('Camera permission denied');
      } else if (error.name === 'NotReadableError') {
        console.error('Camera is already in use');
      }
      
      setUseFallback(true);
      setCameraPermission('denied');
      setCameraEnabled(false);
    }
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, []);

  return {
    videoRef,
    cameraEnabled,
    cameraPermission,
    useFallback,
    startCamera,
    setUseFallback,
    setCameraPermission,
  };
}

