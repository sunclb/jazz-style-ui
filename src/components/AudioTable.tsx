import { useState } from "react";
import { CustomAudioPlayer } from "./AudioPlayer";

export interface AudioFile {
  name: string;
  style: string;
  contentPath: string;
  baselinePath: string;
  v1Path: string;
  v2Path: string;
}

interface AudioTableProps {
  files: AudioFile[];
  grouped?: boolean;
}

interface GroupedFiles {
  [style: string]: AudioFile[];
}

export function AudioTable({ files, grouped = true }: AudioTableProps) {
  const [expandedGroups, setExpandedGroups] = useState<{
    [key: string]: boolean;
  }>({});

  if (files.length === 0) {
    return <div className="no-data">No audio files to display</div>;
  }

  const getFileNameWithoutExtension = (filename: string) => {
    return filename.replace(/\.[^/.]+$/, "");
  };

  // 如果不分组，直接显示表格
  if (!grouped) {
    return (
      <table className="audio-table">
        <thead>
          <tr>
            <th>Audio File</th>
            <th>Content</th>
            <th>Baseline</th>
            <th>V1 Model</th>
            <th>V2 Model</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file, index) => (
            <tr key={index}>
              <td>
                <div className="audio-file-name">
                  {getFileNameWithoutExtension(file.name)}
                </div>
              </td>
              <td>
                <div className="audio-cell">
                  <CustomAudioPlayer src={file.contentPath} />
                </div>
              </td>
              <td>
                <div className="audio-cell">
                  <CustomAudioPlayer src={file.baselinePath} />
                </div>
              </td>
              <td>
                <div className="audio-cell">
                  <CustomAudioPlayer src={file.v1Path} />
                </div>
              </td>
              <td>
                <div className="audio-cell">
                  <CustomAudioPlayer src={file.v2Path} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  // 按风格分组文件
  const groupedFiles: GroupedFiles = files.reduce((groups, file) => {
    const style = file.style || "Unknown";
    if (!groups[style]) {
      groups[style] = [];
    }
    groups[style].push(file);
    return groups;
  }, {} as GroupedFiles);

  const toggleGroup = (style: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [style]: !prev[style],
    }));
  };

  return (
    <div className="audio-table-container">
      {Object.entries(groupedFiles).map(([style, styleFiles]) => {
        const isExpanded = expandedGroups[style] === true; // 默认折叠
        const fileCount = styleFiles.length;

        return (
          <div key={style} className="style-group">
            <div className="style-header" onClick={() => toggleGroup(style)}>
              <div className="style-title">
                <span className="expand-icon">{isExpanded ? "▼" : "▶"}</span>
                {style}
                <span className="file-count">({fileCount} files)</span>
              </div>
            </div>

            {isExpanded && (
              <table className="audio-table">
                <thead>
                  <tr>
                    <th>Audio File</th>
                    <th>Content</th>
                    <th>Baseline</th>
                    <th>V1 Model</th>
                    <th>V2 Model</th>
                  </tr>
                </thead>
                <tbody>
                  {styleFiles.map((file, index) => (
                    <tr key={`${style}-${index}`}>
                      <td>
                        <div className="audio-file-name">
                          {getFileNameWithoutExtension(file.name)}
                        </div>
                      </td>
                      <td>
                        <div className="audio-cell">
                          <CustomAudioPlayer src={file.contentPath} />
                        </div>
                      </td>
                      <td>
                        <div className="audio-cell">
                          <CustomAudioPlayer src={file.baselinePath} />
                        </div>
                      </td>
                      <td>
                        <div className="audio-cell">
                          <CustomAudioPlayer src={file.v1Path} />
                        </div>
                      </td>
                      <td>
                        <div className="audio-cell">
                          <CustomAudioPlayer src={file.v2Path} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        );
      })}
    </div>
  );
}
