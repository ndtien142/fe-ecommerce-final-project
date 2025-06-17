import { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';

interface UploadMultiImageResult {
  uploadImages: (
    files: File[],
    options?: { serialNumber?: string; customString?: string }
  ) => Promise<string[]>;
  progress: number;
  error: string | null;
}

function getCustomFileName(file: File, serialNumber?: string, customString?: string): string {
  const ext = file.name.split('.').pop();
  const now = new Date();
  const dateStr = now
    .toISOString()
    .replace(/[-:.TZ]/g, '')
    .slice(0, 14); // yyyyMMddHHmmss
  const rand = Math.random().toString(36).substring(2, 8);
  let name = '';
  if (serialNumber) name += serialNumber + '_';
  if (customString) name += customString + '_';
  name += dateStr + '_' + rand + '.' + ext;
  return name;
}

const useUploadMultiImage = (): UploadMultiImageResult => {
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const uploadImages = async (
    files: File[],
    options?: { serialNumber?: string; customString?: string }
  ): Promise<string[]> => {
    setProgress(0);
    setError(null);
    const urls: string[] = [];
    let uploaded = 0;

    console.log('Starting upload for files:', files);
    if (files.length === 0) {
      console.warn('No files to upload');
      return urls; // Return empty array if no files
    }

    for (const file of files) {
      try {
        const fileName = getCustomFileName(file, options?.serialNumber, options?.customString);
        const storageRef = ref(storage, `images/${fileName}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        // Capture the current value of uploaded for this iteration
        const uploadedAtStart = uploaded;

        // eslint-disable-next-line no-loop-func, @typescript-eslint/no-loop-func
        await new Promise<void>((resolve, reject) => {
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              // Update progress for each file
              const currentProgress =
                ((uploadedAtStart + snapshot.bytesTransferred / snapshot.totalBytes) /
                  files.length) *
                100;
              setProgress(currentProgress);
            },
            (err) => {
              setError(err.message);
              reject(err);
            },
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              urls.push(downloadURL);
              uploaded += 1;
              setProgress((uploaded / files.length) * 100);
              resolve();
            }
          );
        });
      } catch (err: any) {
        setError(err.message);
        throw err;
      }
    }
    setProgress(100);
    return urls;
  };

  return { uploadImages, progress, error };
};

export default useUploadMultiImage;
