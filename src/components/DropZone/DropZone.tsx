import React from 'react';
import { useExportContext } from '../../AppContext/AppContext';
import style from './DropZone.module.scss';

const DropZone = ({ className }: { className: string }) => {
  const { setFileInfo, fileInfo } = useExportContext();


  const handleFileDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const { files } = e.dataTransfer;
    for (const file of files) {
      const { size, name } = file;
      const content = await file;
      setFileInfo({ size, name, content });
    }
  };

  const handleFileDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      onDragOver={handleFileDrag}
      onDrop={handleFileDrop}
      className={`${style.wrapper} ${className}`}
    >
      {fileInfo.name ? fileInfo.name : `Drag'n'drop your file`}
    </div>
  );
};

export { DropZone };
