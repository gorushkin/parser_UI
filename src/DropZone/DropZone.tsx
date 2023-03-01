import React from 'react';
import style from './DropZone.module.scss';
import { useExportContext } from '../AppContext/AppContext';

const DropZone = ({ className }: { className: string }) => {
  const { setFileInfo, fileInfo } = useExportContext();


  const handleFileDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const { files } = e.dataTransfer;
    for (const element of files) {
      const { size, name } = element;
      const content = await element.text();
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
