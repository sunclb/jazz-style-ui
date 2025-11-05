import { useState, useEffect } from "react";
import "./App.css";
import { TabContainer } from "./components/TabContainer";
import { UploadSection } from "./components/UploadSection";
import { LoadingCircle } from "./components/LoadingCircle";
import { AudioTable, type AudioFile } from "./components/AudioTable";
import {
  generateAudioFileList,
  getAvailableFileNames,
  findAudioFileByName,
} from "./utils/fileListGenerator";

function App() {
  const [activeTab, setActiveTab] = useState<"inference" | "all">("inference");
  const [selectedFile, setSelectedFile] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [audioFiles, setAudioFiles] = useState<AudioFile[]>([]);
  const [allFiles, setAllFiles] = useState<AudioFile[]>([]);

  // 动态加载所有文件列表
  useEffect(() => {
    const loadFiles = async () => {
      const files = await generateAudioFileList();
      setAllFiles(files);
    };
    loadFiles();
  }, []);

  const handleFileSelect = (fileName: string) => {
    setSelectedFile(fileName);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsLoading(true);

    // 模拟5秒加载时间
    setTimeout(() => {
      const fileData = allFiles.find((file) => file.name === selectedFile);
      if (fileData) {
        setAudioFiles([fileData]);
      }
      setIsLoading(false);
    }, 5000);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Jazz Style Audio Comparison</h1>
      </header>

      <TabContainer activeTab={activeTab} onTabChange={setActiveTab}>
        {activeTab === "inference" && (
          <div className="inference-tab">
            <UploadSection
              selectedFile={selectedFile}
              isLoading={isLoading}
              onFileSelect={handleFileSelect}
              onUpload={handleUpload}
            />

            {isLoading && <LoadingCircle />}

            {!isLoading && audioFiles.length > 0 && (
              <div className="results-section">
                <h3>Comparison Results</h3>
                <AudioTable files={audioFiles} grouped={false} />
              </div>
            )}
          </div>
        )}

        {activeTab === "all" && (
          <div className="all-tab">
            <h2>All Audio Files</h2>
            <AudioTable files={allFiles} />
          </div>
        )}
      </TabContainer>
    </div>
  );
}

export default App;
