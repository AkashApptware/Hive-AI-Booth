import { toast, ToastOptions } from 'react-toastify';

// Common toast configuration
const defaultOptions: ToastOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

// Success toast
export const showSuccessToast = (message: string, options?: ToastOptions) => {
  return toast.success(message, {
    ...defaultOptions,
    autoClose: 3000,
    ...options,
  });
};

// Error toast
export const showErrorToast = (message: string, options?: ToastOptions) => {
  return toast.error(message, {
    ...defaultOptions,
    autoClose: 5000,
    ...options,
  });
};

// Warning toast
export const showWarningToast = (message: string, options?: ToastOptions) => {
  return toast.warning(message, {
    ...defaultOptions,
    autoClose: 4000,
    ...options,
  });
};

// Info toast
export const showInfoToast = (message: string, options?: ToastOptions) => {
  return toast.info(message, {
    ...defaultOptions,
    autoClose: 4000,
    ...options,
  });
};

// Camera specific toasts
export const showCameraDeviceError = () => {
  return showErrorToast('Camera device not found. Please enable or connect a camera.');
};

export const showCameraInUseError = () => {
  return showErrorToast('Camera is already in use. Please close other applications using the camera.');
};

export const showCameraStartedSuccess = () => {
  return showSuccessToast('Camera access granted successfully.');
};

export const showCaptureSuccess = () => {
  return showSuccessToast('Face captured successfully!');
};

export const showApiLoading = () => {
  return toast.loading('Processing image...', {
    ...defaultOptions,
  });
};

export const showApiSuccess = () => {
  return showSuccessToast('Analysis completed successfully!');
};

export const showApiError = (message?: string) => {
  return showErrorToast(message || 'Failed to analyze image. Please try again.');
};

export default {
  success: showSuccessToast,
  error: showErrorToast,
  warning: showWarningToast,
  info: showInfoToast,
  camera: {
    deviceError: showCameraDeviceError,
    inUseError: showCameraInUseError,
    started: showCameraStartedSuccess,
    captured: showCaptureSuccess,
  },
  api: {
    loading: showApiLoading,
    success: showApiSuccess,
    error: showApiError,
  },
};

