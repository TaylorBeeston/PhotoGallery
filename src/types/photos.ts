export type Photo = {
  id: string;
  name: string;
  url: string;
  thumbnailUrl: string;
};

export type PhotoFile = {
  photo: File;
  name: string;
  date: Date;
};
