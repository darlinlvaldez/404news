import { useState } from "react";

const MAX_FILES = 10;

export default function useFileUpload() {
  const [files, setFiles] = useState([]);

  const addFiles = (newFiles) => {
    let exceeded = false;

    setFiles(prev => {
      const combined = [
        ...prev,
        ...newFiles
      ];

      const uniqueFiles = combined.filter(
        (file, index, self) =>
          index === self.findIndex(
            f =>
              f.name === file.name &&
              f.size === file.size
          )
      );

      if (uniqueFiles.length > MAX_FILES) {
        exceeded = true;
      }

      return uniqueFiles.slice(0, MAX_FILES);
    });

    return exceeded;
  };

  const removeFile = (indexToRemove) => {
    setFiles(prev =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  const clearFiles = () => {
    setFiles([]);
  };

  const handleFileChange = (e) => {
    const exceeded = addFiles(
      Array.from(e.target.files)
    );

    e.target.value = "";

    return exceeded;
  };

  return {
    files,
    addFiles,
    removeFile,
    clearFiles,
    handleFileChange
  };
}