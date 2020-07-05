import { getPhotoAndThumbnail } from 'helpers/photos/photo.helpers';
import { authFetchJson, authFetchText } from 'helpers/request.helpers';

type OptimizedPhotoAndThumbnail = {
  optimizedPhoto: File;
  photoName: string;
  thumbnail: File;
  thumbnailName: string;
};

export const processPhoto = async (
  photo: File,
): Promise<OptimizedPhotoAndThumbnail> => {
  const { optimizedPhoto, thumbnail } = await getPhotoAndThumbnail(photo);
  const photoName = photo.name.replace(/\..*/, '.jpeg');
  const thumbnailName = `thumb_${photoName}`;

  return { optimizedPhoto, photoName, thumbnail, thumbnailName };
};

export const uploadPhotoToStorage = async (
  photo: File,
  name: string,
): Promise<string> => {
  const { signedRequest, url } = await authFetchJson<{
    signedRequest: string;
    url: string;
  }>(`/api/uploads?name=${name}`);
  await fetch(signedRequest, {
    method: 'PUT',
    headers: {
      'Cache-Control': `public, max-age=${30 * 24 * 60 * 60}`,
    },
    body: photo,
  });

  return url;
};

export const uploadPhotoToDatabase = async (
  name: string,
  url: string,
  thumbnailUrl: string,
  date: number,
): Promise<string> =>
  authFetchText('/api/photos', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      name,
      url,
      thumbnailUrl,
      date,
    }),
  });
