import { useState, useEffect } from "react";
import { getAvailableFileNames } from "../utils/fileListGenerator";

interface UploadSectionProps {
  selectedFile: string;
  isLoading: boolean;
  onFileSelect: (fileName: string) => void;
  onUpload: () => void;
}

export function UploadSection({
  selectedFile,
  isLoading,
  onFileSelect,
  onUpload,
}: UploadSectionProps) {
  const [availableFiles, setAvailableFiles] = useState<string[]>([]);

  useEffect(() => {
    const loadAvailableFiles = async () => {
      const files = await getAvailableFileNames();
      setAvailableFiles(files);
    };
    loadAvailableFiles();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const fileName = event.target.value;
    if (fileName) {
      onFileSelect(fileName);
    }
  };

  return (
    <div className="upload-section">
      <h2>Select Audio File</h2>
      <div className="upload-controls">
        <select
          value={selectedFile}
          onChange={handleFileChange}
          disabled={isLoading}
          className="file-selector"
        >
          <option value="">Select a file...</option>
          {availableFiles.map((fileName) => (
            <option key={fileName} value={fileName}>
              {fileName}
            </option>
          ))}
        </select>
        <button
          onClick={onUpload}
          disabled={!selectedFile || isLoading}
          className="process-button"
        >
          Process
        </button>
      </div>
      {selectedFile && (
        <div className="selected-file">Selected: {selectedFile}</div>
      )}
    </div>
  );
}
