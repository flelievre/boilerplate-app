import {
  useState,
  useEffect,
} from 'react';
import {
  axios,
} from '@/config';

const useGetApiProtectedImageSrc = ({
  src = '',
}) => {
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    let isMounted = true;

    const fetchImage = async () => {
      try {
        const response = await axios.requestWithAuth('get', src, {}, {
          responseType: 'blob',
        });

        const url = URL.createObjectURL(response.data);

        if (isMounted) {
          setImageSrc(url);
        }
      } catch (error) {
        console.error(`Error fetching the image from ${src}:`, error);
      }
    };

    if (src) {
      fetchImage();
    }

    return () => {
      isMounted = false;
      URL.revokeObjectURL(imageSrc);
    };
  }, [src]);

  return {
    imageSrc,
  };
};

export default useGetApiProtectedImageSrc;
