import { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';

export interface UseFirebaseUploadResult {
  uploadFile: (file: File, path?: string) => Promise<string>;
  progress: number;
  error: string | null;
}

const useFirebaseUpload = (): UseFirebaseUploadResult => {
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = (file: File, path = 'uploads'): Promise<string> =>
    new Promise((resolve, reject) => {
      const storageRef = ref(storage, `${path}/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(percent);
        },
        (err) => {
          setError(err.message);
          reject(err);
        },
        async () => {
          try {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(url);
          } catch (err: any) {
            setError(err.message);
            reject(err);
          }
        }
      );
    });

  return { uploadFile, progress, error };
};

export default useFirebaseUpload;
