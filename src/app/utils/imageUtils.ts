
/**
 * Utility functions for image processing
 */

/**
 * Compresses and resizes an image file
 * @param file - The image file to compress
 * @param maxWidth - Maximum width of the output image
 * @param maxHeight - Maximum height of the output image
 * @param quality - Image quality (0 to 1)
 * @returns A promise that resolves to a compressed image data URL
 */
export const compressImage = async (
  file: File,
  maxWidth = 400,
  maxHeight = 400,
  quality = 0.7
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      
      img.onload = () => {
        // Calculate new dimensions while maintaining aspect ratio
        let width = img.width;
        let height = img.height;
        
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }
        
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        
        // Convert to JPEG with specified quality
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataUrl);
      };
      
      img.onerror = (error) => {
        reject(error);
      };
    };
    
    reader.onerror = (error) => {
      reject(error);
    };
  });
};

/**
 * Compresses a base64 data URL image string (for server-side use)
 * @param dataUrl - The base64 data URL to compress
 * @param maxWidth - Maximum width of the output image
 * @param maxHeight - Maximum height of the output image
 * @param quality - Image quality (0 to 1)
 * @returns A promise that resolves to a compressed image data URL
 */
export const compressDataUrlImage = async (
  dataUrl: string,
  maxWidth = 400,
  maxHeight = 400,
  quality = 0.7
): Promise<string> => {
  // This function works in both client and server environments
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = dataUrl;
    
    img.onload = () => {
      // Calculate new dimensions while maintaining aspect ratio
      let width = img.width;
      let height = img.height;
      
      if (width > height) {
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }
      
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0, width, height);
      
      // Convert to JPEG with specified quality
      const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
      resolve(compressedDataUrl);
    };
    
    img.onerror = (error) => {
      reject(error);
    };
  });
};

/**
 * Converts a data URL to a File object
 * @param dataUrl - The data URL to convert
 * @param filename - The name for the file
 * @returns File object
 */
export const dataUrlToFile = (dataUrl: string, filename: string): File => {
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/jpeg';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  
  return new File([u8arr], filename, { type: mime });
};

/**
 * Checks if an image file is within size limits
 * @param file - The file to check
 * @param maxSizeInMB - Maximum allowed file size in MB
 * @returns Boolean indicating if file is within size limit
 */
export const isFileSizeValid = (file: File, maxSizeInMB = 5): boolean => {
  const fileSizeInMB = file.size / (1024 * 1024);
  return fileSizeInMB <= maxSizeInMB;
};

/**
 * Gets the size of a file in a human-readable format
 * @param file - The file to get the size of
 * @returns String representation of file size (e.g., "2.5 MB")
 */
export const getFileSize = (file: File): string => {
  const fileSizeInMB = file.size / (1024 * 1024);
  return `${fileSizeInMB.toFixed(2)} MB`;
};

/**
 * Gets the size of a base64 data URL in MB
 * @param dataUrl - The base64 data URL
 * @returns Size in MB
 */
export const getDataUrlSize = (dataUrl: string): number => {
  // Calculate approximate size of base64 data URL
  const base64 = dataUrl.split(',')[1];
  const sizeInBytes = (base64.length * 3) / 4;
  return sizeInBytes / (1024 * 1024);
};

/**
 * Checks if a base64 data URL exceeds the size limit
 * @param dataUrl - The base64 data URL to check
 * @param maxSizeInMB - Maximum allowed size in MB
 * @returns Boolean indicating if the data URL is within size limit
 */
export const isDataUrlSizeValid = (dataUrl: string, maxSizeInMB = 5): boolean => {
  return getDataUrlSize(dataUrl) <= maxSizeInMB;
};


