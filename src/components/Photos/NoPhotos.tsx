import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const NoPhotos: FC = () => {
  return (
    <div className="card">
      <h2 className="text-xl">It feels a little empy...</h2>
      <Link to="/upload" className="text-blue-600">
        Click here to start uploading!
      </Link>
    </div>
  );
};

export default NoPhotos;
