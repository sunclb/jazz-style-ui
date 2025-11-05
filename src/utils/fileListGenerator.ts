import type { AudioFile } from "../components/AudioTable";

// 从items_config.json动态生成文件列表
export async function generateAudioFileList(): Promise<AudioFile[]> {
  try {
    // 从public目录加载items_config.json
    const response = await fetch("/items_config.json");
    const configItems = await response.json();

    // 使用Set来去重，基于input_audio路径
    const uniqueFiles = new Map<string, AudioFile>();

    configItems.forEach((item: any) => {
      // 从input_audio路径中提取文件名和风格
      // input_audio格式: "audios/content/{style}/{filename}"
      const inputPath = item.input_audio;
      const parts = inputPath.split("/");
      const filename = parts.pop() || "";
      const style = parts.pop() || "";

      // 从output_audio路径中提取版本信息
      // output_audio格式: "jazz/{version}/{style}/{filename}"

      // 创建唯一的文件标识符（基于input_audio）
      const fileKey = `${style}/${filename}`;

      if (!uniqueFiles.has(fileKey)) {
        // 如果是新文件，创建基础记录
        uniqueFiles.set(fileKey, {
          name: filename,
          style: style,
          contentPath: `audios/content/${fileKey}`, // 使用完整的input_audio路径
          baselinePath: `audios/jazz/v1/${fileKey}`,
          v1Path: `audios/jazz/v2/${fileKey}`,
          v2Path: `audios/jazz/v3/${fileKey}`,
        });
      }
    });

    return Array.from(uniqueFiles.values());
  } catch (error) {
    console.warn("生成音频文件列表时出错:", error);
    return [];
  }
}

// 获取按风格分组的文件信息
export interface GroupedFiles {
  [style: string]: AudioFile[];
}

export async function getGroupedFiles(): Promise<GroupedFiles> {
  const audioFiles = await generateAudioFileList();
  return audioFiles.reduce((groups, file) => {
    const style = file.style || "Unknown";
    if (!groups[style]) {
      groups[style] = [];
    }
    groups[style].push(file);
    return groups;
  }, {} as GroupedFiles);
}

// 获取所有可用的文件名（用于文件选择器）
export async function getAvailableFileNames(): Promise<string[]> {
  const audioFiles = await generateAudioFileList();
  return audioFiles.map((file) => file.name);
}

// 根据文件名查找对应的音频文件
export async function findAudioFileByName(
  filename: string
): Promise<AudioFile | undefined> {
  const audioFiles = await generateAudioFileList();
  return audioFiles.find((file) => file.name === filename);
}
