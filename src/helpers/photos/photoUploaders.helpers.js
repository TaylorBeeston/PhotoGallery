import { getPhotoAndThumbnail } from 'helpers/photos/photo.helpers';
import { authFetchJson, authFetchText } from 'helpers/request.helpers';

export const processPhoto = async (photo) => {
  const { optimizedPhoto, thumbnail } = await getPhotoAndThumbnail(photo);
  const photoName = photo.name.replace(/\..*/, '.jpeg');
  const thumbnailName = `thumb_${photoName}`;

  return { optimizedPhoto, photoName, thumbnail, thumbnailName };
};

export const uploadPhotoToStorage = async (photo, name) => {
  const { signedRequest, url } = await authFetchJson(
    `/api/uploads?name=${name}`,
  );
  await fetch(signedRequest, { method: 'PUT', body: photo });

  return url;
};

export const uploadPhotoToDatabase = async (name, url, thumbnailUrl, date) =>
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
