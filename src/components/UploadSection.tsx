import { useState, useEffect } from "react";
import { getGroupedFiles, type GroupedFiles } from "../utils/fileListGenerator";

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
  const [groupedFiles, setGroupedFiles] = useState<GroupedFiles>({});
  const [selectedStyle, setSelectedStyle] = useState<string>("");

  useEffect(() => {
    const loadGroupedFiles = async () => {
      const files = await getGroupedFiles();
      setGroupedFiles(files);
    };
    loadGroupedFiles();
  }, []);

  const handleStyleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const style = event.target.value;
    setSelectedStyle(style);
    // 清除选中的文件当风格改变时
    onFileSelect("");
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const fileName = event.target.value;
    if (fileName) {
      onFileSelect(fileName);
    }
  };

  const getFileNameWithoutExtension = (filename: string) => {
    return filename.replace(/\.[^/.]+$/, "");
  };

  const styles = Object.keys(groupedFiles).sort();
  const filesInSelectedStyle = selectedStyle
    ? groupedFiles[selectedStyle] || []
    : [];

  return (
    <div className="upload-section">
      <h2>Select Audio File</h2>
      <div className="upload-controls">
        {/* 第一级：选择风格 */}
        <select
          value={selectedStyle}
          onChange={handleStyleChange}
          disabled={isLoading}
          className="file-selector"
        >
          <option value="">Select a style...</option>
          {styles.map((style) => (
            <option key={style} value={style}>
              {style} ({groupedFiles[style].length} files)
            </option>
          ))}
        </select>

        {/* 第二级：选择文件 */}
        <select
          value={selectedFile}
          onChange={handleFileChange}
          disabled={!selectedStyle || isLoading}
          className="file-selector"
        >
          <option value="">Select a file...</option>
          {filesInSelectedStyle.map((file) => (
            <option key={file.name} value={file.name}>
              {getFileNameWithoutExtension(file.name)}
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
        <div className="selected-file">
          Selected: {getFileNameWithoutExtension(selectedFile)} ({selectedStyle}
          )
        </div>
      )}
    </div>
  );
}
