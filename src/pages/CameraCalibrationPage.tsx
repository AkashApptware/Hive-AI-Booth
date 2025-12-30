import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { toast } from 'react-toastify';
import { 
  EmotionalBackground, 
  Header,
  HoneycombBackground,
  Button, 
  CameraPreview, 
  CameraPermissionInfo, 
  HintChip 
} from '@/components';
import { useCamera } from '@/hooks';
import { captureImageFromVideo, toast as toastUtil, mockAnalyzeImage, getRouteFromFrame } from '@/utils';

const CameraCalibrationPage: React.FC = () => {
  const navigate = useNavigate();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [hasCheckedPermission, setHasCheckedPermission] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCameraDisconnected, setIsCameraDisconnected] = useState(false);

  const {
    videoRef,
    cameraEnabled,
    cameraPermission,
    useFallback,
    startCamera,
    setUseFallback,
    setCameraPermission,
  } = useCamera();

  useEffect(() => {
    const checkCameraPermission = async () => {
      if (hasCheckedPermission) {
        return;
      }
      
      if (videoRef.current?.srcObject) {
        if (videoRef.current) {
          videoRef.current.play().catch(() => {});
        }
        setHasCheckedPermission(true);
        return;
      }
      
      if (cameraEnabled) {
        setHasCheckedPermission(true);
        return;
      }
      
      try {
        if (navigator.permissions && navigator.permissions.query) {
          const permissionStatus = await navigator.permissions.query({ name: 'camera' as PermissionName });
          
          if (permissionStatus.state === 'granted') {
            try {
              await startCamera();
            } catch (error: any) {
              if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
                toastUtil.camera.deviceError();
              } else if (error.name === 'NotReadableError') {
                toastUtil.camera.inUseError();
              }
            }
          } else if (permissionStatus.state === 'denied') {
            setCameraPermission('denied');
            setUseFallback(true);
          } else if (permissionStatus.state === 'prompt') {
            setCameraPermission('none');
          }
        } else {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            stream.getTracks().forEach(track => track.stop());
            try {
              await startCamera();
            } catch (error: any) {
              if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
                toastUtil.camera.deviceError();
              } else if (error.name === 'NotReadableError') {
                toastUtil.camera.inUseError();
              }
            }
          } catch (error: any) {
            if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
              setCameraPermission('denied');
              setUseFallback(true);
            } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
              if (cameraPermission !== 'granted') {
                setCameraPermission('none');
              } else {
                toastUtil.camera.deviceError();
              }
            } else {
              setCameraPermission('none');
            }
          }
        }
      } catch (error) {
        if (cameraPermission === 'none' || cameraPermission === 'requesting') {
          setCameraPermission('none');
        }
      } finally {
        setHasCheckedPermission(true);
      }
    };

    checkCameraPermission();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleStreamEnded = () => {
      const stream = video.srcObject as MediaStream | null;
      if (stream) {
        const activeTracks = stream.getTracks().filter(track => track.readyState === 'live');
        if (activeTracks.length === 0) {
          setIsCameraDisconnected(true);
          setCapturedImage(null);
        }
      }
    };

    const handleTrackEnded = () => {
      const stream = video.srcObject as MediaStream | null;
      if (stream) {
        const activeTracks = stream.getTracks().filter(track => track.readyState === 'live');
        if (activeTracks.length === 0) {
          setIsCameraDisconnected(true);
          setCapturedImage(null);
        }
      }
    };

    const checkStreamStatus = () => {
      const stream = video.srcObject as MediaStream | null;
      if (stream) {
        const activeTracks = stream.getTracks().filter(track => track.readyState === 'live');
        if (activeTracks.length === 0 && (cameraEnabled || video.srcObject)) {
          setIsCameraDisconnected(true);
          setCapturedImage(null);
        } else if (activeTracks.length > 0) {
          setIsCameraDisconnected(false);
        }
      } else {
        if (cameraEnabled) {
          setIsCameraDisconnected(true);
          setCapturedImage(null);
        }
      }
    };

    video.addEventListener('ended', handleStreamEnded);
    
    const stream = video.srcObject as MediaStream | null;
    if (stream) {
      stream.getTracks().forEach(track => {
        track.addEventListener('ended', handleTrackEnded);
      });
    }

    const intervalId = setInterval(checkStreamStatus, 1000);

    return () => {
      video.removeEventListener('ended', handleStreamEnded);
      if (stream) {
        stream.getTracks().forEach(track => {
          track.removeEventListener('ended', handleTrackEnded);
        });
      }
      clearInterval(intervalId);
    };
  }, [cameraEnabled, videoRef]);

  const handleStartCamera = async () => {
    const wasDisconnected = isCameraDisconnected;
    try {
      await startCamera();
      setIsCameraDisconnected(false);
      toastUtil.camera.started();
    } catch (error: any) {
      if (wasDisconnected) {
        toast.error('Camera disconnected. Please turn on your camera to continue.');
      } else {
        if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
          toastUtil.camera.deviceError();
          setCameraPermission('none');
          setUseFallback(false);
        } else if (error.name === 'NotReadableError') {
          toastUtil.camera.inUseError();
          setCameraPermission('none');
          setUseFallback(false);
        }
      }
    }
  };

  const handleCapture = () => {
    if (!videoRef.current) return;
    
    const hasActiveStream = cameraEnabled || (videoRef.current.srcObject !== null);
    if (!hasActiveStream) return;

    const base64 = captureImageFromVideo(videoRef.current);
    if (base64) {
      const dataUrl = `data:image/jpeg;base64,${base64}`;
      setCapturedImage(dataUrl);
      toastUtil.camera.captured();
    }
  };

  const handleContinue = async () => {
    if (!capturedImage) return;
    
    setIsProcessing(true);
    const toastId = toastUtil.api.loading();
    
    try {
      const base64 = capturedImage.split(',')[1];
      if (!base64) {
        throw new Error('Invalid image data');
      }
      
      const result = await mockAnalyzeImage(base64);
      
      toast.dismiss(toastId);
      
      if (result.success) {
        // Save API response to sessionStorage for HiveWall
        try {
          sessionStorage.setItem('design-hive-api-response', JSON.stringify(result.data));
        } catch (error) {
          console.error('Error saving API response:', error);
        }
        
        toastUtil.api.success();
        setTimeout(() => {
          navigate(getRouteFromFrame(11));
        }, 1000);
      } else {
        toastUtil.api.error(result.error);
        setIsProcessing(false);
      }
    } catch (error) {
      toast.dismiss(toastId);
      toastUtil.api.error(error instanceof Error ? error.message : 'An error occurred');
      setIsProcessing(false);
    }
  };

  return (
    <div 
      className="w-screen h-screen bg-[#4A1F3E] overflow-hidden relative" 
      style={{ fontFamily: "'Hammersmith One', sans-serif" }}
    >
      <HoneycombBackground />
      <EmotionalBackground />
      <Header currentFrame={2} />

      <motion.div
        key="frame-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
         className="absolute inset-0 flex flex-col items-center justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-5 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-4 sm:pb-6 md:pb-8"
      >
        {cameraPermission !== 'none' && cameraPermission !== 'granted' && (
          <div className="mb-2 md:mb-4">
            <CameraPermissionInfo mode={cameraPermission} />
          </div>
        )}

        <div className="w-full flex items-center justify-center mb-1 md:mb-2">
          {capturedImage ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
               className="relative w-full max-w-[320px] h-[240px] sm:max-w-[400px] sm:h-[300px] md:max-w-[500px] md:h-[375px] lg:max-w-[500px] lg:h-[375px] xl:max-w-[600px] xl:h-[450px] backdrop-blur-sm rounded-xl md:rounded-2xl lg:rounded-3xl border overflow-hidden"
              style={{
                backgroundColor: '#5A2650CC',
                borderColor: '#E9A86A4D',
              }}
            >
              <img
                src={capturedImage} 
                alt="Captured" 
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div className="absolute top-2 left-2 sm:top-3 sm:left-3 md:top-4 md:left-4 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 border-l-2 border-t-2" style={{ borderColor: '#E9A86A' }} />
              <div className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 border-r-2 border-t-2" style={{ borderColor: '#E9A86A' }} />
              <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 md:bottom-4 md:left-4 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 border-l-2 border-b-2" style={{ borderColor: '#E9A86A' }} />
              <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 md:bottom-4 md:right-4 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 border-r-2 border-b-2" style={{ borderColor: '#E9A86A' }} />

              <div 
                className="absolute bottom-3 left-1/2 -translate-x-1/2 sm:bottom-4 md:bottom-6 flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 backdrop-blur-sm rounded-full border"
                style={{
                  backgroundColor: '#4A1F3ECC',
                  borderColor: '#E9A86A4D',
                }}
              >
                <div 
                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"
                  style={{ backgroundColor: '#E9A86A' }}
                />
                <span className="text-[10px] sm:text-xs uppercase tracking-wider" style={{ color: '#F4D8B8' }}>
                  Captured
                </span>
              </div>
            </motion.div>
          ) : (
            <CameraPreview 
              videoRef={videoRef} 
              isActive={(cameraEnabled || (videoRef.current?.srcObject !== null)) && !isCameraDisconnected} 
            />
          )}
        </div>

        <div className="text-center px-4">
          {isCameraDisconnected ? (
            <>
              <h2 className="text-[#F4D8B8] mb-1 md:mb-2 uppercase tracking-tight text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                Camera Disconnected
              </h2>
              <p className="text-[#D4B5C8] text-xs sm:text-sm md:text-base mb-2 md:mb-3 uppercase tracking-wide">
                Please turn on your camera to continue
              </p>
            </>
          ) : (
            <>
              {!capturedImage && (
                <h2 className="text-[#F4D8B8] mb-1 md:mb-2 uppercase tracking-tight text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                  {(() => {
                    const isScanning = cameraEnabled || (videoRef.current?.srcObject !== null);
                    return isScanning ? "Scanning..." : "Ready?";
                  })()}
                </h2>
              )}
              {(() => {
                const isScanning = cameraEnabled || (videoRef.current?.srcObject !== null);
                if (!isScanning && !capturedImage) {
                  return (
                    <div className="mb-2 md:mb-3">
                      <HintChip text="Camera Access Required" />
                    </div>
                  );
                }
                return null;
              })()}
            </>
          )}
          {useFallback && !isCameraDisconnected && (
            <p className="text-[#D4B5C8] text-xs sm:text-sm md:text-base md:mt-4 uppercase tracking-wide">
              Demo Mode Active
            </p>
          )}
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-4 lg:gap-6 mb-4 md:mb-6 w-full max-w-md md:max-w-lg lg:max-w-xl px-4">
          {(() => {
            const shouldShowAllow = (!cameraEnabled && !videoRef.current?.srcObject && cameraPermission !== 'denied') || isCameraDisconnected;
            return shouldShowAllow ? (
              <Button onClick={handleStartCamera} variant="primary" >
                {isCameraDisconnected ? 'Reconnect Camera' : 'Allow'}
              </Button>
            ) : null;
          })()}
          {(cameraEnabled || videoRef.current?.srcObject) && !capturedImage && !isCameraDisconnected && (
            <Button onClick={handleCapture} variant="primary" >
              Capture
            </Button>
          )}
          {capturedImage && !isCameraDisconnected && (
            <>
              <Button 
                onClick={handleContinue} 
                variant="primary"
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Continue'}
              </Button>
            </>
          )}
          <Button 
            onClick={() => navigate('/framepage')} 
            variant="secondary"
            disabled={isCameraDisconnected}
          >
            Demo
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default CameraCalibrationPage;
