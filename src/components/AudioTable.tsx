import { CustomAudioPlayer } from "./AudioPlayer";

export interface AudioFile {
  name: string;
  contentPath: string;
  baselinePath: string;
  v1Path: string;
  v2Path: string;
}

interface AudioTableProps {
  files: AudioFile[];
}

export function AudioTable({ files }: AudioTableProps) {
  if (files.length === 0) {
    return <div className="no-data">No audio files to display</div>;
  }

  const getFileNameWithoutExtension = (filename: string) => {
    return filename.replace(/\.[^/.]+$/, "");
  };

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
