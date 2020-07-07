import React, { FC } from 'react';

type ConfirmationDialogParams = {
  title: string;
  image?: { src: string; alt: string };
  onConfirm(): void;
  onCancel(): void;
  show: boolean;
};

const ConfirmationDialog: FC<ConfirmationDialogParams> = ({
  title,
  image,
  onConfirm,
  onCancel,
  show,
}) => {
  if (!show) return <></>;

  return (
    <div className="fixed top-0 left-0 right-0 z-40 flex flex-col w-5/6 px-8 py-16 mx-auto my-16 text-center bg-white border border-gray-500 rounded-lg shadow-inner space-y-8 flex-center bg-opacity-75 backdrop-blur">
      <h1 className="w-10/12 text-2xl break-words">{title}</h1>
      {image && (
        <img
          src={image.src}
          alt={image.alt}
          className="object-cover w-32 h-32"
        />
      )}
      <div className="flex space-x-24">
        <button
          type="button"
          onClick={onConfirm}
          className="px-8 py-2 bg-green-200 border rounded shadow"
        >
          Yes
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-8 py-2 bg-red-200 border rounded shadow"
        >
          No
        </button>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
