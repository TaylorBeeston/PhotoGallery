export type Photo = {
  id: string;
  name: string;
  url: string;
  thumbnailUrl: string;
  date: string;
};

export type PhotoFile = {
  photo: File;
  name: string;
  date: Date;
};
