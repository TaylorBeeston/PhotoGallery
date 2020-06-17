import React from 'react';
import { Link } from 'react-router-dom';

const NoPhotos = () => {
  return (
    <div className="card">
      <h2 className="text-xl">
        Looks like you haven't uploaded any photos yet!
      </h2>
      <Link to="/upload" className="text-blue-600">
        Click here to start uploading!
      </Link>
    </div>
  );
};

export default NoPhotos;
